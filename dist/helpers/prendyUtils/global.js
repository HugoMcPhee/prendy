import { meta } from "../../meta";
export function setGlobalState(newState, callback) {
    const { setState } = meta.repond;
    if (typeof newState === "function") {
        setState((state) => ({ global: { main: newState(state.global.main) } }), callback);
    }
    else {
        setState({ global: { main: newState } }, callback);
    }
}
export function getGlobalState() {
    const { getState } = meta.repond;
    return getState().global.main;
}
