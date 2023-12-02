import { Space, Vector3 } from "@babylonjs/core";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import { getRefs, getState, setState } from "repond";
import { MyTypes } from "../../declarations";
import { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } from "../../helpers/prendyUtils/dolls";
import { setGlobalState } from "../../helpers/prendyUtils/global";
import { meta } from "../../meta";
import { vector3ToPoint3d } from "../babylonjs/vectors";
import { getSpotPosition, getSpotRotation } from "../prendyUtils/spots";

type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
type BoneNameByModel = MyTypes["Types"]["BoneNameByModel"];
type CharacterName = MyTypes["Types"]["CharacterName"];
type CharacterOptions = MyTypes["Types"]["CharacterOptions"];
type DollName = MyTypes["Types"]["DollName"];
type DollOptions = MyTypes["Types"]["DollOptions"];
type MeshNameByModel = MyTypes["Types"]["MeshNameByModel"];
type ModelName = MyTypes["Types"]["ModelName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];

// const { prendyOptions } = meta.assets!;

// type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];

type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

// type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<
//   DollNameFromCharacter<T_CharacterName>
// >;

// type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
//   AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];

// --------------------------------------------------------------

export function setDollPosition(dollName: DollName, newPositon: Vector3) {
  const dollRefs = getRefs().dolls[dollName];
  if (!dollRefs.meshRef) return console.warn("NO MESH REF", dollName);

  // const prevCollisionsEnabled = dollRefs.canCollide;
  dollRefs.canGoThroughWalls = true;

  setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
    dollRefs.canGoThroughWalls = false;
    setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } });
  });
}

function springDollPosition(dollName: DollName, newPositon: Vector3) {}
function slideDollPosition(dollName: DollName, newPositon: Vector3) {}

export function setDollRotation(dollName: DollName, newRotation: Vector3) {
  const dollRefs = getRefs().dolls[dollName];
  if (!dollRefs.meshRef) return console.warn("no mesh ref", dollName);

  dollRefs.meshRef.rotationQuaternion = null;
  dollRefs.meshRef.rotation = newRotation; // the spot rotation can be on all x,y and z
  // setDollRotationY(dollName, newRotation.y); // currently this will replace the meshes  xz rotations TODO have doll 3d rotation state
}

export function lookAtOtherDoll(
  dollA: DollName,
  dollB: DollName // defaults to playerChaarcter
) {
  // NOTE could be async

  const angle = get2DAngleBetweenDolls(dollB, dollA);
  springDollRotationY(dollB, angle);
}

export function dollLooksAtSpot<T_PlaceName extends PlaceName>({
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

export function setDollRotationY(dollName: DollName, newRotationY: number) {
  setState({
    dolls: {
      [dollName]: {
        rotationY: newRotationY,
        // rotationYGoal: newRotationY, // NOTE setting both can make the goal rotate multiple times, it might not be finding the shortest angle
      },
    },
  });
}

export function springDollRotationY(dollName: DollName, newRotation: number) {
  setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
}

export function springAddToDollRotationY(dollName: DollName, addedRotation: number, useShortestAngle: boolean = false) {
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

export function setDollAnimation<T_Doll extends DollName>(
  doll: T_Doll,
  animation: AnimationNameByModel[ModelNameFromDoll<T_Doll>]
) {
  setState({ dolls: { [doll]: { nowAnimation: animation } } });
}

export function focusOnDoll<T_Doll extends DollName>(dollName: T_Doll, zoom?: number) {
  const { prendyOptions } = meta.assets!;
  setGlobalState({
    focusedDoll: dollName,
    slateZoomGoal: zoom !== undefined ? Math.min(zoom, prendyOptions.zoomLevels.max) : prendyOptions.zoomLevels.default,
  });
}

export function setDollToSpot<T_PlaceName extends PlaceName>({
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
export function springDollToSpot<T_PlaceName extends PlaceName>({
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

export function moveDollAt2DAngle(dollName: DollName, angle: number, speed: number = 3) {
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

export function pushDollRotationY(dollName: DollName, direction: "right" | "left", speed: number = 3) {
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

export function hideDoll(dollName: DollName, shouldHide: boolean = true) {
  setState({ dolls: { [dollName]: { isVisible: !shouldHide } } }, () => {});
}

export function toggleDollMeshes<T_DollName extends DollName>(
  dollName: T_DollName,
  toggledMeshes: Partial<Record<MeshNamesFromDoll<T_DollName>, boolean>>
) {
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
    dolls: { [dollName]: { toggledMeshes: { ...(state.dolls[dollName].toggledMeshes as any), ...toggledMeshes } } },
  }));
}

export function getDollBonePosition<T_ModelName extends ModelName>({
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
    // dollRefs.canCollide = true;
  }

  if (dollBone && dollRefs.meshRef) {
    let position = dollBone.getPosition(Space.WORLD, dollRefs.meshRef);
    return position || Vector3.Zero();
  }
  return Vector3.Zero();
}

// }
