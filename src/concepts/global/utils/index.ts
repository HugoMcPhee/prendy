// import { getState, ItemState, setState } from "concepts";

import { StoreHelperTypes } from "pietem";
import { PrendyStoreHelpers } from "../../typedStoreHelpers";

// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;

export function makeGlobalStoreUtils<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers
) {
  const { getState, setState } = storeHelpers;

  type AllState = ReturnType<StoreHelpers["getState"]>;

  // type GlobalItemState = AllState["global"]["main"];

  // type PartialGlobalState = Partial<GlobalItemState>;

  function setGlobalState<
    GlobalItemState extends AllState["global"]["main"] & Record<any, any>,
    PartialGlobalState extends Partial<GlobalItemState>
  >(
    newState:
      | PartialGlobalState
      | ((state: GlobalItemState) => PartialGlobalState),
    callback?: () => void
  ) {
    if (typeof newState === "function") {
      setState(
        (state) => ({
          global: { main: newState(state.global.main as GlobalItemState) },
        }),
        callback
      );
    } else {
      setState({ global: { main: newState } }, callback);
    }
  }

  function getGlobalState() {
    return getState().global.main as AllState["global"]["main"];
  }

  return { setGlobalState, getGlobalState };
}
