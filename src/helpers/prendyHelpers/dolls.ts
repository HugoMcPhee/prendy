import { Space, Vector3 } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import {
  AnimationNameByModel,
  BoneNameByModel,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MeshNameByModel,
  ModelInfoByName,
  ModelName,
  PlaceName,
  PrendyOptions,
  PrendyStoreHelpers,
  SpotNameByPlace,
} from "../../declarations";
import { get_dollStoryUtils } from "../../helpers/prendyUtils/dolls";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_spotStoryUtils } from "../../helpers/prendyUtils/spots";
import { vector3ToPoint3d } from "../babylonjs/vectors";

export function get_dollStoryHelpers(
  storeHelpers: PrendyStoreHelpers,
  // prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  modelInfoByName: ModelInfoByName
) {
  const { getRefs, getState, setState } = storeHelpers;

  type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];

  type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

  type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<
    DollNameFromCharacter<T_CharacterName>
  >;

  type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
    AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

  type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];

  const { setGlobalState } = get_globalUtils(storeHelpers);

  const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);

  const { getSpotPosition, getSpotRotation } = get_spotStoryUtils(storeHelpers);

  // --------------------------------------------------------------

  function setDollPosition(dollName: DollName, newPositon: Vector3) {
    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("NO MESH REF", dollName);

    const prevCollisionsEnabled = dollRefs.checkCollisions;
    dollRefs.checkCollisions = false;

    setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
      // dollRefs.checkCollisions = prevCollisionsEnabled;
      dollRefs.checkCollisions = true;
    });
  }

  function springDollPosition(dollName: DollName, newPositon: Vector3) {}

  function slideDollPosition(dollName: DollName, newPositon: Vector3) {}

  function setDollRotation(dollName: DollName, newRotation: Vector3) {
    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("no mesh ref", dollName);

    dollRefs.meshRef.rotationQuaternion = null;
    dollRefs.meshRef.rotation = newRotation; // the spot rotation can be on all x,y and z
    // setDollRotationY(dollName, newRotation.y); // currently this will replace the meshes  xz rotations TODO have doll 3d rotation state
  }

  function lookAtOtherDoll(
    dollA: DollName,
    dollB: DollName // defaults to playerChaarcter
  ) {
    // NOTE could be async

    const angle = get2DAngleBetweenDolls(dollB, dollA);
    springDollRotationY(dollB, angle);
  }

  function dollLooksAtSpot<T_PlaceName extends PlaceName>({
    place,
    spot,
    doll,
  }: {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
  }) {
    const angle = get2DAngleFromDollToSpot(doll, place, spot);
    springDollRotationY(doll, angle);
  }

  function setDollRotationY(dollName: DollName, newRotationY: number) {
    setState({
      dolls: {
        [dollName]: {
          rotationY: newRotationY,
          // rotationYGoal: newRotationY,
        },
      },
    });
  }

  function springDollRotationY(dollName: DollName, newRotation: number) {
    setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
  }

  function springAddToDollRotationY(dollName: DollName, addedRotation: number, useShortestAngle: boolean = false) {
    setState((state) => {
      const currentAngle = state.dolls[dollName].rotationYGoal;

      let newAngle = currentAngle + addedRotation;

      if (useShortestAngle) {
        newAngle = currentAngle + getShortestAngle(currentAngle, newAngle);
      }

      return {
        dolls: {
          [dollName]: {
            rotationYGoal: newAngle,
            rotationYIsMoving: true,
            rotationYMoveMode: "spring",
          },
        },
      };
    });
  }

  function setDollAnimation<T_Doll extends DollName>(
    doll: T_Doll,
    animation: AnimationNameByModel[ModelNameFromDoll<T_Doll>]
  ) {
    setState({ dolls: { [doll]: { nowAnimation: animation } } });
  }

  function focusOnDoll<T_Doll extends DollName>(dollName: T_Doll, zoom?: number) {
    setGlobalState({
      focusedDoll: dollName,
      slateZoomGoal:
        zoom !== undefined ? Math.min(zoom, prendyStartOptions.zoomLevels.max) : prendyStartOptions.zoomLevels.default,
    });
  }

  function setDollToSpot<T_PlaceName extends PlaceName>({
    place,
    spot,
    doll: dollName,
    dontSetRotationState,
  }: {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
    dontSetRotationState?: boolean;
  }) {
    const newPositon = getSpotPosition(place, spot);
    const newRotation = getSpotRotation(place, spot);

    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("no mesh ref for", dollName);

    setDollPosition(dollName, newPositon);
    if (!dontSetRotationState) setDollRotation(dollName, newRotation);
  }

  // NOTE this isn't really working atm, maybe because falling sortof sets positionMoveMode to "push" ?
  // it was the movement speed being slow so stopping the mover from keeping going
  function springDollToSpot<T_PlaceName extends PlaceName>({
    place,
    spot,
    doll: dollName,
  }: // useRotation = true,
  {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
    // useRotation?: boolean;
  }) {
    const newPositon = getSpotPosition(place, spot);
    // const newRotation = getSpotRotation(place, spot);

    // FIXME , adding random so the same spot can be set as goal twice
    const newPositionPoint = vector3ToPoint3d(newPositon);
    newPositionPoint.y += Math.random() * 0.0001;
    setState({
      dolls: {
        [dollName]: {
          positionGoal: newPositionPoint,
          positionMoveMode: "spring",
          // rotationYGoal: useRotation ? newRotation.y : undefined,
        },
      },
    });
  }

  function moveDollAt2DAngle(dollName: DollName, angle: number, speed: number = 3) {
    const dollState = getState().dolls[dollName];
    const dollRefs = getRefs().dolls[dollName];
    const { positionIsMoving, positionMoveMode } = dollState;

    if (!positionIsMoving || positionMoveMode !== "push") {
      setState({
        dolls: { [dollName]: { positionIsMoving: true, positionMoveMode: "push" } },
      });
    }

    let newVelocity = getVectorFromSpeedAndAngle(speed, angle);
    setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
    dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
    dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
    dollRefs.positionMoverRefs.velocity.y = -1.5;
  }

  function pushDollRotationY(dollName: DollName, direction: "right" | "left", speed: number = 3) {
    const dollState = getState().dolls[dollName];
    const dollRefs = getRefs().dolls[dollName];
    const { rotationYIsMoving, rotationYMoveMode } = dollState;

    if (speed === 0) {
      setState({ dolls: { [dollName]: { rotationYIsMoving: false } } });
      dollRefs.rotationYMoverRefs.velocity = 0;
    }

    if (!rotationYIsMoving || rotationYMoveMode !== "push") {
      setState({
        dolls: {
          [dollName]: { rotationYIsMoving: true, rotationYMoveMode: "push" },
        },
      });
    }

    let newVelocity = direction === "right" ? speed : -speed;
    // setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
    dollRefs.rotationYMoverRefs.velocity = newVelocity;
    // dollRefs.rotationYMoverRefs.velocity.z = newVelocity.x;
    // dollRefs.rotationYMoverRefs.velocity.x = newVelocity.y;
    // dollRefs.rotationYMoverRefs.velocity.y = -1.5;
  }

  function hideDoll(dollName: DollName, shouldHide: boolean = true) {
    // IDEA add doll state isHidden, and auto set isVisible/isEnabled with a doll rule

    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("no mesh ref for", dollName);

    if (shouldHide) {
      dollRefs.meshRef.setEnabled(false); // setEnabled also toggles mesh collisions
      dollRefs.checkCollisions = false;
    } else {
      dollRefs.meshRef.setEnabled(true);
      dollRefs.checkCollisions = true;
    }
  }

  function toggleDollMeshes<T_DollName extends DollName>(
    dollName: T_DollName,
    toggledMeshes: Partial<Record<MeshNamesFromDoll<T_DollName>, boolean>>
  ) {
    // IDEA have dollState toggledMeshes and rules to auto enable the meshes

    // const { left_shoe, right_shoe, long_teeth } = otherMeshes;

    const otherMeshes = getRefs().dolls[dollName].otherMeshes;
    const modelName = getModelNameFromDoll(dollName);
    const modelInfo = modelInfoByName[modelName as unknown as ModelName];
    const typedMeshNames = modelInfo.meshNames as unknown as MeshNamesFromDoll<T_DollName>[];

    forEach(typedMeshNames, (meshName) => {
      const newToggle = toggledMeshes[meshName];
      const theMesh = otherMeshes[meshName];

      if (theMesh && newToggle !== undefined) theMesh.setEnabled(newToggle!);
    });
  }

  function getDollBonePosition<T_ModelName extends ModelName>({
    doll,
    model,
    bone,
  }: {
    doll: DollName;
    model: T_ModelName; // TODO update to support auto getting the model name from the doll (when typescript supports keeping generic types for functions (with getStte? or something))
    bone: BoneNameByModel[T_ModelName];
  }) {
    // ModelNameFromDoll
    const dollRefs = getRefs().dolls.dino;

    const dollBone = dollRefs.assetRefs?.bones?.[bone];

    if (dollRefs.meshRef) {
      dollRefs.meshRef.scaling = new Vector3(1.95, 1.95, -1.95);
      dollRefs.checkCollisions = false;
    }

    if (dollBone && dollRefs.meshRef) {
      let position = dollBone.getPosition(Space.WORLD, dollRefs.meshRef);
      return position || Vector3.Zero();
    }
    return Vector3.Zero();
  }

  return {
    setDollPosition,
    setDollRotation,
    setDollRotationY,
    springDollRotationY,
    springAddToDollRotationY,
    pushDollRotationY,
    lookAtOtherDoll,
    setDollAnimation,
    focusOnDoll,
    setDollToSpot,
    springDollToSpot,
    dollLooksAtSpot,
    moveDollAt2DAngle,
    hideDoll,
    toggleDollMeshes,
    getDollBonePosition,
    // springDollPosition,
    // slideDollPosition,
  };
}
