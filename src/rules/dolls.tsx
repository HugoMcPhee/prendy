import { Mesh, PBRMaterial } from "@babylonjs/core";
import { makeRunMovers } from "pietem-movers";
import { forEach } from "chootils/dist/loops";
import { samePoints as samePoints3d, subtractPointsSafer } from "chootils/dist/points3d";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { getShortestAngle, getVectorAngle } from "chootils/dist/speedAngleDistance2d";
import { AnyAnimationName, PrendyAssets, PrendyOptions, DollName, ModelName } from "../declarations";
import { point3dToVector3, vector3ToSafePoint3d } from "../helpers/babylonjs/babylonjs";
import { get_scenePlaneUtils } from "../helpers/babylonjs/scenePlane";
import { setGlobalPositionWithCollisions } from "../helpers/babylonjs/setGlobalPositionWithCollisions";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../stores/typedStoreHelpers";
import { get_dollUtils, getDefaultInRangeFunction, InRangeForDoll } from "../helpers/prendyUtils/dolls";

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

export function get_dollDynamicRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
  storeHelpers: StoreHelpers,
  prendyStartOptions: PrendyOptions,
  prendyStores: PrendyStores,
  prendyAssets: PrendyAssets
) {
  const { saveModelStuffToDoll, setupLightMaterial } = get_dollUtils(
    storeHelpers,
    prendyStores,
    prendyStartOptions,
    prendyAssets
  );
  const { getRefs, makeDynamicRules } = storeHelpers;

  return makeDynamicRules(({ itemEffect, effect }) => ({
    waitForModelToLoad: itemEffect(({ dollName, modelName }: { dollName: DollName; modelName: ModelName }) => ({
      run() {
        saveModelStuffToDoll({ dollName, modelName });
      },
      name: `doll_waitForModelToLoad${dollName}_${modelName}`,
      check: { type: "models", name: modelName, prop: "isLoaded", becomes: true },
      atStepEnd: true,
    })),
    // When the plaec and all characters are loaded
    whenWholePlaceFinishesLoading: itemEffect(
      ({ dollName, modelName }: { dollName: DollName; modelName: ModelName }) => ({
        run() {
          const dollRefs = getRefs().dolls[dollName];
          const modelRefs = getRefs().models[modelName];

          if (modelRefs.materialRefs) {
            forEach(modelRefs.materialRefs, (materialRef: PBRMaterial) => setupLightMaterial(materialRef));
          }

          setupLightMaterial(modelRefs.materialRef);

          if (dollRefs.meshRef) {
            // dollRefs.meshRef.material = modelRefs.materialRef;
          }

          // forEach(modelNamesLoaded, (modelName) => {
          //   const modelRefs = getRefs().models[modelName];
          //   setupLightMaterial(modelRefs.materialRef);
          // });
          // forEach(dollNames, (dollName) => {
          //   const dollRefs = getRefs().dolls[dollName];
          //   const { modelName } = getState().dolls[dollName];
          //   const modelRefs = getRefs().models[modelName];
          //
          //   dollRefs.materialRef = modelRefs.materialRef;
          // });
          // setupLightMaterial(dollRefs.materialRef);
        },
        name: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
        check: { type: "global", prop: ["isLoadingBetweenPlaces"], becomes: false },
        atStepEnd: true,
      })
    ),
  }));
}

// FIXME
// maybe allow pietem to run 'addedOrRemoved' rules for initialState?

export function startDynamicDollRulesForInitialState<
  StoreHelpers extends PrendyStoreHelpers,
  DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>
