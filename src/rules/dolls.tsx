import { PBRMaterial } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { subtractPointsSafer } from "chootils/dist/points3d";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { getShortestAngle, getVectorAngle } from "chootils/dist/speedAngleDistance2d";
import { makeMoverUtils } from "repond-movers";
import { cloneObjectWithJson } from "repond/dist/utils";
import { MyTypes } from "../declarations";
import { setGlobalPositionWithCollisions } from "../helpers/babylonjs/setGlobalPositionWithCollisions";
import { get_slateUtils } from "../helpers/babylonjs/slate";
import { point3dToVector3 } from "../helpers/babylonjs/vectors";
import {
  InRangeForDoll,
  getDefaultInRangeFunction,
  get_dollStoryUtils,
  get_dollUtils,
} from "../helpers/prendyUtils/dolls";
import { timeStatePath } from "../stores/global/global";

// const dollDynamicRules = makeDynamicRules({
//   whenModelLoadsForDoll
// });

// when the models isLoading becomes true

// TODO add to art options?
const rangeOptions = {
  touch: 1, // prev 2
  talk: 2, // prev 3
  see: 6, // prev 20
} as const;

export const rangeOptionsQuick = {
  touch: rangeOptions.touch * rangeOptions.touch,
  talk: rangeOptions.talk * rangeOptions.talk,
  see: rangeOptions.see * rangeOptions.see,
} as const;

export function get_dollDynamicRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  prendyStores: T_MyTypes["Stores"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type DollName = T_MyTypes["Main"]["DollName"];
  type ModelName = T_MyTypes["Main"]["ModelName"];

  const { saveModelStuffToDoll, setupLightMaterial } = get_dollUtils(prendyAssets, storeHelpers);
  const { getRefs, getState, setState, makeDynamicRules } = storeHelpers;
  const { prendyOptions } = prendyAssets;

  return makeDynamicRules(({ itemEffect }) => ({
    waitForModelToLoad: itemEffect(({ dollName, modelName }: { dollName: DollName; modelName: ModelName }) => ({
      run() {
        saveModelStuffToDoll({ dollName, modelName });
      },
      name: `doll_waitForModelToLoad${dollName}_${modelName}`,
      check: { type: "models", name: modelName, prop: "isLoaded", becomes: true },
      atStepEnd: true,
    })),
    // When the place and all characters are loaded
    whenWholePlaceFinishesLoading: itemEffect(
      ({ dollName, modelName }: { dollName: DollName; modelName: ModelName }) => ({
        run() {
          const modelRefs = getRefs().models[modelName];

          if (modelRefs.materialRefs) {
            forEach(modelRefs.materialRefs, (materialRef: PBRMaterial) => setupLightMaterial(materialRef));
          }

          setupLightMaterial(modelRefs.materialRef);

          // using modelNamesByPlace, set the doll state to invisible if it's not in the current place

          const { nowPlaceName } = getState().global.main;
          // const { modelName } = getState().dolls[dollName];
          const { modelNamesByPlace } = prendyOptions;
          const modelNamesForPlace = modelNamesByPlace[nowPlaceName];
          const isInPlace = modelNamesForPlace.includes(modelName);
          if (!isInPlace) {
            setState({ dolls: { [dollName]: { isVisible: false } } });
          } else {
            setState({ dolls: { [dollName]: { isVisible: true } } });
          }
        },
        name: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
        check: { type: "global", prop: ["isLoadingBetweenPlaces"], becomes: false },
        atStepEnd: true,
        step: "respondToNewPlace",
      })
    ),
  }));
}

// FIXME
// maybe allow repond to run 'addedOrRemoved' rules for initialState?
// NOTE rules can be manually triggered atleast, but the rule might not know an item was added

export function startDynamicDollRulesForInitialState<
  DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>,
  T_MyTypes extends MyTypes = MyTypes
>(
  storeHelpers: T_MyTypes["StoreHelpers"],
  dollDynamicRules: DollDynamicRules,
  dollNames: readonly T_MyTypes["Main"]["DollName"][]
) {
  const { getState } = storeHelpers;

  forEach(dollNames, (dollName) => {
    const { modelName } = getState().dolls[dollName];
    if (!modelName) return;

    dollDynamicRules.startAll({ dollName, modelName });
  });
  return function stopDynamicDollRulesForInitialState() {
    forEach(dollNames, (dollName) => {
      const { modelName } = getState().dolls[dollName];
      if (!modelName) return;
      dollDynamicRules.stopAll({ dollName, modelName });
    });
  };
}

