import { AbstractMesh } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import {
  AnyCameraName,
  AnyTriggerName,
  CharacterName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
} from "../declarations";
import pointIsInside from "../helpers/babylonjs/pointIsInside";
import { get_slateUtils } from "../helpers/babylonjs/slate";

export function get_characterDynamicRules(
  storeHelpers: PrendyStoreHelpers,
  prendyOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getState, setState, getRefs, makeDynamicRules } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { focusSlateOnFocusedDoll: focusSlateOnFocusedDoll } = get_slateUtils(storeHelpers, prendyOptions);

  const refs = getRefs();

  const placesRefs = refs.places;

  return makeDynamicRules(({ itemEffect, effect }) => ({
    whenPositionChanges: effect(
      ({
        characterName,
        dollName,
      }: {
        characterName: string | any; // CharacterName
        dollName: string | any; // DollName
      }) => ({
        // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
        run({ itemRefs, newValue, previousValue }) {
          // console.log("prevItemState", other);

          // TODO
          // only update the collider stuff here
          // Also listen to dolls positions, and return if not the same dollName (easier than dynamic rules for now)

          // if (samePoints(newValue ?? defaultPosition, previousValue ?? defaultPosition)) return;

          if (!itemRefs.meshRef) return;

          const { nowPlaceName, loadingOverlayToggled, focusedDoll } = getState().global.main;
          const nowPlaceInfo = placeInfoByName[nowPlaceName];
          const triggerNames = nowPlaceInfo.triggerNames as AnyTriggerName[];
          const cameraNames = nowPlaceInfo.cameraNames as AnyCameraName[];

          if (loadingOverlayToggled === true) return;

          const characterState = getState().characters[characterName];

          // --------------------------
          // check cam cubes
          // TODO only check for the player character?
          // const { playerCharacter } = getState().global.main;
          // if (charName !== playerCharacter) return; // NOTE maybe dynamic rule better (since the listener wont run for other characters)

          let newAtTheseCamCubes = {} as Partial<
            // Record<AnyCameraName, boolean>
            Record<string, boolean>
          >;
          const currentAtCamCubes = characterState.atCamCubes;
          let atCamCubesHasChanged = false;
          forEach(cameraNames, (loopedCameraName) => {
            const camsRefs = placesRefs[nowPlaceName].camsRefs[loopedCameraName];

            let isAtLoopedCamCube = false;

            forEach(camsRefs.camCubeMeshes, (loopedMesh: AbstractMesh) => {
              const isAtLoopedCamCubeMesh = !!(
                itemRefs.meshRef &&
                loopedMesh &&
                camsRefs.isTriggerable &&
                pointIsInside(itemRefs.meshRef.position, loopedMesh)
              );

              if (isAtLoopedCamCubeMesh) {
                isAtLoopedCamCube = true;
              }
            });
            newAtTheseCamCubes[loopedCameraName] = isAtLoopedCamCube;
            if (currentAtCamCubes[loopedCameraName] !== newAtTheseCamCubes[loopedCameraName]) {
              atCamCubesHasChanged = true;
            }
          });

          if (atCamCubesHasChanged) {
            setState({
              characters: {
                [characterName]: { atCamCubes: newAtTheseCamCubes },
              },
            });
          }

          // --------------------------
          // check triggers
          let newAtTheseTriggers = {} as Record<(typeof triggerNames)[number], boolean>;
          const currentAtTriggers = characterState.atTriggers;
          let atTriggersHasChanged = false;
          forEach(triggerNames, (loopedTriggerName) => {
            const loopedMesh = placesRefs[nowPlaceName].triggerMeshes[loopedTriggerName];

            const isAtLoopedTrigger = !!(
              itemRefs.meshRef &&
              loopedMesh &&
              pointIsInside(itemRefs.meshRef.position, loopedMesh)
            );

            newAtTheseTriggers[loopedTriggerName] = isAtLoopedTrigger;
            if (currentAtTriggers[loopedTriggerName] !== newAtTheseTriggers[loopedTriggerName]) {
              atTriggersHasChanged = true;
            }
          });
          if (atTriggersHasChanged) {
            setState({
              characters: {
                [characterName]: { atTriggers: newAtTheseTriggers },
              },
            });
          }

          if (dollName === focusedDoll) {
            focusSlateOnFocusedDoll();
          }
        },
        check: { type: "dolls", prop: "position", name: dollName },
        atStepEnd: true, // so it only runs once (it sometimes ran twice with  "derive" (without the "beforePainting" flow I think))
        step: "checkCollisions",
        // NOTE "becomes" isn't working for dynamic rules?
        // becomes: (position, prevPosition) => {
        //   console.log("becomes", position, prevPosition);

        //   return samePoints(position ?? defaultPosition, prevPosition ?? defaultPosition);
        // },
      })
    ),
    // whenInRangeChanges: itemEffect(
    //   ({
    //     characterName,
    //     dollName,
    //   }: {
    //     characterName: CharacterName;
    //     dollName: DollName;
    //   }) => ({
    //     // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
    //     run({ newValue: newInRange, itemName }) {
    //       // console.log(itemName, " in range");
    //       // console.log(newInRange.cat);
    //     },
    //     check: { type: "dolls", prop: "inRange", name: dollName },
    //     atStepEnd: true,
    //   })
    // ),
  }));
}

