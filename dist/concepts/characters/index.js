import { forEach } from "shutils/dist/loops";
export default function characters(characterNames, dollNames, characterOptions) {
    const state = (_characterName, dollName) => {
        return {
            dollName: dollName !== null && dollName !== void 0 ? dollName : dollNames[0],
            // Colliders
            atTriggers: {},
            atCamCubes: {},
            hasLeftFirstTrigger: true, // when going to a new place, it waits to leave the first trigger before triggers work again
        };
    };
    const refs = (_characterName) => ({
        testRef: null,
    });
    // hacky way to get return type from generic function
    // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
    class StateReturnType_Generic_Helper {
        // wrapped has no explicit return type so we can infer it
        wrapped(a, b) {
            return state(a, b);
        }
    }
    function makeAutmaticCharacterStartStates() {
        const partialModelStates = {};
        forEach(characterNames, (characterName) => {
            partialModelStates[characterName] = state(characterName, characterOptions[characterName].doll);
        });
        return partialModelStates;
    }
    const startStates = {
        ...makeAutmaticCharacterStartStates(),
        // friend: state("friend", "friend"),
    };
    return { startStates, state, refs };
}
