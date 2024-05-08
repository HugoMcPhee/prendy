import { Vector3 } from "@babylonjs/core";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import { getRefs, getState, setState } from "repond";
import { II, addSubEvents, makeEventTypes } from "repond-events";
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
  setPosition: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[doll];
      if (!dollRefs.meshRef) return console.warn("NO MESH REF", doll);

      dollRefs.canGoThroughWalls = true;

      setState({ dolls: { [doll]: { position: vector3ToPoint3d(to) } } }, () => {
        dollRefs.canGoThroughWalls = false;
        setState({ dolls: { [doll]: { position: vector3ToPoint3d(to) } } });
      });
    },
    params: { which: "" as DollName, to: new Vector3() },
  }),
  springPosition: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      // TODO
    },
    params: { which: "" as DollName, to: new Vector3() },
  }),
  slidePosition: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      // TODO
    },
    params: { which: "" as DollName, to: new Vector3() },
  }),
  setRotation: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[doll];
      if (!dollRefs.meshRef) return console.warn("no mesh ref", doll);

      dollRefs.meshRef.rotationQuaternion = null;
      dollRefs.meshRef.rotation = to;
    },
    params: { which: "" as DollName, to: new Vector3() },
  }),
  lookAtOtherDoll: event({
    run: ({ whichA: dollA, whichB: dollB }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const dollRefs = getRefs().dolls[dollB];
      const angle = get2DAngleBetweenCharacters(dollB, dollA);
      dollRefs.meshRef.rotation.y = angle;
    },
    params: { whichA: "" as DollName, whichB: "" as DollName },
  }),
  lookAtSpot: event({
    run: async ({ place, spot, which: doll }, { runMode }) => {
      if (runMode !== "start") return;
      const angle = get2DAngleFromDollToSpot(doll, place, spot);
      setState({ dolls: { [doll]: { rotationYGoal: angle } } });
    },
    params: {
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      which: "" as DollName,
    },
  }),
  setRotationY: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { rotationY: to } } });
      // rotationYGoal: newRotationY, // NOTE setting both can make the goal rotate multiple times, it might not be finding the shortest angle
    },
    params: { which: "" as DollName, to: 0 },
  }),
  springRotationY: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { rotationYGoal: to } } });
    },
    params: { which: "" as DollName, to: 0 },
  }),
  springAddToRotationY: event({
    run: ({ which: doll, degrees: addedRotation, useShortestAngle }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState((state) => {
        const currentAngle = state.dolls[doll].rotationYGoal;

        let newAngle = currentAngle + addedRotation;

        if (useShortestAngle) {
          newAngle = currentAngle + getShortestAngle(currentAngle, newAngle);
        }

        return {
          dolls: { [doll]: { rotationYGoal: newAngle, rotationYIsMoving: true, rotationYMoveMode: "spring" } },
        };
      });
    },
    params: { which: "" as DollName, degrees: 0, useShortestAngle: false as boolean | undefined },
  }),
  setAnimation: event({
    run: ({ which: doll, to }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { nowAnimation: to } } });
    },
    params: { which: "" as DollName, to: "" as AnimationNameByModel[ModelNameFromDoll<DollName>] },
  }),
  focusOn: event({
    run: ({ which: doll, zoom }, { liveId, runMode }) => {
      if (runMode !== "start") return;
      const { prendyOptions } = meta.assets!;
      setGlobalState({
        focusedDoll: doll,
        slateZoomGoal:
          zoom !== undefined ? Math.min(zoom, prendyOptions.zoomLevels.max) : prendyOptions.zoomLevels.default,
      });
    },
    params: { which: "" as DollName, zoom: undefined as number | undefined },
  }),
  setToSpot: event({
    run: ({ place, spot, which, dontSetRotationState }, { liveId, runMode }) => {
      // TODO check subEvents can be added on start
      if (runMode !== "start") return;
      const newPositon = getSpotPosition(place, spot);
      const newRotation = getSpotRotation(place, spot);

      const dollRefs = getRefs().dolls[which];
      if (!dollRefs.meshRef) return console.warn("no mesh ref for", which);

      addSubEvents(liveId, [II("doll", "setPosition", { which, to: newPositon })]);
      if (!dontSetRotationState) addSubEvents(liveId, [II("doll", "setRotation", { which, to: newRotation })]);
    },
    params: {
      which: "" as DollName,
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      dontSetRotationState: false as boolean | undefined,
    },
  }),
  springToSpot: event({
    run: ({ place, spot, which: doll }, { runMode }) => {
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
      which: "" as DollName,
      // useRotation?: boolean;
    },
  }),
  moveAt2DAngle: event({
    run: ({ which: doll, angle, speed }, { runMode }) => {
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
    params: { which: "" as DollName, angle: 0, speed: 3 },
  }),
  pushRotationY: event({
    run: ({ which: doll, direction, speed }, { runMode }) => {
      if (runMode !== "start") return;
      const dollState = getState().dolls[doll];
      const dollRefs = getRefs().dolls[doll];
      const { rotationYIsMoving, rotationYMoveMode } = dollState;

      if (speed === 0) {
        setState({ dolls: { [doll]: { rotationYIsMoving: false } } });
        dollRefs.rotationYMoverRefs.velocity = 0;
      }

      if (!rotationYIsMoving || rotationYMoveMode !== "push") {
        setState({ dolls: { [doll]: { rotationYIsMoving: true, rotationYMoveMode: "push" } } });
      }

      let newVelocity = direction === "right" ? speed : -speed;
      // setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
      dollRefs.rotationYMoverRefs.velocity = newVelocity;
      // dollRefs.rotationYMoverRefs.velocity.z = newVelocity.x;
      // dollRefs.rotationYMoverRefs.velocity.x = newVelocity.y;
      // dollRefs.rotationYMoverRefs.velocity.y = -1.5;
    },
    params: { which: "" as DollName, direction: "right" as "right" | "left", speed: 3 },
  }),
  hide: event({
    run: ({ which: doll, shouldHide = true }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ dolls: { [doll]: { isVisible: !shouldHide } } }, () => {});
    },
    params: { which: "" as DollName, shouldHide: undefined as boolean | undefined },
  }),
  toggleMeshes: event({
    run: ({ which, toggledMeshes }, { runMode }) => {
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
        dolls: { [which]: { toggledMeshes: { ...(state.dolls[which].toggledMeshes as any), ...toggledMeshes } } },
      }));
    },
    params: {
      which: "" as DollName,
      toggledMeshes: {} as Partial<Record<MeshNamesFromDoll<DollName>, boolean>>,
    },
  }),
}));

