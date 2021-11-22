import {
  CharacterName,
  DollName,
  AnyTriggerName,
  AnyCameraName,
  CharacterOptions,
  BackdopArt,
} from "../../declarations";
import { forEach } from "chootils/dist/loops";

export default function characters<
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_BackdopArt extends BackdopArt = BackdopArt
>(backdopArt: A_BackdopArt) {
  const { characterNames, dollNames, characterOptions } = backdopArt;

  const state = <T_CharacterName extends string, T_DollName extends A_DollName>(
    _characterName: T_CharacterName,
    dollName?: T_DollName
  ) => {
    return {
      dollName: dollName ?? dollNames[0],
      // Colliders
      atTriggers: {} as Partial<Record<A_AnyTriggerName, boolean>>,
      atCamCubes: {} as Partial<Record<A_AnyCameraName, boolean>>,
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
    T_A extends A_CharacterName,
    T_B extends A_DollName
  > {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return state<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<
    T_A extends A_CharacterName,
    T_B extends A_DollName
  > = ReturnType<StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]>;

  // automatically make atleast a character
  type CharacterStartStates = {
    [K_CharacterName in A_CharacterName]: StateReturnType<
      K_CharacterName,
      A_CharacterOptions[K_CharacterName]["doll"]
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
