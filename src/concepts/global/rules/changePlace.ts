import { Texture } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import {
  AnyCameraName,
  BackdopArt,
  BackdopOptions,
  DollName,
  PlaceName,
} from "../../../declarations";
import { CustomVideoTexture } from "../../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { makeScenePlaneUtils } from "../../../utils/babylonjs/scenePlane";
import { makeDollStoryHelpers } from "../../../utils/story/helpers/dolls";
import { makeGetCharDollStuff } from "../../characters/utils";
import { makeSectionVidStoreUtils } from "../../sectionVids/utils";
// import { getSectionVidVideo } from "../../sectionVids/utils";
// import { focusScenePlaneOnFocusedDoll } from "../../../utils/babylonjs/scenePlane/focusScenePlane";
// import { updateTexturesForNowCamera } from "./whenCameraChanges";
import {
  BackdopConcepFuncs,
  PlaceholderBackdopConcepts,
} from "../../typedConcepFuncs";
import { makeGlobalStoreUtils } from "../utils";
import { makeCameraChangeUtils } from "../utils/cameraChange";

export function makeGlobalChangePlaceRules<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts
>(
  concepFuncs: ConcepFuncs,
  _backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  backdopArt: BackdopArt
) {
  const { getRefs, getState, makeRules, setState, onNextTick } = concepFuncs;
  const { placeInfoByName } = backdopArt;

  const globalRefs = getRefs().global.main;

  const { getSectionVidVideo } = makeSectionVidStoreUtils(
    concepFuncs,
    backdopArt
  );

  const {
    updateTexturesForNowCamera,
    updateNowStuffWhenSectionChanged,
  } = makeCameraChangeUtils(concepFuncs, backdopArt);

  const { focusScenePlaneOnFocusedDoll } = makeScenePlaneUtils<
    ConcepFuncs,
    BackdopOptions
  >(concepFuncs, backdopStartOptions);
  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);

  const getCharDollStuff = makeGetCharDollStuff(concepFuncs);
  const { setDollToSpot } = makeDollStoryHelpers(
    concepFuncs,
    backdopStartOptions,
    backdopArt.modelInfoByName
  );

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

  return makeRules((addItemEffect) => ({
    whenPlaceNameChanges: addItemEffect({
      onItemEffect({ newValue: nextPlaceName, itemState: globalState }) {
        if (nextPlaceName === null || globalState.loadingOverlayFullyShowing)
          return;
        setState({ global: { main: { loadingOverlayToggled: true } } });
      },
      check: { type: "global", prop: "nextPlaceName" },
      flow: "loadNewPlace",
    }),
    whenOverlayFadedOut: addItemEffect({
      onItemEffect({ itemState }) {
        if (!itemState.nextPlaceName) return;
        setState({ global: { main: { readyToSwapPlace: true } } });
      },
      check: {
        type: "global",
        prop: "loadingOverlayFullyShowing",
        becomes: "true",
      },
      flow: "loadNewPlace",
    }),
    whenOverlayToggledOff: addItemEffect({
      onItemEffect() {
        setGlobalState({ loadingOverlayFullyShowing: false });
      },
      check: {
        type: "global",
        prop: "loadingOverlayToggled",
        becomes: "false",
      },
      flow: "loadNewPlace",
    }),
    whenReadyToSwapPlace: addItemEffect({
      onItemEffect({ itemState: globalState }) {
        // run on the start of the next concepto frame, so all the flows can run again
        setState({}, () => {
          const { nowPlaceName, nextPlaceName } = globalState;
          const cameraNames = placeInfoByName[nowPlaceName]
            .cameraNames as AnyCameraName[];
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
      check: { type: "global", prop: "readyToSwapPlace", becomes: "true" },
      whenToRun: "subscribe",
      flow: "loadNewPlace",
    }),
    whenEverythingsLoaded: addItemEffect({
      onItemEffect({ itemState: globalState }) {
        const {
          nowPlaceName,
          newPlaceLoaded,
          modelNamesLoaded,
          wantedSegmentWhenNextPlaceLoads,
        } = globalState;
        const { wantedCamWhenNextPlaceLoads } = getState().places[nowPlaceName];

        const wantedModelsForPlace = backdopStartOptions.modelNamesByPlace[
          nowPlaceName
        ].sort();
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
      whenToRun: "subscribe",
      flow: "loadNewPlace",
    }),
  }));
}