// Special types

type DollLookAtSpotParams<T_Place extends PlaceName> = {
  which: DollName;
  place: T_Place;
  to: SpotNameByPlace[T_Place];
};

type DollSetAnimationParams<T_Doll extends DollName> = {
  which: DollName;
  to: AnimationNameByModel[ModelNameFromDoll<T_Doll>];
};

type DollSetToSpotParams<T_Place extends PlaceName> = {
  which: DollName;
  place: T_Place;
  spot: SpotNameByPlace[T_Place];
  dontSetRotationState?: boolean;
};

type DollSpringToSpotParams<T_Place extends PlaceName> = {
  which: DollName;
  place: T_Place;
  spot: SpotNameByPlace[T_Place];
};

type ToggleMeshesParams<T_Doll extends DollName> = {
  which: T_Doll;
  toggledMeshes: Partial<Record<MeshNamesFromDoll<T_Doll>, boolean>>;
};

export type DollEventParameters<T_Group, T_Event, T_GenericParamA> = T_Group extends "doll"
  ? T_Event extends "lookAtSpot"
    ? DollLookAtSpotParams<T_GenericParamA & PlaceName>
    : T_Event extends "setAnimation"
    ? DollSetAnimationParams<T_GenericParamA & DollName>
    : T_Event extends "setToSpot"
    ? DollSetToSpotParams<T_GenericParamA & PlaceName>
    : T_Event extends "springToSpot"
    ? DollSpringToSpotParams<T_GenericParamA & PlaceName>
    : T_Event extends "toggleMeshes"
    ? ToggleMeshesParams<T_GenericParamA & DollName>
    : never
  : never;
