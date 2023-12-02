import { get2DAngleBetweenCharacters, getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { getGlobalState } from "../prendyUtils/global";
import { setDollAnimation, setDollPosition, setDollRotationY, springDollRotationY, springAddToDollRotationY, moveDollAt2DAngle, } from "./dolls";
import { meta } from "../../meta";
export function setCharAnimation(character, animation // AnimationNameFromModel might keep the type better
) {
    const { dollName } = getCharDollStuff(character);
    setDollAnimation(dollName, animation);
}
export function setCharPosition(charName, newPosition) {
    const { dollName } = getCharDollStuff(charName);
    setDollPosition(dollName, newPosition);
}
export function setCharRotationY(charName, newRotationY) {
    const { dollName } = getCharDollStuff(charName);
    setDollRotationY(dollName, newRotationY);
}
export function springCharRotation(charName, newRotationY) {
    const { dollName } = getCharDollStuff(charName);
    springDollRotationY(dollName, newRotationY);
}
export function springAddToCharRotationY(charName, addedRotation) {
    const { dollName } = getCharDollStuff(charName);
    springAddToDollRotationY(dollName, addedRotation);
}
export function lookAtOtherCharacter(charA, charB // defaults to playerChaarcter
) {
    // NOTE could be async
    const { playerCharacter } = getGlobalState();
    const editedCharB = charB ?? playerCharacter;
    const { dollName } = getCharDollStuff(editedCharB);
    const angle = get2DAngleBetweenCharacters(editedCharB, charA);
    springDollRotationY(dollName, angle);
}
export function lookAtEachother(characterA, characterBParam) {
    const characterB = characterBParam || meta.assets.characterNames[0];
    lookAtOtherCharacter(characterA, characterB);
    lookAtOtherCharacter(characterB, characterA);
}
export function moveCharacterAt2DAngle(charName, angle) {
    const { dollName } = getCharDollStuff(charName);
    moveDollAt2DAngle(dollName, angle);
}
// }
