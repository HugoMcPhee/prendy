import { forEach } from "shutils/dist/loops";
import { CharacterOptionsPlaceholder } from "../typedConceptoFuncs";

export default function characters<
  CharacterName extends string,
  DollName extends string,
  FontName extends string,
  AnyTriggerName extends string,
  AnyCameraName extends string,
  CharacterOptions extends CharacterOptionsPlaceholder<
    CharacterName,
    DollName,
    FontName
  >
  // characterOptions
>(
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[],
  characterOptions: CharacterOptions
) {
  const state = <T_CharacterName extends string, T_DollName extends DollName>(
    _characterName: T_CharacterName,
    dollName?: T_DollName
  ) => {
    return {
      dollName: dollName ?? dollNames[0],
      // Colliders
      atTriggers: {} as Partial<Record<AnyTriggerName, boolean>>,
      atCamCubes: {} as Partial<Record<AnyCameraName, boolean>>,
      hasLeftFirstTrigger: true, // when going to a new place, it waits to leave the first trigger before triggers work again
    };
  };

  const refs = <T_CharacterName extends string>(
    _characterName: T_CharacterName
  ) => ({
    testRef: null,
  });

  // hacky way to get return type from generic function
  // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
  class StateReturnType_Generic_Helper<
    T_A extends CharacterName,
    T_B extends DollName
  > {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return state<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<
    T_A extends CharacterName,
    T_B extends DollName
  > = ReturnType<StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]>;

  // automatically make atleast a character
  type CharacterStartStates = {
    [K_CharacterName in CharacterName]: StateReturnType<
      K_CharacterName,
      CharacterOptions[K_CharacterName]["doll"]
    >;
  };
  function makeAutmaticCharacterStartStates() {
    const partialModelStates = {} as Partial<CharacterStartStates>;
    forEach(characterNames, (characterName) => {
      partialModelStates[characterName] = state(
        characterName,
        characterOptions[characterName].doll
      );
    });
    return partialModelStates as CharacterStartStates;
  }

  const startStates = {
    ...makeAutmaticCharacterStartStates(),
    // friend: state("friend", "friend"),
  };

  return { startStates, state, refs };
}
