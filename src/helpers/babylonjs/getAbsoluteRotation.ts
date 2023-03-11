import { Quaternion, TransformNode, Vector3 } from "@babylonjs/core";

const addToHelpFixRotationVector = new Vector3(0, Math.PI, Math.PI); // Math.PI same as toRadians(180)?
const multiplyToHelpFixRotationVector = new Vector3(-1, 1, -1);

export function getAbsoluteRotation(child: TransformNode) {
  console.log("getAbsoluteRotation");

  var scale = new Vector3(0, 0, 0);
  var rotation = new Quaternion();
  var position = new Vector3(0, 0, 0);

  const combinedMatrix = child.getWorldMatrix();
  combinedMatrix.decompose(scale, rotation, position);

  const eulerRotation = rotation.toEulerAngles();

  eulerRotation.addInPlace(addToHelpFixRotationVector);
  eulerRotation.multiplyInPlace(multiplyToHelpFixRotationVector);

  return eulerRotation;
}
