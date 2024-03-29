import { Vector3 } from "@babylonjs/core";
import { getRefs } from "repond";
import { PlaceName, SpotNameByPlace } from "../../types";

export function getSpotPosition<T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]) {
  const placesRefs = getRefs().places;
  const newPositon: Vector3 = placesRefs[place].spotPositions[spot].clone();
  return newPositon;
}

export function getSpotRotation<T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]) {
  const placesRefs = getRefs().places;
  const newRotation: Vector3 = placesRefs[place].spotRotations[spot].clone();
  return newRotation;
}

//  { getSpotPosition, getSpotRotation };
// }
