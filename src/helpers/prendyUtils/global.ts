import { PrendyStoreHelpers } from "../../declarations";

export function get_globalUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(
  storeHelpers: A_PrendyStoreHelpers
) {
  const { getState, setState } = storeHelpers;

  type AllState = ReturnType<A_PrendyStoreHelpers["getState"]>;

  function setGlobalState<
    GlobalItemState extends AllState["global"]["main"] & Record<any, any>,
    PartialGlobalState extends Partial<GlobalItemState>
  >(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) {
    if (typeof newState === "function") {
      setState((state) => ({ global: { main: newState(state.global.main as GlobalItemState) } }), callback);
    } else {
      setState({ global: { main: newState } }, callback);
    }
  }

  function getGlobalState() {
    return getState().global.main as AllState["global"]["main"];
  }

  return { setGlobalState, getGlobalState };
}
