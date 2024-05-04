import { Vector3 } from "@babylonjs/core";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import { getRefs, getState, setState } from "repond";
import { addSubEvents, makeEventTypes, toDo } from "repond-events";
import { vector3ToPoint3d } from "../helpers/babylonjs/vectors";
import { get2DAngleBetweenCharacters } from "../helpers/prendyUtils/characters";
import { get2DAngleFromDollToSpot } from "../helpers/prendyUtils/dolls";
import { setGlobalState } from "../helpers/prendyUtils/global";
import { getSpotPosition, getSpotRotation } from "../helpers/prendyUtils/spots";
import { meta } from "../meta";
import { AnimationNameByModel, DollName, DollOptions, MeshNameByModel, PlaceName, SpotNameByPlace } from "../types";

type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];

export const dollEvents = makeEventTypes(({ event }) => ({
  setDollPosition: event({
    run: ({ dollName, newPositon }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[dollName];
      if (!dollRefs.meshRef) return console.warn("NO MESH REF", dollName);

      dollRefs.canGoThroughWalls = true;

      setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
        dollRefs.canGoThroughWalls = false;
        setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } });
      });
    },
    params: {
      dollName: "" as DollName,
      newPositon: new Vector3(),
    },
  }),
  springDollPosition: event({
    run: ({ dollName, newPositon }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      // TODO
    },
    params: {
      dollName: "" as DollName,
      newPositon: new Vector3(),
    },
  }),
  slideDollPosition: event({
    run: ({ dollName, newPositon }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      // TODO
    },
    params: {
      dollName: "" as DollName,
      newPositon: new Vector3(),
    },
  }),
  setDollRotation: event({
    run: ({ dollName, newRotation }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[dollName];
      if (!dollRefs.meshRef) return console.warn("no mesh ref", dollName);

      dollRefs.meshRef.rotationQuaternion = null;
      dollRefs.meshRef.rotation = newRotation;
    },
    params: {
      dollName: "" as DollName,
      newRotation: new Vector3(),
    },
  }),
  lookAtOtherDoll: event({
    run: ({ dollA, dollB }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[dollB];
      const angle = get2DAngleBetweenCharacters(dollB, dollA);
      dollRefs.meshRef.rotation.y = angle;
    },
    params: {
      dollA: "" as DollName,
      dollB: "" as DollName,
    },
  }),
  dollLooksAtSpot: event({
    run: ({ place, spot, doll }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const angle = get2DAngleFromDollToSpot(doll, place, spot);
      addSubEvents;
    },
    params: {
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      doll: "" as DollName,
    },
  }),
  setDollRotationY: event({
    run: ({ dollName, newRotationY }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [dollName]: { rotationY: newRotationY } } });
      // rotationYGoal: newRotationY, // NOTE setting both can make the goal rotate multiple times, it might not be finding the shortest angle
    },
    params: { dollName: "" as DollName, newRotationY: 0 },
  }),
  springDollRotationY: event({
    run: ({ dollName, newRotation }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
    },
    params: { dollName: "" as DollName, newRotation: 0 },
  }),
  springAddToDollRotationY: event({
    run: ({ dollName, addedRotation, useShortestAngle }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState((state) => {
        const currentAngle = state.dolls[dollName].rotationYGoal;

        let newAngle = currentAngle + addedRotation;

        if (useShortestAngle) {
          newAngle = currentAngle + getShortestAngle(currentAngle, newAngle);
        }

        return {
          dolls: { [dollName]: { rotationYGoal: newAngle, rotationYIsMoving: true, rotationYMoveMode: "spring" } },
        };
      });
    },
    params: { dollName: "" as DollName, addedRotation: 0, useShortestAngle: false as boolean | undefined },
  }),
  setDollAnimation: event({
    run: ({ doll, animation }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { nowAnimation: animation } } });
    },
    params: {
      doll: "" as DollName,
      animation: "" as AnimationNameByModel[ModelNameFromDoll<DollName>],
    },
  }),
  focusOnDoll: event({
    run: ({ dollName, zoom }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const { prendyOptions } = meta.assets!;
      setGlobalState({
        focusedDoll: dollName,
        slateZoomGoal:
          zoom !== undefined ? Math.min(zoom, prendyOptions.zoomLevels.max) : prendyOptions.zoomLevels.default,
      });
    },
    params: { dollName: "" as DollName, zoom: 0 },
  }),
  setDollToSpot: event({
    run: ({ place, spot, doll, dontSetRotationState }, { liveId, runMode }) => {
      // TODO check subEvents can be added on start
      if (runMode !== "start") return;
      const newPositon = getSpotPosition(place, spot);
      const newRotation = getSpotRotation(place, spot);

      const dollRefs = getRefs().dolls[doll];
      if (!dollRefs.meshRef) return console.warn("no mesh ref for", doll);

      addSubEvents(liveId, [toDo("doll", "setDollPosition", { dollName: doll, newPositon })]);
      if (!dontSetRotationState) addSubEvents(liveId, [toDo("doll", "setDollRotation", { doll, newRotation })]);
    },
    params: {
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      doll: "" as DollName,
      dontSetRotationState: false as boolean | undefined,
    },
  }),
  springDollToSpot: event({
    run: ({ place, spot, doll }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const newPositon = getSpotPosition(place, spot);
      // const newRotation = getSpotRotation(place, spot);

      // FIXME , adding random so the same spot can be set as goal twice
      const newPositionPoint = vector3ToPoint3d(newPositon);
      newPositionPoint.y += Math.random() * 0.0001;
      setState({ dolls: { [doll]: { positionGoal: newPositionPoint, positionMoveMode: "spring" } } });
      // rotationYGoal: useRotation ? newRotation.y : undefined,
    },
    params: {
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      doll: "" as DollName,
      // useRotation?: boolean;
    },
  }),
  moveDollAt2DAngle: event({
    run: ({ doll, angle, speed }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollState = getState().dolls[doll];
      const dollRefs = getRefs().dolls[doll];
      const { positionIsMoving, positionMoveMode } = dollState;

      if (!positionIsMoving || positionMoveMode !== "push") {
        setState({
          dolls: { [doll]: { positionIsMoving: true, positionMoveMode: "push" } },
        });
      }

      let newVelocity = getVectorFromSpeedAndAngle(speed, angle);
      setState({ dolls: { [doll]: { rotationYGoal: angle + 180 } } });
      dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
      dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
      dollRefs.positionMoverRefs.velocity.y = -1.5;
    },
    params: { doll: "" as DollName, angle: 0, speed: 3 },
  }),
  pushDollRotationY: event({
    run: ({ doll, direction, speed }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollState = getState().dolls[doll];
      const dollRefs = getRefs().dolls[doll];
      const { rotationYIsMoving, rotationYMoveMode } = dollState;

      if (speed === 0) {
        setState({ dolls: { [doll]: { rotationYIsMoving: false } } });
        dollRefs.rotationYMoverRefs.velocity = 0;
      }

      if (!rotationYIsMoving || rotationYMoveMode !== "push") {
        setState({
          dolls: {
            [doll]: { rotationYIsMoving: true, rotationYMoveMode: "push" },
          },
        });
      }

      let newVelocity = direction === "right" ? speed : -speed;
      // setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
      dollRefs.rotationYMoverRefs.velocity = newVelocity;
      // dollRefs.rotationYMoverRefs.velocity.z = newVelocity.x;
      // dollRefs.rotationYMoverRefs.velocity.x = newVelocity.y;
      // dollRefs.rotationYMoverRefs.velocity.y = -1.5;
    },
    params: { doll: "" as DollName, direction: "right" as "right" | "left", speed: 3 },
  }),
  hideDoll: event({
    run: ({ doll, shouldHide }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { isVisible: !shouldHide } } }, () => {});
    },
    params: { doll: "" as DollName, shouldHide: true },
  }),
  toggleDollMeshes: event({
    run: ({ doll, toggledMeshes }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      // IDEA have dollState toggledMeshes and rules to auto enable the meshes

      // const { left_shoe, right_shoe, long_teeth } = otherMeshes;

      // const otherMeshes = getRefs().dolls[dollName].otherMeshes;
      // const modelName = getModelNameFromDoll(dollName);
      // const modelInfo = modelInfoByName[modelName as unknown as ModelName];
      // const typedMeshNames = modelInfo.meshNames as unknown as MeshNamesFromDoll<T_DollName>[];

      // TODO move this into a rule listening to toggledMeshes state
      // forEach(typedMeshNames, (meshName) => {
      //   const newToggle = toggledMeshes[meshName];
      //   const theMesh = otherMeshes[meshName];

      //   if (theMesh && newToggle !== undefined) theMesh.setEnabled(newToggle!);
      // });

      // NOTE could update to set properties in a loop to avoid spreading
      setState((state) => ({
        dolls: { [doll]: { toggledMeshes: { ...(state.dolls[doll].toggledMeshes as any), ...toggledMeshes } } },
      }));
    },
    params: {
      doll: "" as DollName,
      toggledMeshes: {} as Partial<Record<MeshNamesFromDoll<DollName>, boolean>>,
    },
  }),
}));

// TOXO Add CustomEventParams type for
// - dollLooksAtSpot
// - setDollAnimation
// - setDollToSpot
// - toggleDollMeshes
