import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";

export function makeSpotStoryUtils<
  // SpotName extends string,
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceName extends string,
  SpotNameByPlace extends Record<PlaceName, string>
>(conceptoFuncs: ConceptoFuncs) {
  const { getRefs } = conceptoFuncs;

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
