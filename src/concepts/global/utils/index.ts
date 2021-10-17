// import { getState, ItemState, setState } from "concepts";

import { ConceptsHelperTypes } from "concep";
import { BackdopConcepFuncs } from "../../typedConcepFuncs";

// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;

export function makeGlobalStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { getState, getRefs, setState } = concepFuncs;

  type ItemType = keyof ReturnType<typeof getState>;

  type HelperType<T extends ItemType> = ConceptsHelperTypes<
    typeof getState,
    typeof getRefs,
    T
  >;

  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  // type ItemState =
  type GlobalItemState = ItemState<"global">;
  type PartialGlobalState = Partial<GlobalItemState>;

  function setGlobalState(
    newState:
      | PartialGlobalState
      | ((state: GlobalItemState) => PartialGlobalState)
  ) {
    if (typeof newState === "function") {
      setState((state) => ({ global: { main: newState(state.global.main) } }));
    } else {
      setState({ global: { main: newState } });
    }
  }

  function getGlobalState() {
    return getState().global.main;
  }

  return { setGlobalState, getGlobalState };
}
