import { makeTyped_dollStoryUtils } from "./dolls";
export function makeTyped_characterStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    // const { getSpotPosition } = makeSpotStoryUtils(storeHelpers);
    const { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = makeTyped_dollStoryUtils(storeHelpers);
    function get2DAngleFromCharacterToSpot(character, place, spot) {
        const charactersState = getState().characters;
        const dollA = charactersState[character].dollName;
        return get2DAngleFromDollToSpot(dollA, place, spot);
    }
    // TODO use get2DAngleBetweenDolls from makeDollStoryUtils
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
export function makeTyped_getCharDollStuff(storeHelpers) {
    const { getRefs, getState } = storeHelpers;
    return function getCharDollStuff(charName) {
        if (!getState().characters[charName]) {
            console.log("charName", charName);
            console.log(getState().characters);
        }
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
