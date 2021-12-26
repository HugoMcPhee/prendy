import { makeGetCharDollStuff } from "../../../stores/characters/utils";
import { makeGlobalStoreUtils } from "../../../stores/global/utils";
import { makeCharacterStoryUtils } from "../utils/characters";
import { makeDollStoryHelpers } from "./dolls";
export function makeCharacterStoryHelpers(storeHelpers, prendyConcepts, prendyStartOptions, modelInfoByName, characterNames) {
    const { getGlobalState } = makeGlobalStoreUtils(storeHelpers);
    const getCharDollStuff = makeGetCharDollStuff(storeHelpers);
    const { get2DAngleBetweenCharacters } = makeCharacterStoryUtils(storeHelpers);
    const { moveDollAt2DAngle, setDollAnimation, setDollPosition, setDollRotationY, springAddToDollRotationY, springDollRotationY, } = makeDollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);
    function setCharAnimation(character, animation // AnimationNameFromModel might keep the type better
    ) {
        const { dollName } = getCharDollStuff(character);
        setDollAnimation(dollName, animation);
    }
    function setCharPosition(charName, newPosition) {
        const { dollName } = getCharDollStuff(charName);
        setDollPosition(dollName, newPosition);
    }
    function setCharRotationY(charName, newRotationY) {
        const { dollName } = getCharDollStuff(charName);
        setDollRotationY(dollName, newRotationY);
    }
    function springCharRotation(charName, newRotationY) {
        const { dollName } = getCharDollStuff(charName);
        springDollRotationY(dollName, newRotationY);
    }
    function springAddToCharRotationY(charName, addedRotation) {
        const { dollName } = getCharDollStuff(charName);
        springAddToDollRotationY(dollName, addedRotation);
    }
    function lookAtOtherCharacter(charA, charB // defaults to playerChaarcter
    ) {
        // NOTE could be async
        const { playerCharacter } = getGlobalState();
        const editedCharB = charB !== null && charB !== void 0 ? charB : playerCharacter;
        const { dollName } = getCharDollStuff(editedCharB);
        const angle = get2DAngleBetweenCharacters(editedCharB, charA);
        springDollRotationY(dollName, angle);
    }
    function lookAtEachother(characterA, characterB = characterNames[0]) {
        lookAtOtherCharacter(characterA, characterB);
        lookAtOtherCharacter(characterB, characterA);
    }
    function moveCharacterAt2DAngle(charName, angle) {
        const { dollName } = getCharDollStuff(charName);
        moveDollAt2DAngle(dollName, angle);
    }
    return {
        setCharAnimation,
        setCharPosition,
        setCharRotationY,
        springCharRotation,
        springAddToCharRotationY,
        lookAtOtherCharacter,
        lookAtEachother,
        moveCharacterAt2DAngle,
    };
}
