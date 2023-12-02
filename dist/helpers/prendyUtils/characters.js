import { getRefs, getState } from "repond";
import { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } from "./dolls";
export function get2DAngleFromCharacterToSpot(character, place, spot) {
    const charactersState = getState().characters;
    const dollA = charactersState[character].dollName;
    return get2DAngleFromDollToSpot(dollA, place, spot);
}
export function get2DAngleBetweenCharacters(charA, charB) {
    const charactersState = getState().characters;
    const dollA = charactersState[charA].dollName;
    const dollB = charactersState[charB].dollName;
    if (!dollA || !dollB)
        return 0;
    return get2DAngleBetweenDolls(dollA, dollB);
}
export function getCharDollStuff(charName) {
    const { dollName } = getState().characters[charName];
    const dollState = getState().dolls[dollName];
    const dollRefs = getRefs().dolls[dollName];
    const { meshRef } = dollRefs;
    return {
        dollName: dollName,
        meshRef: meshRef,
        dollRefs: dollRefs,
        dollState: dollState,
    };
}
// }
