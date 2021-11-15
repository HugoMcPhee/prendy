import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { PlaceName, SpotNameByPlace } from "../../../declarations";

export function makeSpotStoryUtils<
  ConcepFuncs extends BackdopConcepFuncs,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
  // SpotName extends string,
>(concepFuncs: ConcepFuncs) {
  const { getRefs } = concepFuncs;

  function getSpotPosition<T_Place extends A_PlaceName>(
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place]
  ) {
    const placesRefs = getRefs().places;
    const newPositon = placesRefs[place].spotPositions[spot].clone();
    return newPositon;
  }

  function getSpotRotation<T_Place extends A_PlaceName>(
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place]
  ) {
    const placesRefs = getRefs().places;
    const newRotation = placesRefs[place].spotRotations[spot].clone();
    return newRotation;
  }

  return { getSpotPosition, getSpotRotation };
}