export function get_dollRules<
  DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>,
  T_MyTypes extends MyTypes = MyTypes
>(dollDynamicRules: DollDynamicRules, prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]) {
  type AnyAnimationName = T_MyTypes["Main"]["AnyAnimationName"];
  type DollName = T_MyTypes["Main"]["DollName"];
  type DollOptions = T_MyTypes["Main"]["DollOptions"];
  type MeshNameByModel = T_MyTypes["Main"]["MeshNameByModel"];
  type ModelName = T_MyTypes["Main"]["ModelName"];

  const { modelInfoByName, dollNames, prendyOptions, placeInfoByName } = prendyAssets;
  const { getQuickDistanceBetweenDolls, inRangesAreTheSame, setDollAnimWeight, updateDollScreenPosition } =
    get_dollUtils(prendyAssets, storeHelpers);
  const { focusSlateOnFocusedDoll } = get_slateUtils(prendyAssets, storeHelpers);
  const { makeRules, getPreviousState, getState, getRefs, setState, onNextTick } = storeHelpers;
  const { addMoverRules } = makeMoverUtils(storeHelpers, timeStatePath);
  const { getModelNameFromDoll } = get_dollStoryUtils(storeHelpers);

  type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];
  type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];

  return makeRules(({ itemEffect, effect }) => ({
    // --------------------------------
    // loading model stuff
    // --------------------------------
    whenModelNameChanges: itemEffect({
      run({ itemName: dollName, newValue: newModelName, previousValue: prevModelName }) {
        // stop the previous dynamic rule, and start the new one
        dollDynamicRules.stopAll({ dollName, modelName: prevModelName });
        dollDynamicRules.startAll({ dollName, modelName: newModelName });
      },
      check: { type: "dolls", prop: "modelName" },
    }),
    whenDollAddedOrRemoved: effect({
      run(diffInfo) {
        //TODO maybe make it easier to add itemAdded rule and itemRemoved rule

        // stop the previous dynamic rule, and start the new one
        forEach(diffInfo.itemsRemoved.dolls as DollName[], (dollName) => {
          const { modelName } = getPreviousState().dolls[dollName];
          dollDynamicRules.stopAll({ dollName, modelName });
        });
        forEach(diffInfo.itemsAdded.dolls as DollName[], (dollName) => {
          const { modelName } = getState().dolls[dollName];
          dollDynamicRules.startAll({ dollName, modelName });
        });
      },
      check: { type: "dolls", addedOrRemoved: true },
    }),
    // --------------------------------
    // animations
    // --------------------------------
    whenNowAnimationChanged: itemEffect({
      run({ newValue: nowAnimation, itemState, itemName: dollName }) {
        const { modelName } = itemState;
        const animationNames = modelInfoByName[modelName].animationNames as AnyAnimationName[];

        // type T_ModelName = typeof modelName;

        // let newWeights = {} as Record<
        //   AnimationNameByModel[T_ModelName],
        //   number
        // >;
        let newWeights = {} as Record<DollName, number>;
        forEach(animationNames, (aniName) => {
          newWeights[aniName] = nowAnimation === aniName ? 1 : 0;
        });
        setDollAnimWeight(dollName as DollName, newWeights);
      },
      check: { type: "dolls", prop: "nowAnimation" },
      step: "dollAnimation",
      atStepEnd: true,
    }),

    whenAnimWeightsChanged: itemEffect({
      run({ newValue: animWeights, itemState, itemRefs: dollRefs }) {
        const { gameTimeSpeed } = getState().global.main;

        const { modelName } = itemState;
        const animationNames = modelInfoByName[modelName].animationNames as AnyAnimationName[];

        if (!dollRefs.aniGroupsRef) return;
        forEach(animationNames, (aniName) => {
          if (!dollRefs.aniGroupsRef) return;
          const aniRef = dollRefs.aniGroupsRef[aniName];
          // const { timerSpeed } = getRefs().global.main;
          // if (aniRef._speedRatio !== timerSpeed) {
          //   aniRef._speedRatio = timerSpeed;
          // }
          if (!aniRef) {
            console.warn("tried to use undefined animation", aniName);
            return;
          }
          // console.log("gameTimeSpeed", gameTimeSpeed);

          if (aniRef && aniRef?.speedRatio !== gameTimeSpeed) {
            aniRef.speedRatio = gameTimeSpeed;
          }

          const animWeight = animWeights[aniName];
          const animIsStopped = animWeight < 0.003;

          // stops playing if the weight is 0ish

          if (animIsStopped) {
            if (aniRef?.isPlaying) aniRef.stop();
          } else {
            if (!aniRef?.isPlaying) aniRef.start(itemState.animationLoops);
          }

          aniRef?.setWeightForAllAnimatables(animWeights[aniName]);
        });
      },
      check: { type: "dolls", prop: "animWeights" },
      atStepEnd: true,
      step: "dollAnimation2",
    }),
    whenGameTimeSpeedChanges: itemEffect({
      run({ newValue: newGameTimeSpeed }) {
        // loop through all dolls and set the animation speed
        forEach(dollNames, (dollName) => {
          const dollRefs = getRefs().dolls[dollName];
          const { animWeights, modelName } = getState().dolls[dollName];
          const animationNames = modelInfoByName[modelName].animationNames as AnyAnimationName[];

          forEach(animationNames, (aniName) => {
            const aniRef = dollRefs.aniGroupsRef[aniName];
            if (!aniRef) return;
            aniRef.speedRatio = newGameTimeSpeed;
            // aniRef?.setWeightForAllAnimatables(animWeights[aniName]);
          });
        });

        // set the state vid playback speed to gameTimeSpeed
        //  get all the stateVid video refs
        // get the names of all state vids

        // get the current place name
        const { nowPlaceName } = getState().global.main;

        // loop all the camera names for the current place
        const placeInfo = placeInfoByName[nowPlaceName];
        const { cameraNames } = placeInfo;

        const sliceVidState = getState().sliceVids[nowPlaceName];
        const { stateVidId_playing, stateVidId_waiting } = sliceVidState;
        // if (!stateVidId_playing) return;

        const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
        const backdropWaitVidRefs = getRefs().stateVids[stateVidId_waiting];

        backdropVidRefs.videoElement.playbackRate = newGameTimeSpeed;
        backdropWaitVidRefs.videoElement.playbackRate = newGameTimeSpeed;

        // loop all the camera names
        // forEach(cameraNames, (cameraName) => {
        //   const { stateVidName } = getState().cameras[cameraName];
        //   const { videoRef } = getRefs().videos[stateVidName];
        //   if (!videoRef) return;

        //   videoRef.playbackRate = newGameTimeSpeed;
        // }
      },
      check: { type: "global", prop: "gameTimeSpeed" },
      atStepEnd: true,
      step: "dollAnimation2",
    }),

    // --------------------------------
    // other drawing stuff
    // --------------------------------
    whenRotationYChanged: itemEffect({
      run({ newValue: newRotationY, itemRefs }) {
        if (!itemRefs.meshRef) return;
        itemRefs.meshRef.rotation.y = toRadians(newRotationY);
      },
      atStepEnd: true,
      check: { type: "dolls", prop: "rotationY" },
    }),
    //

    // ___________________________________
    // position
    whenPositionChangesToEdit: itemEffect({
      run({ newValue: newPosition, previousValue: prevPosition, itemRefs, itemName: dollName }) {
        if (!itemRefs.meshRef) return;

        if (itemRefs.canGoThroughWalls) {
          // console.log("not checking collisions and setting position", dollName);
          itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
        } else {
          const { editedPosition, positionWasEdited, collidedPosOffset } = setGlobalPositionWithCollisions(
            itemRefs.meshRef,
            newPosition
          );

          // (itemRefs.meshRef as Mesh).position = newMeshPosition;

          // if a collision cauhed the mesh to not reach the position, update the position state
          if (positionWasEdited) {
            const shouldChangeAngle = Math.abs(collidedPosOffset.z) > 0.01 || Math.abs(collidedPosOffset.x) > 0.01;

            let newYRotation = getState().dolls[dollName].rotationYGoal;

            const positionOffset = subtractPointsSafer(prevPosition, editedPosition);
            newYRotation = getVectorAngle({ x: positionOffset.z, y: positionOffset.x });
            // console.log("collidedPosOffset", collidedPosOffset, "positionOffset", positionOffset);

            setState(() => ({
              dolls: {
                [dollName]: {
                  position: editedPosition,
                  rotationYGoal: shouldChangeAngle ? newYRotation : undefined,
                },
              },
            }));
          }
        }

        updateDollScreenPosition({
          dollName: dollName as DollName,
          instant: false,
        });
      },
      check: { type: "dolls", prop: "position" },
      step: "editPosition",
      atStepEnd: true,
    }),
    whenPositionChangesCheckInRange: effect({
      run(_diffInfo) {
        // console.log("a doll moved", _diffInfo);

        // forEach(diffInfo.itemsChanged.dolls)

        const defaultInRange = getDefaultInRangeFunction(dollNames);

        type InRangeProperty = ReturnType<typeof defaultInRange>;

        const newQuickDistancesMap = {} as Partial<Record<DollName, Partial<Record<DollName, number>>>>;
        // {  rabbit : { cricket: 50, rabbit: 1000 }
        //    cricket : { cricket: 1000, rabbit: 50 }}
        let somethingChanged = false;
        const newDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;
        const tempNewDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;

        // forEach(diffInfo.itemsChanged.dolls as DollName[], (dollName) => {
        //   if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
        forEach(dollNames, (dollName) => {
          // if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
          // if position changed

          const dollState = getState().dolls[dollName];
          if (!dollState.isVisible) return; // stop checking more if isVisible is false

          newQuickDistancesMap[dollName] = {}; //
          // newDollsState[dollName] = { inRange: defaultInRange() };
          tempNewDollsState[dollName] = { inRange: defaultInRange() };

          // get quick distances to each other doll
          forEach(dollNames, (otherDollName) => {
            const otherDollState = getState().dolls[otherDollName];
            if (!otherDollState.isVisible) return;

            let quickDistance = 100000000;

            if (dollName === otherDollName) {
              quickDistance = 100000000;
            }
            // if the reverse distance was already found use that
            if (newQuickDistancesMap[otherDollName]?.[dollName] !== undefined) {
              quickDistance = newQuickDistancesMap[otherDollName]![dollName]!;
            } else {
              quickDistance = getQuickDistanceBetweenDolls(dollName, otherDollName);
            }

            newQuickDistancesMap[dollName]![otherDollName] = quickDistance;

            tempNewDollsState[dollName]!.inRange![otherDollName].touch = quickDistance < rangeOptionsQuick.touch;
            tempNewDollsState[dollName]!.inRange![otherDollName].talk = quickDistance < rangeOptionsQuick.talk;
            tempNewDollsState[dollName]!.inRange![otherDollName].see = quickDistance < rangeOptionsQuick.see;
          });
          const currentDollState = getState().dolls[dollName];

          const tempNewDollState = tempNewDollsState[dollName];

          if (tempNewDollState?.inRange) {
            if (
              !inRangesAreTheSame(
                tempNewDollState.inRange,
                currentDollState.inRange as Record<DollName, InRangeForDoll> // FIXME DeepReadonlyObjects
              )
            ) {
              newDollsState[dollName] = tempNewDollState;
              somethingChanged = true;
            }
          }
        });

        if (somethingChanged) {
          setState({ dolls: newDollsState as Record<any, any> });
        }
      },
      check: { type: "dolls", prop: ["position", "isVisible"] },
      atStepEnd: true,
      step: "checkCollisions",
    }),
    whenHidingUpdateInRange: itemEffect({
      run({ newValue: newIsVisible, itemName: dollName }) {
        // return early if it didn't just hide
        if (newIsVisible) return;

        const defaultInRange = getDefaultInRangeFunction(dollNames);

        type InRangeProperty = ReturnType<typeof defaultInRange>;

        const tempNewAllDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;
        const newAllDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;

        // set all inRange to false for the doll that went invisible
        tempNewAllDollsState[dollName] = { inRange: defaultInRange() };

        forEach(dollNames, (otherDollName) => {
          if (otherDollName === dollName) return;

          const otherDollState = getState().dolls[otherDollName];
          tempNewAllDollsState[otherDollName] = { inRange: cloneObjectWithJson(otherDollState.inRange) };

          // set the doll that became invisible to not in range for each other doll
          tempNewAllDollsState[otherDollName]!.inRange![dollName].touch = false;
          tempNewAllDollsState[otherDollName]!.inRange![dollName].talk = false;
          tempNewAllDollsState[otherDollName]!.inRange![dollName].see = false;

          const tempNewDollState = tempNewAllDollsState[otherDollName];
          if (tempNewDollState?.inRange) {
            if (
              !inRangesAreTheSame(
                tempNewDollState.inRange,
                otherDollState.inRange as Record<DollName, InRangeForDoll> // FIXME DeepReadonlyObjects
              )
            ) {
              newAllDollsState[otherDollName] = tempNewDollState;
            }
          }
        });

        // do it on next ticket , because the step that reacts to inRange changing is already done
        onNextTick(() => {
          setState({ dolls: newAllDollsState as Record<any, any> });
        });
      },
      check: { type: "dolls", prop: "isVisible" },
      // atStepEnd: true,
      // step: "positionReaction",
    }),
    // when doll isVisibleChanges, check in range
    // should be a  dynamic rule ?
    updateDollScreenPositionWhenSlateMoves: effect({
      run() {
        const { playerCharacter } = getState().global.main;
        const { dollName } = getState().characters[playerCharacter];
        if (!dollName) return;

        // NOTE TODO ideally add for each character automatically as a dynamic rule?
        forEach(dollNames, (dollName) => updateDollScreenPosition({ dollName: dollName, instant: false }));
      },
      // this happens before rendering because its in "derive" instead of "subscribe"
      check: { type: "global", prop: ["slatePos", "slateZoom"] },
      step: "slatePosition",
      atStepEnd: true,
    }),
    whenToggledMeshesChanges: itemEffect({
      run({ newValue: toggledMeshes, itemName: dollName, itemRefs }) {
        const { otherMeshes } = itemRefs;
        if (!otherMeshes) return;

        const modelName = getModelNameFromDoll(dollName);
        const modelInfo = modelInfoByName[modelName as unknown as ModelName];
        const typedMeshNames = modelInfo.meshNames as unknown as MeshNamesFromDoll<typeof dollName>[];

        forEach(typedMeshNames, (meshName) => {
          const newToggle = toggledMeshes[meshName];
          const theMesh = otherMeshes[meshName];

          if (theMesh && newToggle !== undefined) theMesh.setEnabled(newToggle);
        });
      },
      check: { type: "dolls", prop: "toggledMeshes" },
      step: "default",
      atStepEnd: true,
    }),
    whenIsVisibleChanges: itemEffect({
      run({ newValue: isVisible, itemName: dollName, itemRefs: dollRefs }) {
        if (!dollRefs.meshRef) return console.warn("isVisible change: no mesh ref for", dollName);
        if (dollName === "shoes") {
          console.log("shoes isVisible change", isVisible);
        }
        if (isVisible) {
          dollRefs.meshRef.setEnabled(true);
          // dollRefs.canCollide = true;
        } else {
          dollRefs.meshRef.setEnabled(false); // setEnabled also toggles mesh collisions
          // dollRefs.canCollide = false;
        }
      },
      check: { type: "dolls", prop: "isVisible" },
      step: "default",
      atStepEnd: true,
    }),

    // ------------------------------------
    // Mover rules

    // rotationY
    whenRotationGoalChangedToFix: itemEffect({
      run({ previousValue: oldYRotation, newValue: newYRotation, itemName: dollName }) {
        const yRotationDifference = oldYRotation - newYRotation;

        if (Math.abs(yRotationDifference) > 180) {
          const shortestAngle = getShortestAngle(oldYRotation, newYRotation);
          let editedYRotation = oldYRotation + shortestAngle;
          setState({ dolls: { [dollName]: { rotationYGoal: editedYRotation } } });
        }
      },
      check: { type: "dolls", prop: "rotationYGoal" },
      step: "dollCorrectRotationAndPosition",
      atStepEnd: true,
    }),
    ...addMoverRules("dolls", "position", "3d"),
    ...addMoverRules("dolls", "rotationY"),
    ...addMoverRules("dolls", "animWeights", "multi"),
  }));
}