// FIXME
// maybe allow repond to run 'addedOrRemoved' rules for initialState?
// NOTE rules can be manually triggered atleast, but the rule might not know an item was added
// TODO add addOrRemovd rules for characters

export function get_startDynamicCharacterRulesForInitialState<
  CharacterDynamicRules extends ReturnType<typeof get_characterDynamicRules>
>(
  characterDynamicRules: CharacterDynamicRules,
  characterNames: readonly CharacterName[],
  storeHelpers: PrendyStoreHelpers
) {
  const { getState } = storeHelpers;
  return function startDynamicCharacterRulesForInitialState() {
    forEach(characterNames, (characterName) => {
      const { dollName } = getState().characters[characterName];
      if (!dollName) return;
      characterDynamicRules.startAll({ characterName, dollName });
    });
    return function stopDynamicCharacterRulesForInitialState() {
      forEach(characterNames, (characterName) => {
        const { dollName } = getState().characters[characterName];
        if (!dollName) return;
        characterDynamicRules.stopAll({ characterName, dollName });
      });
    };
  };
}

export function get_characterRules(storeHelpers: PrendyStoreHelpers, prendyAssets: PrendyAssets) {
  const { makeRules, getState, setState } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  return makeRules(({ itemEffect, effect }) => ({
    whenAtCamCubes: itemEffect({
      run({ newValue: newAtCamCubes, previousValue: prevAtCamCubes, itemName: charName }) {
        const { playerCharacter } = getState().global.main;

        if (charName !== playerCharacter) return; // NOTE maybe dynamic rule better (since the listener wont run for other characters)

        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().global.main;
        const cameraNames = placeInfoByName[nowPlaceName].cameraNames as AnyCameraName[];

        forEach(cameraNames, (loopedCameraName) => {
          if (loopedCameraName !== nowCamName && newAtCamCubes[loopedCameraName] && !prevAtCamCubes[loopedCameraName]) {
            setState({ global: { main: { goalCamName: loopedCameraName } } });
          }
        });
      },
      check: { type: "characters", prop: "atCamCubes" }, // NOTE Maybe change this to current player character with dynamic rule
      step: "collisionReaction",
      atStepEnd: true,
    }),

    // NOTE Could be dynamic rule for all characters?
    whenPlaceChanges: itemEffect({
      run() {
        setState((state) => ({
          characters: {
            [state.global.main.playerCharacter]: {
              hasLeftFirstTrigger: false,
            },
          },
        }));
      },
      check: { type: "global", prop: "nowPlaceName" },
    }),
  }));
}
