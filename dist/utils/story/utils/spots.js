export function makeSpotStoryUtils(storeHelpers) {
    const { getRefs } = storeHelpers;
    function getSpotPosition(place, spot) {
        const placesRefs = getRefs().places;
        const newPositon = placesRefs[place].spotPositions[spot].clone();
        return newPositon;
    }
    function getSpotRotation(place, spot) {
        const placesRefs = getRefs().places;
        const newRotation = placesRefs[place].spotRotations[spot].clone();
        return newRotation;
    }
    return { getSpotPosition, getSpotRotation };
}
