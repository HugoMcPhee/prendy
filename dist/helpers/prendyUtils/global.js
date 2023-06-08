export function get_globalUtils(storeHelpers) {
    const { getState, setState } = storeHelpers;
    function setGlobalState(newState, callback) {
        if (typeof newState === "function") {
            setState((state) => ({ global: { main: newState(state.global.main) } }), callback);
        }
        else {
            setState({ global: { main: newState } }, callback);
        }
    }
    function getGlobalState() {
        return getState().global.main;
    }
    return { setGlobalState, getGlobalState };
}