>(storeHelpers: StoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]) {
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
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
  prendyStartOptions: PrendyOptions,
  dollDynamicRules: DollDynamicRules,
  storeHelpers: StoreHelpers,
  prendyStores: PrendyStores,
  prendyAssets: PrendyAssets
) {
  const { modelInfoByName, dollNames } = prendyAssets;
  const { getQuickDistanceBetweenDolls, inRangesAreTheSame, setDollAnimWeight, updateDollScreenPosition } =
    get_dollUtils(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
  const { focusScenePlaneOnFocusedDoll } = get_scenePlaneUtils(storeHelpers, prendyStartOptions);
  const { makeRules, getPreviousState, getState, setState, getRefs } = storeHelpers;
  const { runMover, runMover3d, runMoverMulti } = makeRunMovers(storeHelpers);

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
    whenAnimWeightsGoalChanged: itemEffect({
      run({ itemName: dollName }) {
        setState({ dolls: { [dollName]: { animWeightsIsMoving: true } } });
      },
      check: { type: "dolls", prop: "animWeightsGoal" },
      step: "dollAnimation2",
      atStepEnd: true,
    }),
    whenAnimationWeightsStartedMoving: itemEffect({
      run({ itemName: dollName }) {
        runMoverMulti({ name: dollName, type: "dolls", mover: "animWeights" });
      },
      check: { type: "dolls", prop: "animWeightsIsMoving", becomes: true },
      step: "dollAnimationStartMovers",
      atStepEnd: true,
    }),
    whenAnimWeightsChanged: itemEffect({
      run({ newValue: animWeights, itemState, itemRefs }) {
        const { modelName } = itemState;
        const animationNames = modelInfoByName[modelName].animationNames as AnyAnimationName[];

        if (!itemRefs.aniGroupsRef) return;
        forEach(animationNames, (aniName) => {
          if (!itemRefs.aniGroupsRef) return;
          const aniRef = itemRefs.aniGroupsRef[aniName];
          // const { timerSpeed } = getRefs().global.main;
          // if (aniRef._speedRatio !== timerSpeed) {
          //   aniRef._speedRatio = timerSpeed;
          // }
          if (!aniRef) {
            console.warn("tried to use undefined animation", aniName);
          }
          if (aniRef && aniRef?.speedRatio !== prendyStartOptions.animationSpeed) {
            aniRef.speedRatio = prendyStartOptions.animationSpeed;
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

    whenRotationGoalChanged: itemEffect({
      run({ previousValue: oldYRotation, newValue: newYRotation, itemName: dollName }) {
        const yRotationDifference = oldYRotation - newYRotation;

        if (Math.abs(yRotationDifference) > 180) {
          const shortestAngle = getShortestAngle(oldYRotation, newYRotation);
          let editedYRotation = oldYRotation + shortestAngle;

          setState({
            dolls: { [dollName]: { rotationYGoal: editedYRotation, rotationYIsMoving: true } },
          });
        } else {
          setState({ dolls: { [dollName]: { rotationYIsMoving: true } } });
        }
      },
      check: { type: "dolls", prop: "rotationYGoal" },
    }),

    whenPositionGoalChanged: itemEffect({
      run({ itemName: dollName, itemRefs: dollRefs, itemState: dollState }) {
        setState({ dolls: { [dollName]: { positionIsMoving: true } } });
        const { positionMoveMode: moveMode } = dollState;
        // TEMPORARY : ideally this is automatic for movers?
        if (moveMode === "spring") dollRefs.positionMoverRefs.recentSpeeds = [];
      },
      atStepEnd: true,
      step: "dollAnimation2",
      check: { type: "dolls", prop: "positionGoal" },
    }),

    whenStartedMoving: itemEffect({
      run({ itemName: dollName }) {
        runMover3d({ name: dollName, type: "dolls", mover: "position" });
      },
      check: { type: "dolls", prop: "positionIsMoving", becomes: true },
      step: "dollAnimationStartMovers",
      atStepEnd: true,
    }),
    whenStartedRotating: itemEffect({
      run({ itemName: dollName }) {
        runMover({ name: dollName, type: "dolls", mover: "rotationY" });
      },
      check: { type: "dolls", prop: "rotationYIsMoving", becomes: true },
      atStepEnd: true,
    }),

    // ___________________________________
    // position
    whenPositionChangesToEdit: itemEffect({
      run({ newValue: newPosition, previousValue: prevPosition, itemRefs, itemName: dollName }) {
        if (!itemRefs.meshRef) return;

        // if (samePoints3d(newPosition, prevPosition)) console.log("was same");
        // console.log("whenPositionChangesToEdit");

        // if (dollName === "key") {
        //   console.log("sdkfksfdlfsdkkfsdlkfsd");
        //
        //   console.log("itemRefs.checkCollisions", itemRefs.checkCollisions);
        //   if (!itemRefs.checkCollisions) {
        //     itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
        //   }
        // }

        if (itemRefs.checkCollisions) {
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
        } else {
          // if (dollName === "key") {
          //   console.log("sdkfksfdlfsdkkfsdlkfsd");
          //
          //   console.log("itemRefs.checkCollisions", itemRefs.checkCollisions);
          // if (!itemRefs.checkCollisions) {
          console.log("not checking collisions and setting position");

          itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
          // }
          // }
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
        const newDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;
        const tempNewDollsState = {} as Partial<Record<DollName, Partial<{ inRange: InRangeProperty }>>>;

        // forEach(diffInfo.itemsChanged.dolls as DollName[], (dollName) => {
        //   if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
        forEach(dollNames, (dollName) => {
          // if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
          // if position changed

          const dollRef = getRefs().dolls[dollName];
          if (!dollRef.checkCollisions) return; // stop checking more if checkCollisions is false

          newQuickDistancesMap[dollName] = {}; //
          // newDollsState[dollName] = { inRange: defaultInRange() };
          tempNewDollsState[dollName] = { inRange: defaultInRange() };

          // get quick distances to each other doll
          forEach(dollNames, (otherDollName) => {
            const otherDollRef = getRefs().dolls[otherDollName];
            if (!otherDollRef.checkCollisions) return;

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

            // FIXME type?
            (newQuickDistancesMap as any)[dollName]![otherDollName] = quickDistance;

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
            }
          }
        });

        setState({ dolls: newDollsState as Record<any, any> });
      },
      check: { type: "dolls", prop: ["position"] },
      atStepEnd: true,
      step: "checkCollisions",
    }),
    // should be a  dynamic rule ?
    whenCameraChangesForPlanePosition: effect({
      // in a different flow to "cameraChange"
      run() {
        focusScenePlaneOnFocusedDoll("instant");
      },
      check: { type: "places", prop: ["nowCamName"] },
      step: "planePosition",
    }),
    updateDollScreenPositionWhenScenePlaneMoves: effect({
      run() {
        const { playerCharacter } = getState().global.main;
        const { dollName } = getState().characters[playerCharacter];
        if (!dollName) return;

        // NOTE TODO ideally add for each character autamotically as a dynamic rule?
        forEach(dollNames, (dollName) => updateDollScreenPosition({ dollName: dollName, instant: false }));
      },
      // this happens before rendering because its in "derive" instead of "subscribe"
      check: { type: "global", prop: ["planePos", "planeZoom"] },
      step: "planePosition",
    }),
  }));
}
