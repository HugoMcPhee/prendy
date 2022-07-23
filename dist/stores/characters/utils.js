// async function testAnimWeights() {
//   setDollAnimWeight("walker", { walker_idle: 0, walker_walking: 1 });
// }
export function makeGetCharDollStuff(storeHelpers) {
    const { getRefs, getState } = storeHelpers;
    // NOTE TODO all these types need to be made inside the places using them (like story helpers)
    // And getCharDollStuff there too
    // type StartState_Characters = typeof prendyStores.characters.startStates;
    // type StartState_Dolls = typeof prendyStores.dolls.startStates;
    // type DollNameFromCharacter<T_CharacterName extends CharacterName> =
    //   StartState_Characters[T_CharacterName]["dollName"];
    // type ModelNameFromDoll<T_DollName extends DollName> =
    //   StartState_Dolls[T_DollName]["modelName"];
    // type ModelNameFromCharacter<T_CharacterName extends CharacterName> =
    //   ModelNameFromDoll<NonNullable<DollNameFromCharacter<T_CharacterName>>>;
    // type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
    //   AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];
    // type MeshNamesFromDoll<T_DollName extends DollName> =
    //   MeshNameByModel[ModelNameFromDoll<T_DollName>];
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
