import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";

export function makeSpotStoryUtils<
  // SpotName extends string,
  ConcepFuncs extends BackdopConcepFuncs,
  PlaceName extends string,
  SpotNameByPlace extends Record<PlaceName, string>
>(concepFuncs: ConcepFuncs) {
  const { getRefs } = concepFuncs;

  function getSpotPosition<T_Place extends PlaceName>(
    place: T_Place,
    spot: SpotNameByPlace[T_Place]
  ) {
    const placesRefs = getRefs().places;
    const newPositon = placesRefs[place].spotPositions[spot].clone();
    return newPositon;
  }

  function getSpotRotation<T_Place extends PlaceName>(
    place: T_Place,
    spot: SpotNameByPlace[T_Place]
  ) {
    const placesRefs = getRefs().places;
    const newRotation = placesRefs[place].spotRotations[spot].clone();
    return newRotation;
  }

  return { getSpotPosition, getSpotRotation };
}
