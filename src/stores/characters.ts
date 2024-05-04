import { forEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";
import { AnyCameraName, AnyTriggerName, CharacterName, CharacterOptions, DollName } from "../types";

export default function characters<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { characterNames, dollNames, characterOptions } = prendyAssets;

  const getDefaultState = <T_CharacterName extends string, T_DollName extends DollName>(
    _characterName: T_CharacterName,
    dollName?: T_DollName
  ) => {
    return {
      dollName: (dollName ?? dollNames[0]) as T_DollName,
      // Colliders
      atTriggers: {} as Partial<Record<AnyTriggerName, boolean>>,
      atCamCubes: {} as Partial<Record<AnyCameraName, boolean>>,
      hasLeftFirstTrigger: true, // when going to a new place, it waits to leave the first trigger before triggers work again
    };
  };

  const getDefaultRefs = <T_CharacterName extends string>(_characterName: T_CharacterName) => ({
    testRef: null,
  });

  // hacky way to get return type from generic function
  // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
  class StateReturnType_Generic_Helper<T_A extends CharacterName, T_B extends DollName> {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return getDefaultState<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<T_A extends CharacterName, T_B extends DollName> = ReturnType<
    StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]
  >;

  // automatically make atleast a character
  type CharacterStartStates = {
    [K_CharacterName in CharacterName]: StateReturnType<K_CharacterName, CharacterOptions[K_CharacterName]["doll"]>;
  };
  function makeAutmaticCharacterStartStates() {
    const partialModelStates = {} as Partial<CharacterStartStates>;
    forEach(characterNames as CharacterName[], (characterName) => {
      partialModelStates[characterName] = getDefaultState(characterName, characterOptions[characterName].doll);
    });
    return partialModelStates as CharacterStartStates;
  }

  const startStates = {
    ...makeAutmaticCharacterStartStates(),
    // friend: state("friend", "friend"),
  };

  return { startStates, getDefaultState, getDefaultRefs };
}
