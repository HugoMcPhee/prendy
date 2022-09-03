import { Quaternion, TransformNode, Vector3 } from "@babylonjs/core";

const addToHelpFixRotationVector = new Vector3(0, Math.PI, Math.PI); // Math.PI same as toRadians(180)?
const multiplyToHelpFixRotationVector = new Vector3(-1, 1, -1);

export function getAbsoluteRotation(child: TransformNode) {
  // okay, rotation works, but it needs to rotate again hmm

  var scale = new Vector3(0, 0, 0);
  var rotation = new Quaternion();
  var position = new Vector3(0, 0, 0);

  // const { nowPlaceName } = getState().global.main;

  // const placeRefs = placesRefs[nowPlaceName];

  // var tempWorldMatrix = child.getWorldMatrix();
  // tempWorldMatrix.decompose(scale, rotation, translation);
  // return rotation;

  //
  // var rotation = Quaternion.Identity();
  // var position = Vector3.Zero();
  //

  // const scale = new BABYLON.Vector3();
  // const rotation = new BABYLON.Quaternion();
  // const position = new BABYLON.Vector3();
  // console.log("placeRefs.parentTransformNode");
  // console.log(placeRefs.rootMesh);

  // if (!placeRefs.rootMesh) {
  //   console.warn("no rootMesh for ", nowPlaceName);
  //   return new Vector3();
  // }

  // const originalParent = child.parent;
  //
  // child.parent = null;
  // child.setParent(null);

  // const childMatrix = child.getWorldMatrix();
  // const gltfFileParentMatrix = placeRefs.rootMesh.getWorldMatrix();
  // const combinedMatrix = childMatrix.multiply(gltfFileParentMatrix);

  const combinedMatrix = child.getWorldMatrix();

  combinedMatrix.decompose(scale, rotation, position);

  // child.getWorldMatrix().decompose(scale, rotation, position);
  //
  // child.parent = originalParent;

  const eulerRotation = rotation.toEulerAngles();
  // rotation.z *= -1;
  // rotation.w *= -1;

  eulerRotation.addInPlace(addToHelpFixRotationVector);
  eulerRotation.multiplyInPlace(multiplyToHelpFixRotationVector);

  return eulerRotation;

  // if (child.rotationQuaternion) {
  // child.rotationQuaternion.copyFrom(rotation)
  // } else {
  // rotation.toEulerAnglesToRef﻿(child.rotation)
  // }
}
