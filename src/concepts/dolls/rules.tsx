import { forEach } from "shutils/dist/loops";
import { toRadians } from "shutils/dist/speedAngleDistance";
import { getShortestAngle } from "shutils/dist/speedAngleDistance2d";
import { point3dToVector3, vector3ToSafePoint3d } from "../../utils/babylonjs";
//
import { setGlobalPositionWithCollisions } from "../../utils/babylonjs/setGlobalPositionWithCollisions";
import { getDefaultInRangeFunction, InRangeForDoll } from "./indexUtils";
import { rangeOptionsQuick, makeDollStoreUtils } from "./utils";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderBackdopConcepts,
} from "../typedConcepFuncs";
import { makeScenePlaneUtils } from "../../utils/babylonjs/scenePlane";
import { makeRunMovers } from "concep-movers";
import { PBRMaterial } from "@babylonjs/core";

// const dollDynamicRules = makeDynamicRules({
//   whenModelLoadsForDoll
// });

// when the models isLoading becomes true

export function makeDollDynamicRules<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  StartState_Dolls extends BackdopConcepts["dolls"]["startStates"] &
    ReturnType<ConcepFuncs["getState"]>["dolls"],
  DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] &
    string,
  ModelName extends string,
  AnyAnimationName extends string,
  AnimationNameByModel extends Record<ModelName, AnyAnimationName>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>
