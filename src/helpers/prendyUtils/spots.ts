import { Vector3 } from "@babylonjs/core";
import { PlaceName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";

export function get_spotStoryUtils<
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: A_PrendyStoreHelpers) {
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
