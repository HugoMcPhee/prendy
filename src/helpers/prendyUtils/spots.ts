import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";

export function get_spotStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]) {
  type A_PlaceName = T_MyTypes["Main"]["PlaceName"];
  type A_SpotNameByPlace = T_MyTypes["Main"]["SpotNameByPlace"];

  const { getRefs } = storeHelpers;

  function getSpotPosition<T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place]) {
    const placesRefs = getRefs().places;
    const newPositon: Vector3 = placesRefs[place].spotPositions[spot].clone();
    return newPositon;
  }

  function getSpotRotation<T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place]) {
    const placesRefs = getRefs().places;
    const newRotation: Vector3 = placesRefs[place].spotRotations[spot].clone();
    return newRotation;
  }

  return { getSpotPosition, getSpotRotation };
}
