// import { getState, ItemState, setState } from "stores";
// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;
export function get_globalUtils(storeHelpers) {
    const { getState, setState } = storeHelpers;
    // type GlobalItemState = AllState["global"]["main"];
    // type PartialGlobalState = Partial<GlobalItemState>;
    function setGlobalState(newState, callback) {
        if (typeof newState === "function") {
            setState((state) => ({
                global: { main: newState(state.global.main) },
            }), callback);
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