>(
  concepFuncs: ConcepFuncs,
  backdopStartOptions: BackdopOptions,
  backdopConcepts: BackdopConcepts,
  modelInfoByName: ModelInfoByName,
  dollNames: readonly DollName[]
) {
  const { saveModelStuffToDoll, setupLightMaterial } = makeDollStoreUtils<
    ConcepFuncs,
    BackdopOptions,
    BackdopConcepts,
    AnimationNameByModel,
    StartState_Dolls,
    DollName,
    ModelName,
    ModelInfoByName
  >(
    concepFuncs,
    backdopStartOptions,
    backdopConcepts,
    dollNames,
    modelInfoByName
  );
  const {
    getPreviousState,
    getRefs,
    getState,
    makeDynamicRules,
    makeRules,
    setState,
  } = concepFuncs;

  return makeDynamicRules((addItemEffect, _addEffect) => ({
    waitForModelToLoad: addItemEffect(
      ({
        dollName,
        modelName,
      }: {
        dollName: DollName;
        modelName: ModelName;
      }) => ({
        onItemEffect() {
          saveModelStuffToDoll({ dollName, modelName });
        },
        name: `doll_waitForModelToLoad${dollName}_${modelName}`,
        check: {
          type: "models",
          name: modelName,
          prop: "isLoaded",
          becomes: "true",
        },
        whenToRun: "subscribe",
      })
    ),
    // When the plaec and all characters are loaded
    whenWholePlaceFinishesLoading: addItemEffect(
      ({
        dollName,
        modelName,
      }: {
        dollName: DollName;
        modelName: ModelName;
      }) => ({
        onItemEffect() {
          const dollRefs = getRefs().dolls[dollName];
          const modelRefs = getRefs().models[modelName];

          if (modelRefs.materialRefs) {
            forEach(modelRefs.materialRefs, (materialRef: PBRMaterial) =>
              setupLightMaterial(materialRef)
            );
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
        check: {
          type: "global",
          prop: ["isLoadingBetweenPlaces"],
          becomes: "false",
        },
        whenToRun: "subscribe",
      })
    ),
  }));
}

// FIXME
// maybe allow concepto to run 'addedOrRemoved' rules for initialState?

export function startDynamicDollRulesForInitialState<
  ConcepFuncs extends BackdopConcepFuncs,
  DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>,
  DollName extends string
>(
  concepFuncs: ConcepFuncs,
  dollDynamicRules: DollDynamicRules,
  dollNames: readonly DollName[]
) {
  const { getState } = concepFuncs;

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

export function makeDollRules<
  BackdopOptions extends BackdopOptionsUntyped,
  DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>,
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  StartState_Dolls extends BackdopConcepts["dolls"]["startStates"] &
    ReturnType<ConcepFuncs["getState"]>["dolls"],
  DollName extends keyof StartState_Dolls & string,
  ModelName extends string,
  AnyAnimationName extends string,
  AnimationNameByModel extends Record<ModelName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<string>
  // DollName extends keyof ReturnType<ConcepFuncs["getRefs"]>["dolls"] & string,
>(
  backdopStartOptions: BackdopOptions,
  dollDynamicRules: DollDynamicRules,
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  modelInfoByName: ModelInfoByName,
  dollNames: readonly DollName[]
) {
  const {
    getQuickDistanceBetweenDolls,
    inRangesAreTheSame,
    setDollAnimWeight,
    updateDollScreenPosition,
  } = makeDollStoreUtils<
    ConcepFuncs,
    BackdopOptions,
    BackdopConcepts,
    AnimationNameByModel,
    StartState_Dolls,
    DollName,
    ModelName,
    ModelInfoByName
  >(
    concepFuncs,
    backdopStartOptions,
    backdopConcepts,
    dollNames,
    modelInfoByName
  );

  const { focusScenePlaneOnFocusedDoll } = makeScenePlaneUtils(
    concepFuncs,
    backdopStartOptions
  );

  const {
    makeRules,
    getPreviousState,
    getState,
    setState,
    getRefs,
  } = concepFuncs;

  const { runMover, runMover3d, runMoverMulti } = makeRunMovers(concepFuncs);

  return makeRules((addItemEffect, addEffect) => ({
    // --------------------------------
    // loading model stuff
    // --------------------------------
    whenModelNameChanges: addItemEffect({
      onItemEffect({
        itemName: dollName,
        newValue: newModelName,
        previousValue: prevModelName,
      }) {
        // stop the previous dynamic rule, and start the new one
        dollDynamicRules.stopAll({ dollName, modelName: prevModelName });
        dollDynamicRules.startAll({ dollName, modelName: newModelName });
      },
      check: { type: "dolls", prop: "modelName" },
    }),
    whenDollAddedOrRemoved: addEffect({
      onEffect(diffInfo) {
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
    whenNowAnimationChanged: addItemEffect({
      onItemEffect({ newValue: nowAnimation, itemState, itemName: dollName }) {
        const { modelName } = itemState;
        const { animationNames } = modelInfoByName[modelName];

        type T_ModelName = typeof modelName;

        // let newWeights = {} as Record<
        //   AnimationNameByModel[T_ModelName],
        //   number
        // >;
        let newWeights = {} as Record<string, number>;
        forEach(animationNames, (aniName) => {
          newWeights[aniName] = nowAnimation === aniName ? 1 : 0;
        });
        setDollAnimWeight(dollName as DollName, newWeights);
      },
      check: { type: "dolls", prop: "nowAnimation" },
      flow: "dollAnimation",
      whenToRun: "subscribe",
    }),
    whenAnimWeightsGoalChanged: addItemEffect({
      onItemEffect({ itemName: dollName }) {
        setState({
          dolls: { [dollName]: { animWeightsIsMoving: true } },
        });
      },
      check: { type: "dolls", prop: "animWeightsGoal" },
      flow: "dollAnimation2",
      whenToRun: "subscribe",
    }),
    whenAnimationWeightsStartedMoving: addItemEffect({
      onItemEffect({ itemName: dollName }) {
        runMoverMulti({
          name: dollName,
          type: "dolls",
          mover: "animWeights",
        });
      },
      check: { type: "dolls", prop: "animWeightsIsMoving", becomes: "true" },
      flow: "dollAnimationStartMovers",
      whenToRun: "subscribe",
    }),
    whenAnimWeightsChanged: addItemEffect({
      onItemEffect({ newValue: animWeights, itemState, itemRefs }) {
        const { modelName } = itemState;
        const { animationNames } = modelInfoByName[modelName];

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
          if (
            aniRef &&
            aniRef?.speedRatio !== backdopStartOptions.animationSpeed
          ) {
            aniRef.speedRatio = backdopStartOptions.animationSpeed;
          }

          const animWeight = animWeights[aniName];
          const animIsStopped = animWeight < 0.003;

          // stops playing if the weight is 0ish

          if (animIsStopped) {
            if (aniRef?.isPlaying) {
              aniRef.stop();
            }
          } else {
            if (!aniRef?.isPlaying) {
              aniRef.start(itemState.animationLoops);
            }
          }

          aniRef?.setWeightForAllAnimatables(animWeights[aniName]);
        });
      },
      check: { type: "dolls", prop: "animWeights" },
      whenToRun: "subscribe",
      flow: "dollAnimation2",
    }),
    // --------------------------------
    // other drawing stuff
    // --------------------------------
    whenRotationYChanged: addItemEffect({
      onItemEffect({ newValue: newRotationY, itemRefs }) {
        if (!itemRefs.meshRef) return;
        itemRefs.meshRef.rotation.y = toRadians(newRotationY);
      },
      whenToRun: "subscribe",
      check: { type: "dolls", prop: "rotationY" },
    }),
    //

    whenRotationGoalChanged: addItemEffect({
      onItemEffect({
        previousValue: oldYRotation,
        newValue: newYRotation,
        itemName: dollName,
      }) {
        const yRotationDifference = oldYRotation - newYRotation;

        if (Math.abs(yRotationDifference) > 180) {
          const shortestAngle = getShortestAngle(oldYRotation, newYRotation);
          let editedYRotation = oldYRotation + shortestAngle;

          setState({
            dolls: {
              [dollName]: {
                rotationYGoal: editedYRotation,
                rotationYIsMoving: true,
              },
            },
          });
        } else {
          setState({
            dolls: { [dollName]: { rotationYIsMoving: true } },
          });
        }
      },
      check: { type: "dolls", prop: "rotationYGoal" },
    }),

    whenPositionGoalChanged: addItemEffect({
      onItemEffect({
        itemName: dollName,
        itemRefs: dollRefs,
        itemState: dollState,
      }) {
        setState({ dolls: { [dollName]: { positionIsMoving: true } } });
        const { positionMoveMode: moveMode } = dollState;
        // TEMPORARY : ideally this is automatic for movers?
        if (moveMode === "spring") dollRefs.positionMoverRefs.recentSpeeds = [];
      },
      whenToRun: "subscribe",
      flow: "dollAnimation2",
      check: { type: "dolls", prop: "positionGoal" },
    }),

    whenStartedMoving: addItemEffect({
      onItemEffect({ itemName: dollName }) {
        runMover3d({ name: dollName, type: "dolls", mover: "position" });
      },
      check: { type: "dolls", prop: "positionIsMoving", becomes: "true" },
      flow: "dollAnimationStartMovers",
      whenToRun: "subscribe",
    }),
    whenStartedRotating: addItemEffect({
      onItemEffect({ itemName: dollName }) {
        runMover({
          name: dollName,
          type: "dolls",
          mover: "rotationY",
        });
      },
      check: { type: "dolls", prop: "rotationYIsMoving", becomes: "true" },
      whenToRun: "subscribe",
    }),

    // ___________________________________
    // position
    whenPositionChangesToEdit: addItemEffect({
      onItemEffect({ newValue: newPosition, itemRefs, itemName: dollName }) {
        if (!itemRefs.meshRef) return;

        // if (dollName === "key") {
        //   console.log("sdkfksfdlfsdkkfsdlkfsd");
        //
        //   console.log("itemRefs.checkCollisions", itemRefs.checkCollisions);
        //   if (!itemRefs.checkCollisions) {
        //     itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
        //   }
        // }

        if (itemRefs.checkCollisions) {
          const newMeshPosition = point3dToVector3(newPosition);
          const {
            editedPosition,
            positionWasEdited,
          } = setGlobalPositionWithCollisions(
            itemRefs.meshRef,
            newMeshPosition
          );

          // if a collision cauhed the mesh to not reach the position, update the position state
          if (positionWasEdited) {
            setState(() => ({
              dolls: {
                [dollName]: {
                  position: vector3ToSafePoint3d(editedPosition),
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
      flow: "editPosition",
      whenToRun: "subscribe",
    }),
    whenPositionChangesCheckInRange: addEffect({
      onEffect(_diffInfo) {
        // forEach(diffInfo.itemsChanged.dolls)

        const defaultInRange = getDefaultInRangeFunction(dollNames);

        type InRangeProperty = ReturnType<typeof defaultInRange>;

        const newQuickDistancesMap = {} as Partial<
          Record<DollName, Partial<Record<DollName, number>>>
        >;
        // {  rabbit : { cricket: 50, rabbit: 1000 }
        //    cricket : { cricket: 1000, rabbit: 50 }}
        const newDollsState = {} as Partial<
          Record<DollName, Partial<{ inRange: InRangeProperty }>>
        >;
        const tempNewDollsState = {} as Partial<
          Record<DollName, Partial<{ inRange: InRangeProperty }>>
        >;

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
              quickDistance = getQuickDistanceBetweenDolls(
                dollName,
                otherDollName
              );
            }

            // FIXME type?
            (newQuickDistancesMap as any)[dollName]![
              otherDollName
            ] = quickDistance;

            tempNewDollsState[dollName]!.inRange![otherDollName].touch =
              quickDistance < rangeOptionsQuick.touch;
            tempNewDollsState[dollName]!.inRange![otherDollName].talk =
              quickDistance < rangeOptionsQuick.talk;
            tempNewDollsState[dollName]!.inRange![otherDollName].see =
              quickDistance < rangeOptionsQuick.see;
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

        setState({ dolls: newDollsState });
      },
      check: { type: "dolls", prop: ["position"] },
      whenToRun: "subscribe",
      flow: "checkCollisions",
    }),
    // should be a  dynamic rule ?
    whenCameraChangesForPlanePosition: addEffect({
      // in a different flow to "cameraChange"
      onEffect() {
        focusScenePlaneOnFocusedDoll("instant");
      },
      check: { type: "places", prop: ["nowCamName"] },
      flow: "planePosition",
    }),
    updateDollScreenPositionWhenScenePlaneMoves: addEffect({
      onEffect() {
        const { playerCharacter } = getState().global.main;
        const { dollName } = getState().characters[playerCharacter];
        if (!dollName) return;

        // NOTE TODO ideally add for each character autamotically as a dynamic rule?
        forEach(dollNames, (dollName) =>
          updateDollScreenPosition({ dollName: dollName, instant: false })
        );
      },
      // this happens before rendering because its in "derive" instead of "subscribe"
      check: { type: "global", prop: ["planePos", "planeZoom"] },
      flow: "planePosition",
    }),
  }));
}
