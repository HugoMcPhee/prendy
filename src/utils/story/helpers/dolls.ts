import { Vector3 } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import { getVectorFromSpeedAndAngle } from "shutils/dist/speedAngleDistance2d";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  BackdopConcepFuncs,
  PlaceholderBackdopConcepts,
} from "../../../concepts/typedConcepFuncs";
import {
  AnimationNameByModel,
  BackdopOptions,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MeshNameByModel,
  ModelInfoByName,
  ModelName,
  PlaceName,
  SpotNameByPlace,
} from "../../../declarations";
import { vector3ToPoint3d } from "../../babylonjs";
import { makeDollStoryUtils } from "../utils/dolls";
import { makeSpotStoryUtils } from "../utils/spots";

type DollNameFromCharacter<T_CharacterName extends CharacterName> =
  CharacterOptions[T_CharacterName]["doll"];

type ModelNameFromDoll<T_DollName extends DollName> =
  DollOptions[T_DollName]["model"];

type ModelNameFromCharacter<T_CharacterName extends CharacterName> =
  ModelNameFromDoll<DollNameFromCharacter<T_CharacterName>>;

type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
  AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

type MeshNamesFromDoll<T_DollName extends DollName> =
  MeshNameByModel[ModelNameFromDoll<T_DollName>];

export function makeDollStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  modelInfoByName: ModelInfoByName
) {
  const { getRefs, getState, setState } = concepFuncs;

  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);

  const { getModelNameFromDoll } = makeDollStoryUtils(
    concepFuncs,
    backdopConcepts
  );

  const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(concepFuncs);

  // --------------------------------------------------------------

  function setDollPosition(dollName: DollName, newPositon: Vector3) {
    const dollRefs = getRefs().dolls[dollName];
    if (!dollRefs.meshRef) return console.warn("NO MESH REF", dollName);

    const prevCollisionsEnabled = dollRefs.checkCollisions;
    dollRefs.checkCollisions = false;

    setState(
      { dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } },
      () => {
        // dollRefs.checkCollisions = prevCollisionsEnabled;
        dollRefs.checkCollisions = true;
      }
    );
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

  function springAddToDollRotationY(dollName: DollName, addedRotation: number) {
    setState((state) => ({
      dolls: {
        [dollName]: {
          rotationYGoal: state.dolls[dollName].rotationYGoal + addedRotation,
        },
      },
    }));
  }

  function setDollAnimation<T_Doll extends DollName>(
    doll: T_Doll,
    animation: AnimationNameByModel[ModelNameFromDoll<T_Doll>]
  ) {
    setState({ dolls: { [doll]: { nowAnimation: animation } } });
  }

  function focusOnDoll<T_Doll extends DollName>(
    dollName: T_Doll,
    zoom?: number
  ) {
    setGlobalState({
      focusedDoll: dollName,
      planeZoomGoal:
        zoom !== undefined
          ? Math.min(zoom, backdopStartOptions.zoomLevels.max)
          : backdopStartOptions.zoomLevels.default,
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
    newPositionPoint.y += Math.random() * 0.001;
    setState({
      dolls: {
        [dollName]: {
          // monkey: {
          positionGoal: newPositionPoint,
          positionMoveMode: "spring",
          // rotationYGoal: useRotation ? newRotation.y : undefined,
        },
      },
    });
  }

  function moveDollAt2DAngle(dollName: DollName, angle: number) {
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

    let newVelocity = getVectorFromSpeedAndAngle(3, angle);
    setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
    dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
    dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
    dollRefs.positionMoverRefs.velocity.y = -1.5;
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
    const typedMeshNames =
      modelInfo.meshNames as unknown as MeshNamesFromDoll<T_DollName>[];

    forEach(typedMeshNames, (meshName) => {
      const newToggle = toggledMeshes[meshName];
      const theMesh = otherMeshes[meshName];

      if (theMesh && newToggle !== undefined) theMesh.setEnabled(newToggle!);
    });
  }

  return {
    setDollPosition,
    // springDollPosition,
    // slideDollPosition,
    setDollRotation,
    setDollRotationY,
    springDollRotationY,
    springAddToDollRotationY,
    setDollAnimation,
    focusOnDoll,
    setDollToSpot,
    springDollToSpot,
    moveDollAt2DAngle,
    hideDoll,
    toggleDollMeshes,
  };
}
