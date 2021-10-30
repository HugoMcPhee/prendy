// import { getState, ItemState, setState } from "concepts";

import { ConceptsHelperTypes } from "concep";
import { BackdopConcepFuncs } from "../../typedConcepFuncs";

// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;

export function makeGlobalStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { getState, setState } = concepFuncs;

  type AllState = ReturnType<ConcepFuncs["getState"]>;

  // type GlobalItemState = AllState["global"]["main"];

  // type PartialGlobalState = Partial<GlobalItemState>;

  function setGlobalState<
    GlobalItemState extends AllState["global"]["main"] & Record<any, any>,
    PartialGlobalState extends Partial<GlobalItemState>
  >(
    newState:
      | PartialGlobalState
      | ((state: GlobalItemState) => PartialGlobalState)
  ) {
    if (typeof newState === "function") {
      setState((state) => ({
        global: { main: newState(state.global.main as GlobalItemState) },
      }));
    } else {
      setState({ global: { main: newState } });
    }
  }

  function getGlobalState() {
    return getState().global.main as AllState["global"]["main"];
  }

  return { setGlobalState, getGlobalState };
}
