import { getState, setState } from "repond";
export function setGlobalState(newState, callback) {
    if (typeof newState === "function") {
        setState((state) => ({ global: { main: newState(state.global.main) } }), callback);
    }
    else {
        setState({ global: { main: newState } }, callback);
    }
}
export function getGlobalState() {
    return getState().global.main;
}
