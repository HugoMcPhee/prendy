import { Texture } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { AnyCameraName, PrendyAssets, PrendyOptions, DollName, PlaceName } from "../../../declarations";
import { CustomVideoTexture } from "../../../utils/babylonjs/CustomVideoTexture";
import { makeTyped_scenePlaneUtils } from "../../../utils/babylonjs/scenePlane";
import { makeTyped_dollStoryHelpers } from "../../../utils/story/helpers/dolls";
import { makeTyped_getCharDollStuff } from "../../characters/utils";
import { makeTyped_sectionVidUtils } from "../../sectionVids/utils";
// import { getSectionVidVideo } from "../../sectionVids/utils";
// import { focusScenePlaneOnFocusedDoll } from "../../../utils/babylonjs/scenePlane/focusScenePlane";
// import { updateTexturesForNowCamera } from "./whenCameraChanges";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../typedStoreHelpers";
import { makeTyped_globalUtils } from "../utils/utils";
import { makeTyped_cameraChangeUtils } from "../utils/cameraChange";

export function makeTyped_globalChangePlaceRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
  storeHelpers: StoreHelpers,
  _prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const globalRefs = getRefs().global.main;

  const { getSectionVidVideo } = makeTyped_sectionVidUtils(storeHelpers, prendyAssets);

  const { updateTexturesForNowCamera, updateNowStuffWhenSectionChanged } = makeTyped_cameraChangeUtils(
    storeHelpers,
    prendyAssets
  );

  const { focusScenePlaneOnFocusedDoll } = makeTyped_scenePlaneUtils<StoreHelpers, PrendyOptions>(
    storeHelpers,
    prendyStartOptions
  );
  const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
  const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);
  const { setDollToSpot } = makeTyped_dollStoryHelpers(storeHelpers, prendyStartOptions, prendyAssets.modelInfoByName);

  function setPlayerPositionForNewPlace() {
    const { nowPlaceName, playerCharacter } = getState().global.main;
    const { dollName } = getCharDollStuff(playerCharacter);
    const placeInfo = placeInfoByName[nowPlaceName];
    const { spotNames } = placeInfo;
    const { nextSpotName } = getState().dolls[dollName];

    const newSpotName = nextSpotName || spotNames[0];

    setDollToSpot({
      doll: dollName as DollName,
      place: nowPlaceName,
      spot: newSpotName,
    });
  }

  function whenAllVideosLoadedForPlace() {
    const { nowPlaceName } = getState().global.main;
    const { nowCamName } = getState().places[nowPlaceName];

    globalRefs.backdropVideoTex?.dispose(); // NOTE maybe don't dispose it?

    const backdropVidElement = getSectionVidVideo(nowPlaceName as PlaceName);

    if (backdropVidElement) {
      globalRefs.backdropVideoTex = new CustomVideoTexture(
        "backdropVideoTex",
        backdropVidElement,
        globalRefs.scenes.backdrop,
        false,
        false,
        Texture.TRILINEAR_SAMPLINGMODE, // Texture.NEAREST_SAMPLINGMODE, might be better for depth
        { autoPlay: false, loop: false, autoUpdateTexture: true }
      );
    }

    // focus on the player
    focusScenePlaneOnFocusedDoll();

    // fix for chrome video texture being black / not ready when the video is?
    // (setion vidElement.autoplay or preload true also fixed it, but those can make things less predictable without videos appended on the page )
    updateTexturesForNowCamera(nowCamName as AnyCameraName, true);
    setState({
      global: {
        main: {
          loadingOverlayToggled: false,
          loadingOverlayFullyShowing: false,
        },
      },
    });
  }

  return makeRules(({ itemEffect }) => ({
    whenPlaceNameChanges: itemEffect({
      run({ newValue: nextPlaceName, itemState: globalState }) {
        if (nextPlaceName === null || globalState.loadingOverlayFullyShowing) return;
        setState({ global: { main: { loadingOverlayToggled: true } } });
      },
      check: { type: "global", prop: "nextPlaceName" },
      step: "loadNewPlace",
    }),
    whenOverlayFadedOut: itemEffect({
      run({ itemState }) {
        if (!itemState.nextPlaceName) return;
        setState({ global: { main: { readyToSwapPlace: true } } });
      },
      check: {
        type: "global",
        prop: "loadingOverlayFullyShowing",
        becomes: true,
      },
      step: "loadNewPlace",
    }),
    whenOverlayToggledOff: itemEffect({
      run() {
        setGlobalState({ loadingOverlayFullyShowing: false });
      },
      check: {
        type: "global",
        prop: "loadingOverlayToggled",
        becomes: false,
      },
      step: "loadNewPlace",
    }),
    whenReadyToSwapPlace: itemEffect({
      run({ itemState: globalState }) {
        // run on the start of the next pietem frame, so all the flows can run again
        setState({}, () => {
          const { nowPlaceName, nextPlaceName } = globalState;
          const cameraNames = placeInfoByName[nowPlaceName].cameraNames as AnyCameraName[];
          const placeRefs = getRefs().places[nowPlaceName];

          setState({ sectionVids: { [nowPlaceName]: { wantToUnload: true } } });

          forEach(cameraNames, (camName) => {
            const camRef = placeRefs.camsRefs[camName];
            camRef.probeTexture?.dispose();
            camRef.probeTexture = null;
          });

          if (!nextPlaceName) return;

          setGlobalState({
            nowPlaceName: nextPlaceName,
            isLoadingBetweenPlaces: true,
            newPlaceLoaded: false,
            nextPlaceName: null,
            readyToSwapPlace: false,
          });
        });
      },
      check: { type: "global", prop: "readyToSwapPlace", becomes: true },
      atStepEnd: true,
      step: "loadNewPlace",
    }),
    whenEverythingsLoaded: itemEffect({
      run({ itemState: globalState }) {
        const { nowPlaceName, newPlaceLoaded, modelNamesLoaded, wantedSegmentWhenNextPlaceLoads } = globalState;
        const { wantedCamWhenNextPlaceLoads } = getState().places[nowPlaceName];

        const wantedModelsForPlace = prendyStartOptions.modelNamesByPlace[nowPlaceName].sort();
        const loadedModelNames = modelNamesLoaded.sort();
        let allModelsAreLoaded = true;

        forEach(wantedModelsForPlace, (loopedCharacterName) => {
          if (!loadedModelNames.includes(loopedCharacterName)) {
            allModelsAreLoaded = false;
          }
        });

        if (newPlaceLoaded && allModelsAreLoaded) {
          onNextTick(() => {
            if (wantedSegmentWhenNextPlaceLoads) {
              setGlobalState({
                wantedSegmentWhenNextPlaceLoads: null,
                wantedSegmentName: wantedSegmentWhenNextPlaceLoads,
              });
            }

            if (wantedCamWhenNextPlaceLoads) {
              setState({
                places: {
                  [nowPlaceName]: {
                    wantedCamWhenNextPlaceLoads: null,
                    wantedCamName: wantedCamWhenNextPlaceLoads,
                  },
                },
              });
            }

            setPlayerPositionForNewPlace();

            // onNextTick because sometimes the character position was starting incorrect
            // (maybe because the place-load story-rules werent reacting because it was the wrong flow)
            setGlobalState({ isLoadingBetweenPlaces: false });

            onNextTick(() => {
              // when a new place loads it handles checking and clearing nextSegmentNameWhenVidPlays  nextCamNameWhenVidPlays
              // otheriwse the video wont loop because it thinks its waiting for a section to change
              // its set to run when a vid starts playing, but its missing it , maybe because the new vid playing property is updating before theres a wanted next cam etc,
              //or maybe to do with the flow order
              updateNowStuffWhenSectionChanged();

              whenAllVideosLoadedForPlace();
            });
          });
        }
      },
      check: {
        type: "global",
        prop: ["newPlaceLoaded", "modelNamesLoaded"],
      },
      atStepEnd: true,
      step: "loadNewPlace",
    }),
  }));
}
