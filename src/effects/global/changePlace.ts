import { Engine, RawTexture2DArray, Texture } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs, getState, makeEffects, onNextTick, runEffect, setState } from "repond";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { focusSlateOnFocusedDoll, slateSize } from "../../helpers/babylonjs/slate";
import { point3dToVector3 } from "../../helpers/babylonjs/vectors";
import { setDollPosition, setDollRotation } from "../../helpers/prendyHelpers/dolls";
import { updateTexturesForNowCamera } from "../../helpers/prendyUtils/cameraChange";
import { getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { setGlobalState } from "../../helpers/prendyUtils/global";
import { getSpotPosition, getSpotRotation } from "../../helpers/prendyUtils/spots";
import { meta } from "../../meta";
import { AnyCameraName, DollName, PlaceName } from "../../types";
import { unloadBackdropTexturesForPlace } from "prendy/src/helpers/babylonjs/usePlace/utils";
import { getNowBackdropFrameInfo } from "prendy/src/helpers/prendyUtils/backdrops";

const cachedTextures = {} as Record<string, Texture>;

function setPlayerPositionForNewPlace() {
  const { placeInfoByName } = meta.assets!;
  const { nowPlaceName, playerCharacter } = getState().global.main;
  const { dollName } = getCharDollStuff(playerCharacter);
  const placeInfo = placeInfoByName[nowPlaceName];
  const { spotNames } = placeInfo;
  const { goalSpotNameAtNewPlace, goalPositionAtNewPlace, goalRotationAtNewPlace } =
    getState().dolls[dollName as string];

  let newPosition = goalPositionAtNewPlace ? point3dToVector3(goalPositionAtNewPlace) : undefined;
  let newRotation = goalRotationAtNewPlace ? point3dToVector3(goalRotationAtNewPlace) : undefined;

  if (!newPosition || goalSpotNameAtNewPlace) {
    const newSpotName = goalSpotNameAtNewPlace ?? spotNames[0];

    newPosition = getSpotPosition(nowPlaceName, newSpotName);
    newRotation = getSpotRotation(nowPlaceName, newSpotName);
  }

  if (newPosition) setDollPosition(dollName as DollName, newPosition);
  if (newRotation) setDollRotation(dollName as DollName, newRotation);

  setState({ dolls: { [dollName as string]: { goalSpotNameAtNewPlace: null } } });

  // setDollToSpot({ doll: dollName as DollName, place: nowPlaceName, spot: newSpotName });
}

function whenAllVideosLoadedForPlace() {
  const globalRefs = getRefs().global.main;
  const { nowPlaceName, nowCamName, nowSegmentName } = getState().global.main;
  globalRefs.backdropVideoTex?.dispose(); // NOTE maybe don't dispose it?

  const { placeInfoByName, prendyOptions } = meta.assets!;
  const placesRefs = getRefs().places;
  const camRef = placesRefs[nowPlaceName].camsRefs[nowCamName];

  console.log("nowCamName");
  console.log(nowCamName);
  console.log("camRef");
  console.log(camRef);
  console.log("camRef.backdropTexturesBySegment");
  console.log(camRef.backdropTexturesBySegment);

  const { nowTextureIndex } = getNowBackdropFrameInfo(nowCamName);

  console.log("bing C");
  globalRefs.backdropTex = camRef.backdropTexturesBySegment[nowSegmentName][nowTextureIndex ?? 0].color;
  globalRefs.backdropTexDepth = camRef.backdropTexturesBySegment[nowSegmentName][nowTextureIndex ?? 0].depth;
}

export const globalChangePlaceEffects = makeEffects(({ itemEffect }) => ({
  whenGoalPlaceNameChanges: itemEffect({
    run({ newValue: goalPlaceName, itemState: globalState }) {
      // Remove goalPlaceName if it's the same as nowPlaceName
      const isNowPlace = goalPlaceName === globalState.nowPlaceName;
      if (isNowPlace) setState({ global: { main: { goalPlaceName: null } } });

      if (goalPlaceName === null || globalState.loadingOverlayFullyShowing || isNowPlace) return;
      setState({ global: { main: { loadingOverlayToggled: true } } });
    },
    check: { type: "global", prop: "goalPlaceName" },
    step: "loadNewPlace",
  }),
  whenSegmentNameChanges: itemEffect({
    run({ newValue: goalSegmentName, itemState: globalState }) {
      // Remove goalSegmentName if it's the same as nowSegmentName
      const isNowSegment = goalSegmentName === globalState.nowSegmentName;
      if (isNowSegment) setState({ global: { main: { goalSegmentName: null } } });
    },
    check: { type: "global", prop: "goalSegmentName" },
    step: "loadNewPlace",
  }),
  whenGoalCamNameChanges: itemEffect({
    run({ newValue: goalCamName, itemState: globalState }) {
      // Remove goalCamName if it's the same as nowCamName
      const isNowSegment = goalCamName === globalState.nowCamName;
      if (isNowSegment) setState({ global: { main: { goalCamName: null } } });
    },
    check: { type: "global", prop: "goalCamName" },
    step: "loadNewPlace",
  }),
  whenOverlayFadedOut: itemEffect({
    run({ itemState }) {
      if (itemState.goalPlaceName) setState({ global: { main: { readyToSwapPlace: true } } });
    },
    check: { type: "global", prop: "loadingOverlayFullyShowing", becomes: true },
    step: "loadNewPlace",
  }),
  whenOverlayToggledOff: itemEffect({
    run() {
      setGlobalState({ loadingOverlayFullyShowing: false });
    },
    check: { type: "global", prop: "loadingOverlayToggled", becomes: false },
    step: "loadNewPlace",
  }),
  whenReadyToSwapPlace: itemEffect({
    run({ itemState: globalState }) {
      const { placeInfoByName } = meta.assets!;

      // Run on the start of the next repond tick, so all the steps effects can run again
      onNextTick(() => {
        const { nowPlaceName, goalPlaceName } = globalState;
        if (!goalPlaceName) return;
        const cameraNames = placeInfoByName[nowPlaceName].cameraNames as AnyCameraName[];
        const placeRefs = getRefs().places[nowPlaceName];
        const globalRefs = getRefs().global.main;

        setState({ sliceVids: { [nowPlaceName]: { wantToUnload: true } } });

        forEach(cameraNames, (camName) => {
          const camRef = placeRefs.camsRefs[camName];
          camRef.probeTexture?.dispose();
          camRef.probeTexture = null;
        });

        globalRefs.backdropPostProcess.onApply = null;

        unloadBackdropTexturesForPlace(nowPlaceName);

        setGlobalState({
          nowPlaceName: goalPlaceName,
          isLoadingBetweenPlaces: true,
          newPlaceVideosLoaded: false,
          newPlaceProbesLoaded: false,
          newPlaceModelLoaded: false,
          goalPlaceName: null,
          readyToSwapPlace: false,
        });

        const { nowCamName, goalCamWhenNextPlaceLoads } = getState().global.main;
        setState({ global: { main: { nowCamName: goalCamWhenNextPlaceLoads ?? nowCamName } } });
      });
    },
    check: { type: "global", prop: "readyToSwapPlace", becomes: true },
    atStepEnd: true,
    step: "loadNewPlace",
  }),
  whenEverythingsLoaded: itemEffect({
    run({ itemState: globalState }) {
      const { prendyOptions } = meta.assets!;

      const {
        nowPlaceName,
        newPlaceVideosLoaded,
        newPlaceProbesLoaded,
        modelNamesLoaded,
        goalSegmentWhenGoalPlaceLoads,
      } = globalState;
      const { goalCamWhenNextPlaceLoads } = getState().global.main;
      const wantedModelsForPlace = prendyOptions.modelNamesByPlace[nowPlaceName].sort();
      const loadedModelNames = modelNamesLoaded.sort();
      let allModelsAreLoaded = true;

      forEach(wantedModelsForPlace, (loopedCharacterName) => {
        if (!loadedModelNames.includes(loopedCharacterName)) allModelsAreLoaded = false;
      });

      if (newPlaceVideosLoaded) {
        if (goalSegmentWhenGoalPlaceLoads) {
          setGlobalState({
            goalSegmentWhenGoalPlaceLoads: null,
            goalSegmentName: goalSegmentWhenGoalPlaceLoads,
          });
        }

        if (goalCamWhenNextPlaceLoads) {
          setState({
            global: {
              main: {
                goalCamWhenNextPlaceLoads: null,
                goalCamName: goalCamWhenNextPlaceLoads,
              },
            },
          });
        }
        onNextTick(() => {
          if (newPlaceVideosLoaded && newPlaceProbesLoaded && allModelsAreLoaded) {
            setPlayerPositionForNewPlace();

            // onNextTick because sometimes the character position was starting incorrect
            // (maybe because the place-load story-rules werent reacting because it was the wrong flow)
            setGlobalState({ isLoadingBetweenPlaces: false });

            onNextTick(() => {
              const { nowCamName } = getState().global.main;

              whenAllVideosLoadedForPlace();
              updateTexturesForNowCamera(nowCamName, true);
              focusSlateOnFocusedDoll(); // focus on the player

              // Start fading in the scene
              setState({ global: { main: { loadingOverlayToggled: false, loadingOverlayFullyShowing: false } } });

              onNextTick(() => {
                runEffect("globalGeneral", "whenGameTimeSpeedChanges");
              });
            });
          }
        });
      }
    },
    check: {
      type: "global",
      prop: ["newPlaceVideosLoaded", "newPlaceProbesLoaded", "modelNamesLoaded"],
    },
    atStepEnd: true,
    step: "loadNewPlace",
  }),
}));
