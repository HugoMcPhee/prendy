import { getRefs } from "repond";
export function getSpotPosition(place, spot) {
    const placesRefs = getRefs().places;
    const newPositon = placesRefs[place].spotPositions[spot].clone();
    return newPositon;
}
export function getSpotRotation(place, spot) {
    const placesRefs = getRefs().places;
    const newRotation = placesRefs[place].spotRotations[spot].clone();
    return newRotation;
}
//  { getSpotPosition, getSpotRotation };
// }
