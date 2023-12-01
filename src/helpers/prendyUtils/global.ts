import { AllState, getState, setState } from "repond";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";

export function setGlobalState<
  GlobalItemState extends AllState["global"]["main"] & Record<any, any>,
  PartialGlobalState extends Partial<GlobalItemState>
>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) {
  if (typeof newState === "function") {
    setState((state) => ({ global: { main: newState(state.global.main as GlobalItemState) } }), callback);
  } else {
    setState({ global: { main: newState } }, callback);
  }
}

export function getGlobalState() {
  return getState().global.main as AllState["global"]["main"];
}
