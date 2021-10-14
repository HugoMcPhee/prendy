import { forEach } from "shutils/dist/loops";

export default function characters<
  DollName extends string,
  AnyTriggerName extends string,
  AnyCameraName extends string
>(dollNames: readonly DollName[]) {
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
    T_A extends string,
    T_B extends DollName
  > {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return state<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<T_A extends string, T_B extends DollName> = ReturnType<
    StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]
  >;

  // automatically make atleast a doll for each model
  type DollModelStartStates = {
    [K_DollName in DollName]: StateReturnType<K_DollName, K_DollName>;
  };
  function makeAutmaticCharacterStartStates() {
    const partialModelStates = {} as Partial<DollModelStartStates>;
    forEach(dollNames, (dollName) => {
      partialModelStates[dollName] = state(dollName, dollName) as any;
    });
    return partialModelStates as DollModelStartStates;
  }

  const startStates = {
    ...makeAutmaticCharacterStartStates(),
    // friend: state("friend", "friend"),
  };

  return { startStates, state, refs };
}
