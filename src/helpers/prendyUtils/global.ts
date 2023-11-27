import { MyTypes } from "../../declarations";
import { meta } from "../../meta";

export function setGlobalState<
  GlobalItemState extends ReturnType<MyTypes["Repond"]["getState"]>["global"]["main"] & Record<any, any>,
  PartialGlobalState extends Partial<GlobalItemState>
>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) {
  const { setState } = meta.repond!;

  if (typeof newState === "function") {
    setState((state) => ({ global: { main: newState(state.global.main as GlobalItemState) } }), callback);
  } else {
    setState({ global: { main: newState } }, callback);
  }
}

export function getGlobalState() {
  const { getState } = meta.repond!;

  type AllState = ReturnType<MyTypes["Repond"]["getState"]>;
  return getState().global.main as AllState["global"]["main"];
}
