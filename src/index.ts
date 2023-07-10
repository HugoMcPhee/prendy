import "@babylonjs/loaders";
import {
  CharacterName,
  DollName,
  PlaceInfoByName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
} from "./declarations";
import { get_getSceneOrEngineUtils } from "./helpers/babylonjs/getSceneOrEngineUtils";
import { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
import { get_setStoryState, makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { get_globalUtils } from "./helpers/prendyUtils/global";
import { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
import { Point2D } from "chootils/dist/points2d";
import { PrendySaveState } from "./stores/global/global";
import { point3dToVector3, vector3ToPoint3d } from "./helpers/babylonjs/vectors";
import { Vector3 } from "@babylonjs/core";
import delay from "delay";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartPrendyRules, makeStartPrendyMainRules, makeStartAndStopRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";

export function makeOtherUsefulPrendyUtils(storeHelpers: PrendyStoreHelpers) {
  const setStoryState = get_setStoryState(storeHelpers);
  const { getGlobalState, setGlobalState } = get_globalUtils(storeHelpers);
  const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}

export function makePrendyHelpers(
  storeHelpers: PrendyStoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const prendyStoryHelpers = makePrendyStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
  const allStoryRuleMakers = makeAllStoryRuleMakers(
    storeHelpers,
    prendyAssets.placeInfoByName,
    prendyAssets.characterNames,
    prendyAssets.dollNames
  );

  const otherPrendyUtils = {
    ...makePrendyStoryUtils(storeHelpers, prendyStores),
    ...makeOtherUsefulPrendyUtils(storeHelpers),
  };

  const { setGlobalState, getGlobalState } = otherPrendyUtils;

  function savePrendyState() {
    const storeState = storeHelpers.getState();

    const newSaveState: PrendySaveState = {
      global: {
        nowCamName: storeState.global.main.nowCamName,
        nowPlaceName: storeState.global.main.nowPlaceName,
        nowSegmentName: storeState.global.main.nowSegmentName,
        heldPickups: storeState.global.main.heldPickups,
        storyOverlayToggled: storeState.global.main.storyOverlayToggled,
        alarmTextIsVisible: storeState.global.main.alarmTextIsVisible,
        alarmText: storeState.global.main.alarmText,
        aSpeechBubbleIsShowing: storeState.global.main.aSpeechBubbleIsShowing,
        aConvoIsHappening: storeState.global.main.aConvoIsHappening,
      },
      dolls: Object.fromEntries(
        Object.entries(storeState.dolls).map(([dollName, doll]) => [
          dollName,
          {
            position: doll.position,
            rotationY: doll.rotationY,
            isVisible: doll.isVisible,
            // collisionsEnabled: doll.collisionsEnabled,
            toggledMeshes: doll.toggledMeshes,
            inRange: doll.inRange,
          },
        ])
      ),
      characters: Object.fromEntries(
        Object.entries(storeState.characters).map(([characterName, character]) => [
          characterName,
          {
            hasLeftFirstTrigger: character.hasLeftFirstTrigger,
          },
        ])
      ),
      player: {
        animationNames: {
          walking: storeState.players.main.animationNames.walking,
          idle: storeState.players.main.animationNames.idle,
        },
      },
      miniBubbles: Object.fromEntries(
        Object.entries(storeState.miniBubbles).map(([miniBubbleName, miniBubble]) => [
          miniBubbleName,
          {
            isVisible: miniBubble.isVisible,
            text: miniBubble.text,
          },
        ])
      ),
      speechBubbles: Object.fromEntries(
        Object.entries(storeState.speechBubbles).map(([speechBubbleName, speechBubble]) => [
          speechBubbleName,
          {
            isVisible: speechBubble.isVisible,
            goalText: speechBubble.goalText,
            nowVideoName: speechBubble.nowVideoName,
            font: speechBubble.font,
            stylesBySpecialText: speechBubble.stylesBySpecialText,
            forCharacter: speechBubble.forCharacter,
            typingFinished: speechBubble.typingFinished,
          },
        ])
      ),
      storyState: { ...storeState.story.main }, // need to copy a new object, otherwise the reference is the same and the storyState is not saved
    };

    console.log("newSaveState", newSaveState);

    setGlobalState({ latestSave: newSaveState });

    // save newSaveState to localStorage
    localStorage.setItem("prendySaveState", JSON.stringify(newSaveState));
  }

  async function loadPrendyState() {
    // const savedState: PrendySaveState = getGlobalState().latestSave;

    // get latest save state from localStorage
    const savedStateString = localStorage.getItem("prendySaveState");
    if (!savedStateString) {
      console.log("no saved state found in localStorage");

      return;
    }
    const savedState: PrendySaveState = JSON.parse(savedStateString);
    console.log("savedState", savedState);

    await otherPrendyUtils.waitForNextTick();

    await prendyStoryHelpers.scene.showStoryView(false);

    const camWillChange = savedState.global.nowCamName !== getGlobalState().nowCamName;
    // if the savedState.global.nowPlaceName is different from the current place, use the helepr to set the place
    const placeWillChange = savedState.global.nowPlaceName !== getGlobalState().nowPlaceName;
    if (placeWillChange) {
      prendyStoryHelpers.scene.goToNewPlace({
        toPlace: savedState.global.nowPlaceName,
        toSegment: savedState.global.nowSegmentName,
        toCam: savedState.global.nowCamName,
      });
      await otherPrendyUtils.waitForPlaceFullyLoaded(savedState.global.nowPlaceName);
    } else {
      if (camWillChange && !placeWillChange) {
        storeHelpers.setState({
          global: { main: { goalCamName: savedState.global.nowCamName } },
        });
        await otherPrendyUtils.waitForNowCamToChange(savedState.global.nowCamName);
      }
    }

    // Set the doll positions manually, since setting the state will check for collisions
    Object.entries(savedState.dolls).forEach(([dollName, doll]) => {
      prendyStoryHelpers.dolls.setDollPosition(dollName, point3dToVector3(doll.position));
      prendyStoryHelpers.dolls.springDollRotationY(dollName, doll.rotationY);
    });

    // Set the store state to the saved state
    storeHelpers.setState(
      (state) => {
        return {
          global: {
            main: {
              goalCamName: savedState.global.nowCamName,
              goalPlaceName: savedState.global.nowPlaceName,
              goalSegmentName: savedState.global.nowSegmentName,
              heldPickups: savedState.global.heldPickups,
              storyOverlayToggled: savedState.global.storyOverlayToggled,
              alarmTextIsVisible: savedState.global.alarmTextIsVisible,
              alarmText: savedState.global.alarmText,
              aSpeechBubbleIsShowing: savedState.global.aSpeechBubbleIsShowing,
              aConvoIsHappening: savedState.global.aConvoIsHappening,
            },
          },
          dolls: Object.fromEntries(
            Object.entries(savedState.dolls).map(([dollName, doll]) => [
              dollName,
              {
                toggledMeshes: doll.toggledMeshes,
                isVisible: doll.isVisible,
                // collisionsEnabled: doll.collisionsEnabled,
                inRange: doll.inRange,
              },
            ])
          ),
          characters: Object.fromEntries(
            Object.entries(savedState.characters).map(([characterName, character]) => [
              characterName,
              {
                hasLeftFirstTrigger: character.hasLeftFirstTrigger,
              },
            ])
          ),
          players: {
            main: {
              animationNames: {
                ...state.players.main.animationNames,
                walking: savedState.player.animationNames.walking,
                idle: savedState.player.animationNames.idle,
              },
            },
          },
          miniBubbles: Object.fromEntries(
            Object.entries(savedState.miniBubbles).map(([miniBubbleName, miniBubble]) => [
              miniBubbleName,
              {
                // ...state.miniBubbles[miniBubbleName],
                isVisible: miniBubble.isVisible,
                text: miniBubble.text,
              },
            ])
          ),
          speechBubbles: Object.fromEntries(
            Object.entries(savedState.speechBubbles).map(([speechBubbleName, speechBubble]) => [
              speechBubbleName,
              {
                // ...state.speechBubbles[speechBubbleName],
                isVisible: speechBubble.isVisible,
                goalText: speechBubble.goalText,
                nowVideoName: speechBubble.nowVideoName,
                font: speechBubble.font,
                stylesBySpecialText: speechBubble.stylesBySpecialText,
                forCharacter: speechBubble.forCharacter,
                typingFinished: speechBubble.typingFinished,
              },
            ])
          ),
          story: { main: savedState.storyState },
        };
      },
      () => {
        // storeHelpers.setState({ global: { main: { latestLoadTime: Date.now() } } }, () => {
        prendyStoryHelpers.scene.showStoryView(true);
        // });
      }
    );
  }

  return {
    story: prendyStoryHelpers,
    rules: allStoryRuleMakers,
    utils: { ...otherPrendyUtils, savePrendyState, loadPrendyState },
  };
}
