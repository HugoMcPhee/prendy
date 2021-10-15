import { AbstractMesh } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import pointIsInside from "../../utils/babylonjs/pointIsInside";
import { makeScenePlaneUtils } from "../../utils/babylonjs/scenePlane";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceInfoByNamePlaceholder,
} from "../typedConceptoFuncs";

export function makeCharacterDynamicRules<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyStartOptions extends GameyStartOptionsUntyped,
  CharacterName extends string,
  DollName extends string,
  AnyCameraName extends string,
  PlaceName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>
>(
  conceptoFuncs: ConceptoFuncs,
  gameyStartOptions: GameyStartOptions,
  characterNames: readonly CharacterName[],
  placeInfoByName: PlaceInfoByName
) {
  const {
    makeRules,
    getState,
    setState,
    getRefs,
    makeDynamicRules,
  } = conceptoFuncs;

  const { updatePlanePositionToFocusOnMesh } = makeScenePlaneUtils(
    conceptoFuncs,
    gameyStartOptions
  );

  const refs = getRefs();

  const placesRefs = refs.places;

  // makeDynamicRules((addItemEffect)=> ({
  //   sdsdf: addItemEffect()
  // }))

  return makeDynamicRules((addItemEffect, addEffect) => ({
    whenPositionChanges: addItemEffect(
      ({
        characterName,
        dollName,
      }: {
        // characterName: CharacterName;
        // dollName: DollName;
        characterName: string | any;
        dollName: string | any;
      }) => ({
        // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
        onItemEffect({ itemRefs, itemState }) {
          // TODO
          // only update the collider stuff here
          // Also listen to dolls positions, and return if not the same dollNAme (easier than dynamic rules for now)

          if (!itemRefs.meshRef) return;

          const {
            nowPlaceName,
            loadingOverlayToggled,
            focusedDoll,
          } = getState().global.main;
          const { cameraNames, triggerNames } = placeInfoByName[nowPlaceName];

          if (loadingOverlayToggled === true) return;

          const characterState = getState().characters[characterName];

          // --------------------------
          // check cam cubes
          let newAtTheseCamCubes = {} as Partial<
            // Record<AnyCameraName, boolean>
            Record<string, boolean>
          >;
          const currentAtCamCubes = characterState.atCamCubes;
          let atCamCubesHasChanged = false;
          forEach(cameraNames, (loopedCameraName) => {
            const camsRefs =
              placesRefs[nowPlaceName].camsRefs[loopedCameraName];

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
            if (
              currentAtCamCubes[loopedCameraName] !==
              newAtTheseCamCubes[loopedCameraName]
            ) {
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
          let newAtTheseTriggers = {} as Record<
            typeof triggerNames[number],
            boolean
          >;
          const currentAtTriggers = characterState.atTriggers;
          let atTriggersHasChanged = false;
          forEach(triggerNames, (loopedTriggerName) => {
            const loopedMesh =
              placesRefs[nowPlaceName].triggerMeshes[loopedTriggerName];

            const isAtLoopedTrigger = !!(
              itemRefs.meshRef &&
              loopedMesh &&
              pointIsInside(itemRefs.meshRef.position, loopedMesh)
            );

            newAtTheseTriggers[loopedTriggerName] = isAtLoopedTrigger;
            if (
              currentAtTriggers[loopedTriggerName] !==
              newAtTheseTriggers[loopedTriggerName]
            ) {
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
            // Update screen position :)
            updatePlanePositionToFocusOnMesh({ meshRef: itemRefs.meshRef });
          }
        },
        check: { type: "dolls", prop: "position", name: dollName },
        whenToRun: "subscribe", // so it only runs once (it sometimes ran twice with  "derive" (without the "beforePainting" flow I think))
        flow: "checkCollisions",
      })
    ),
    // whenInRangeChanges: addItemEffect(
    //   ({
    //     characterName,
    //     dollName,
    //   }: {
    //     characterName: CharacterName;
    //     dollName: DollName;
    //   }) => ({
    //     // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
    //     onItemEffect({ newValue: newInRange, itemName }) {
    //       // console.log(itemName, " in range");
    //       // console.log(newInRange.cat);
    //     },
    //     check: { type: "dolls", prop: "inRange", name: dollName },
    //     whenToRun: "subscribe",
    //   })
    // ),
  }));
}

// FIXME
// maybe allow concepto to run 'addedOrRemoved' rules for initialState?
// TODO add addOrRemovd rules for characters

export function makeStartDynamicCharacterRulesForInitialState<
  ConceptoFuncs extends GameyConceptoFuncs,
  CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>,
  CharacterName extends string
>(
  characterDynamicRules: CharacterDynamicRules,
  characterNames: readonly CharacterName[],
  conceptoFuncs: ConceptoFuncs
) {
  const { getState } = conceptoFuncs;
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

export function makeCharacterRules<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>
>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName) {
  const { makeRules, getState, setState } = conceptoFuncs;

  return makeRules((addItemEffect, addEffect) => ({
    // should be a  dynamic rule ?
    whenCameraChangesForPlanePosition: addEffect({
      // in a different flow to "cameraChange"
      onEffect() {
        // focusScenePlaneOnFocusedDoll();
      },
      check: { type: "places", prop: ["nowCamName"] },
    }),

    whenAtCamCubes: addItemEffect({
      onItemEffect({
        newValue: newAtCamCubes,
        previousValue: prevAtCamCubes,
        itemName: charName,
      }) {
        const { playerCharacter } = getState().global.main;

        if (charName !== playerCharacter) return; // NOTE maybe dynamic rule better (since the listener wont run for other characters)

        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().places[nowPlaceName];
        const { cameraNames } = placeInfoByName[nowPlaceName];

        forEach(cameraNames, (loopedCameraName) => {
          if (
            loopedCameraName !== nowCamName &&
            newAtCamCubes[loopedCameraName] &&
            !prevAtCamCubes[loopedCameraName]
          ) {
            setState({
              places: {
                // [nowPlaceName]: { nowCamName: loopedCameraName },
                [nowPlaceName]: { wantedCamName: loopedCameraName },
              },
            });
          }
        });
      },
      check: { type: "characters", prop: "atCamCubes" }, // NOTE Maybe change this to current player character with dynamic rule
      flow: "collisionReaction",
      whenToRun: "subscribe",
    }),

    // NOTE Could be dynamic rule for all characters?
    whenPlaceChanges: addItemEffect({
      onItemEffect() {
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
