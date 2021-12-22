import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
//
import { makeSpotStoryUtils } from "../utils/spots";
export function makeCharacterStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    const { getSpotPosition } = makeSpotStoryUtils(storeHelpers);
    function get2DAngleFromCharacterToSpot(character, place, spot) {
        const charactersState = getState().characters;
        const dollA = charactersState[character].dollName;
        const spotPosition = getSpotPosition(place, spot);
        if (!dollA || !spotPosition)
            return 0;
        const dollPos = getState().dolls[dollA].position;
        const dollPos2D = { x: dollPos.z, y: dollPos.x };
        const spotPos2D = { x: spotPosition.z, y: spotPosition.x };
        return getSpeedAndAngleFromVector(subtractPoints(dollPos2D, spotPos2D))
            .angle;
    }
    function get2DAngleBetweenCharacters(charA, charB) {
        const charactersState = getState().characters;
        const dollA = charactersState[charA].dollName;
        const dollB = charactersState[charB].dollName;
        if (!dollA || !dollB)
            return 0;
        const dollAPos = getState().dolls[dollA].position;
        const dollBPos = getState().dolls[dollB].position;
        const dollAPos2D = { x: dollAPos.z, y: dollAPos.x };
        const dollBPos2D = { x: dollBPos.z, y: dollBPos.x };
        return getSpeedAndAngleFromVector(subtractPoints(dollAPos2D, dollBPos2D))
            .angle;
    }
    return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}
