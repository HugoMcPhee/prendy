import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { PlaceName, SpotNameByPlace } from "../../declarations";
import { Vector3 } from "@babylonjs/core";

export function get_spotStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
  // SpotName extends string,
>(storeHelpers: StoreHelpers) {
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
