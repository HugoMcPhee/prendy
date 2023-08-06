import "@babylonjs/loaders";
import {
  AnimationNameByModel,
  AnyAnimationName,
  AnyCameraName,
  AnySegmentName,
  AnyTriggerName,
  BoneNameByModel,
  CameraNameByPlace,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MeshNameByModel,
  ModelInfoByName,
  ModelName,
  MusicFiles,
  MusicName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SoundFiles,
  SoundName,
  SpotNameByPlace,
  StoryPartName,
  TriggerNameByPlace,
  WallNameByPlace,
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
import { get_dollRules } from "./rules/dolls";
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

export const definiedPrendyRules = {
  dolls: null as null | ReturnType<typeof get_dollRules>,
};

export function makeOtherUsefulPrendyUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(
  storeHelpers: A_PrendyStoreHelpers
) {
  const setStoryState = get_setStoryState<A_PrendyStoreHelpers>(storeHelpers);
  const { getGlobalState, setGlobalState } = get_globalUtils<A_PrendyStoreHelpers>(storeHelpers);
  const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}

export function makePrendyHelpers<
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_ModelName extends ModelName = ModelName,
  A_MusicFiles extends MusicFiles = MusicFiles,
  A_MusicName extends MusicName = MusicName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SoundFiles extends SoundFiles = SoundFiles,
  A_SoundName extends SoundName = SoundName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_StoryPartName extends StoryPartName = StoryPartName,
  A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(
  storeHelpers: A_PrendyStoreHelpers,
  prendyStores: A_PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  prendyAssets: A_PrendyAssets
) {
  const prendyStoryHelpers = makePrendyStoryHelpers<
    A_AnimationNameByModel,
    A_AnyAnimationName,
    A_AnyCameraName,
    A_AnySegmentName,
    A_BoneNameByModel,
    A_CameraNameByPlace,
    A_CharacterName,
    A_CharacterOptions,
    A_DollName,
    A_DollOptions,
    A_MeshNameByModel,
    A_ModelInfoByName,
    A_ModelName,
    A_MusicFiles,
    A_MusicName,
    A_PickupName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SegmentNameByPlace,
    A_SoundFiles,
    A_SoundName,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
  const allStoryRuleMakers = makeAllStoryRuleMakers<
    A_AnyTriggerName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_DollName,
    A_PickupName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_PrendyStoreHelpers,
    A_StoryPartName,
    A_TriggerNameByPlace
  >(
    storeHelpers,
    prendyAssets.placeInfoByName as A_PlaceInfoByName,
    prendyAssets.characterNames as A_CharacterName[],
    prendyAssets.dollNames as A_DollName[]
  );

  const otherPrendyUtils = {
    ...makePrendyStoryUtils<
      A_AnyCameraName,
      A_AnySegmentName,
      A_CameraNameByPlace,
      A_CharacterName,
      A_DollName,
      A_PlaceName,
      A_PrendyStoreHelpers,
      A_PrendyStores,
      A_SpotNameByPlace
    >(storeHelpers, prendyStores),
    ...makeOtherUsefulPrendyUtils<A_PrendyStoreHelpers>(storeHelpers),
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

    await otherPrendyUtils.waitForNextTick();

    await prendyStoryHelpers.scene.showStoryView(false);

    const camWillChange = savedState.global.nowCamName !== getGlobalState().nowCamName;
    // if the savedState.global.nowPlaceName is different from the current place, use the helepr to set the place
    const placeWillChange = savedState.global.nowPlaceName !== getGlobalState().nowPlaceName;
    if (placeWillChange) {
      prendyStoryHelpers.scene.goToNewPlace({
        toPlace: savedState.global.nowPlaceName as A_PlaceName,
        toSegment: savedState.global.nowSegmentName as A_SegmentNameByPlace[A_PlaceName],
        toCam: savedState.global.nowCamName as A_CameraNameByPlace[A_PlaceName],
      });
      await otherPrendyUtils.waitForPlaceFullyLoaded(savedState.global.nowPlaceName as A_PlaceName);
    } else {
      if (camWillChange && !placeWillChange) {
        storeHelpers.setState({
          global: { main: { goalCamName: savedState.global.nowCamName } },
        });
        await otherPrendyUtils.waitForNowCamToChange(savedState.global.nowCamName as A_AnyCameraName);
      }
    }

    // Set the doll positions manually, since setting the state will check for collisions
    Object.entries(savedState.dolls).forEach(([dollName, doll]) => {
      prendyStoryHelpers.dolls.setDollPosition(dollName as A_DollName, point3dToVector3(doll.position));
      prendyStoryHelpers.dolls.springDollRotationY(dollName as A_DollName, doll.rotationY);
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
    utils: { ...otherPrendyUtils, savePrendyState, loadPrendyState },
  };
}
