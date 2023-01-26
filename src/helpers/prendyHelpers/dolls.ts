import { Space, Vector3 } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
import {
  AnimationNameByModel,
  PrendyOptions,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MeshNameByModel,
  ModelInfoByName,
  ModelName,
  PlaceName,
  SpotNameByPlace,
  BoneNameByModel,
} from "../../declarations";
import { vector3ToPoint3d } from "../../helpers/babylonjs/babylonjs";
import { get_dollStoryUtils } from "../../helpers/prendyUtils/dolls";
import { get_spotStoryUtils } from "../../helpers/prendyUtils/spots";

export function get_dollStoryHelpers<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_ModelName extends ModelName = ModelName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel
>(
  storeHelpers: StoreHelpers,
  // prendyStores: PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  modelInfoByName: A_ModelInfoByName
) {
  const { getRefs, getState, setState } = storeHelpers;

  type DollNameFromCharacter<T_CharacterName extends A_CharacterName> = A_CharacterOptions[T_CharacterName]["doll"];

  type ModelNameFromDoll<T_DollName extends A_DollName> = A_DollOptions[T_DollName]["model"];

  type ModelNameFromCharacter<T_CharacterName extends A_CharacterName> = ModelNameFromDoll<
    DollNameFromCharacter<T_CharacterName>
  >;

  type AnimationNameFromCharacter<T_CharacterName extends A_CharacterName> =
    A_AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

  type MeshNamesFromDoll<T_DollName extends A_DollName> = A_MeshNameByModel[ModelNameFromDoll<T_DollName>];

  const { setGlobalState } = get_globalUtils(storeHelpers);

  const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils<
    StoreHelpers,
    PrendyStores,
    A_DollName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);

  const { getSpotPosition, getSpotRotation } = get_spotStoryUtils(storeHelpers);

  // --------------------------------------------------------------

  function setDollPosition(dollName: A_DollName, newPositon: Vector3) {
    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("NO MESH REF", dollName);

    const prevCollisionsEnabled = dollRefs.checkCollisions;
    dollRefs.checkCollisions = false;

    setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
      // dollRefs.checkCollisions = prevCollisionsEnabled;
      dollRefs.checkCollisions = true;
    });
  }

  function springDollPosition(dollName: A_DollName, newPositon: Vector3) {}

  function slideDollPosition(dollName: A_DollName, newPositon: Vector3) {}

  function setDollRotation(dollName: A_DollName, newRotation: Vector3) {
    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("no mesh ref", dollName);

    dollRefs.meshRef.rotationQuaternion = null;
    dollRefs.meshRef.rotation = newRotation; // the spot rotation can be on all x,y and z
    // setDollRotationY(dollName, newRotation.y); // currently this will replace the meshes  xz rotations TODO have doll 3d rotation state
  }

  function lookAtOtherDoll(
    dollA: A_DollName,
    dollB: A_DollName // defaults to playerChaarcter
  ) {
    // NOTE could be async

    const angle = get2DAngleBetweenDolls(dollB, dollA);
    springDollRotationY(dollB, angle);
  }

  function dollLooksAtSpot<T_PlaceName extends A_PlaceName>({
    place,
    spot,
    doll,
  }: {
    place: T_PlaceName;
    spot: A_SpotNameByPlace[T_PlaceName];
    doll: A_DollName;
  }) {
    const angle = get2DAngleFromDollToSpot(doll, place, spot);
    springDollRotationY(doll, angle);
  }

  function setDollRotationY(dollName: A_DollName, newRotationY: number) {
    setState({
      dolls: {
        [dollName]: {
          rotationY: newRotationY,
          // rotationYGoal: newRotationY,
        },
      },
    });
  }

  function springDollRotationY(dollName: A_DollName, newRotation: number) {
    setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
  }

  function springAddToDollRotationY(dollName: A_DollName, addedRotation: number, useShortestAngle: boolean = false) {
    setState((state) => {
      state.useShortestAngle;

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

  function setDollAnimation<T_Doll extends A_DollName>(
    doll: T_Doll,
    animation: A_AnimationNameByModel[ModelNameFromDoll<T_Doll>]
  ) {
    setState({ dolls: { [doll]: { nowAnimation: animation } } });
  }

  function focusOnDoll<T_Doll extends A_DollName>(dollName: T_Doll, zoom?: number) {
    setGlobalState({
      focusedDoll: dollName,
      planeZoomGoal:
        zoom !== undefined ? Math.min(zoom, prendyStartOptions.zoomLevels.max) : prendyStartOptions.zoomLevels.default,
    });
  }

  function setDollToSpot<T_PlaceName extends A_PlaceName>({
    place,
    spot,
    doll: dollName,
    dontSetRotationState,
  }: {
    place: T_PlaceName;
    spot: A_SpotNameByPlace[T_PlaceName];
    doll: A_DollName;
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
  function springDollToSpot<T_PlaceName extends A_PlaceName>({
    place,
    spot,
    doll: dollName,
  }: // useRotation = true,
  {
    place: T_PlaceName;
    spot: A_SpotNameByPlace[T_PlaceName];
    doll: A_DollName;
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

  function moveDollAt2DAngle(dollName: A_DollName, angle: number, speed: number = 3) {
    const dollState = getState().dolls[dollName];
    const dollRefs = getRefs().dolls[dollName];
    const { positionIsMoving, positionMoveMode } = dollState;

    if (!positionIsMoving || positionMoveMode !== "push") {
      setState({
        dolls: {
          [dollName]: { positionIsMoving: true, positionMoveMode: "push" },
        },
      });
    }

    let newVelocity = getVectorFromSpeedAndAngle(speed, angle);
    setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
    dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
    dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
    dollRefs.positionMoverRefs.velocity.y = -1.5;
  }

  function pushDollRotationY(dollName: A_DollName, direction: "right" | "left", speed: number = 3) {
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

  function hideDoll(dollName: A_DollName, shouldHide: boolean = true) {
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

  function toggleDollMeshes<T_DollName extends A_DollName>(
    dollName: T_DollName,
    toggledMeshes: Partial<Record<MeshNamesFromDoll<T_DollName>, boolean>>
  ) {
    // IDEA have dollState toggledMeshes and rules to auto enable the meshes

    // const { left_shoe, right_shoe, long_teeth } = otherMeshes;

    const otherMeshes = getRefs().dolls[dollName].otherMeshes;
    const modelName = getModelNameFromDoll(dollName);
    const modelInfo = modelInfoByName[modelName as unknown as A_ModelName];
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
    // springDollPosition,
    // slideDollPosition,
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
  };
}
