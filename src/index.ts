import "@babylonjs/loaders";
import { MyTypes } from "./declarations";
import { point3dToVector3 } from "./helpers/babylonjs/vectors";
import { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
import { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { getGlobalState, setGlobalState } from "./helpers/prendyUtils/global";
import { waitForNextTick, waitForNowCamToChange, waitForPlaceFullyLoaded } from "./helpers/prendyUtils/scene";
import { meta } from "./meta";
import { get_dollRules } from "./rules/dolls";
import { PrendySaveState } from "./stores/global/global";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";

export const definiedPrendyRules = {
  dolls: null as null | ReturnType<typeof get_dollRules>,
};

export function makePrendyHelpers<T_MyTypes extends MyTypes = MyTypes>(
  assets: T_MyTypes["Assets"],
  stores: T_MyTypes["Stores"],
  repond: T_MyTypes["Repond"]
) {
  type CameraNameByPlace = T_MyTypes["Types"]["CameraNameByPlace"];
  type PlaceName = T_MyTypes["Types"]["PlaceName"];
  type SegmentNameByPlace = T_MyTypes["Types"]["SegmentNameByPlace"];

  meta.assets = assets;
  meta.repond = repond;
  meta.stores = stores;

  const prendyStoryHelpers = makePrendyStoryHelpers();

  const allStoryRuleMakers = makeAllStoryRuleMakers(
    repond,
    assets.placeInfoByName,
    assets.characterNames,
    assets.dollNames
  );

  function savePrendyState() {
    const storeState = repond.getState();

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
            nowAnimation: doll.nowAnimation,
            // animWeightsGoal: doll.animWeightsGoal,
          },
        ])
      ),
      places: Object.fromEntries(
        Object.entries(storeState.places).map(([placeName, place]) => [
          placeName,
          {
            toggledWalls: place.toggledWalls,
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

    await waitForNextTick();

    await prendyStoryHelpers.scene.showStoryView(false);

    const camWillChange = savedState.global.nowCamName !== getGlobalState().nowCamName;
    // if the savedState.global.nowPlaceName is different from the current place, use the helepr to set the place
    const placeWillChange = savedState.global.nowPlaceName !== getGlobalState().nowPlaceName;
    if (placeWillChange) {
      prendyStoryHelpers.scene.goToNewPlace({
        toPlace: savedState.global.nowPlaceName as PlaceName,
        toSegment: savedState.global.nowSegmentName as SegmentNameByPlace[PlaceName],
        toCam: savedState.global.nowCamName as CameraNameByPlace[PlaceName],
      });
      await waitForPlaceFullyLoaded(savedState.global.nowPlaceName);
    } else {
      if (camWillChange && !placeWillChange) {
        repond.setState({
          global: { main: { goalCamName: savedState.global.nowCamName } },
        });
        await waitForNowCamToChange(savedState.global.nowCamName);
      }
    }

    // Set the doll positions manually, since setting the state will check for collisions
    Object.entries(savedState.dolls).forEach(([dollName, doll]) => {
      prendyStoryHelpers.dolls.setDollPosition(dollName, point3dToVector3(doll.position));
      prendyStoryHelpers.dolls.springDollRotationY(dollName, doll.rotationY);
    });

    // Set the store state to the saved state
    repond.setState(
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
                nowAnimation: doll.nowAnimation,
                // animWeightsGoal: doll.animWeightsGoal,
              },
            ])
          ),
          places: Object.fromEntries(
            Object.entries(savedState.places).map(([placeName, place]) => [
              placeName,
              {
                toggledWalls: place.toggledWalls,
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
    utils: { savePrendyState, loadPrendyState },
  };
}

export function getDefaultDollOptions<T_ModelName extends string>(modelNames: readonly T_ModelName[]) {
  type DollOption = { model: T_ModelName };
  const modelDollOptions: Record<string, DollOption> = {};
  modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
  return modelDollOptions as { [K_ModelName in T_ModelName]: { model: K_ModelName } };
}

export type DollOptionLoose<T_ModelName extends string> = { model: T_ModelName };
// export type DollOptionsLoose<T_ModelName extends string> = {
//   [K_ModelName in T_ModelName]: DollOptionLoose<K_ModelName>;
// };
export type DollOptionsLoose<T_ModelName extends string> = Record<string, DollOptionLoose<T_ModelName>>;

export type CharacterOptionLoose<T_DollName extends string, T_FontName extends string> = Record<
  string,
  { doll: T_DollName; font: T_FontName }
>;
