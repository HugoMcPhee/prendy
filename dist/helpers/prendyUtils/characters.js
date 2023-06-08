import { get_dollStoryUtils } from "./dolls";
export function get_characterStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    const { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);
    function get2DAngleFromCharacterToSpot(character, place, spot) {
        const charactersState = getState().characters;
        const dollA = charactersState[character].dollName;
        return get2DAngleFromDollToSpot(dollA, place, spot);
    }
    function get2DAngleBetweenCharacters(charA, charB) {
        const charactersState = getState().characters;
        const dollA = charactersState[charA].dollName;
        const dollB = charactersState[charB].dollName;
        if (!dollA || !dollB)
            return 0;
        return get2DAngleBetweenDolls(dollA, dollB);
    }
    return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}
export function get_getCharDollStuff(storeHelpers) {
    const { getRefs, getState } = storeHelpers;
    return function getCharDollStuff(charName) {
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
    };
}
