import { makeTyped_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { makeTyped_globalUtils } from "../../helpers/prendyUtils/global";
import { makeTyped_characterStoryUtils } from "../../helpers/prendyUtils/characters";
import { makeTyped_dollStoryHelpers } from "./dolls";
export function makeTyped_characterStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames) {
    const { getGlobalState } = makeTyped_globalUtils(storeHelpers);
    const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);
    const { get2DAngleBetweenCharacters } = makeTyped_characterStoryUtils(storeHelpers);
    const { moveDollAt2DAngle, setDollAnimation, setDollPosition, setDollRotationY, springAddToDollRotationY, springDollRotationY, } = makeTyped_dollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);
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
