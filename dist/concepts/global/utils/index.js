// import { getState, ItemState, setState } from "concepts";
// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;
export function makeGlobalStoreUtils(conceptoFuncs) {
    const { getState, getRefs, setState } = conceptoFuncs;
    function setGlobalState(newState) {
        if (typeof newState === "function") {
            setState((state) => ({ global: { main: newState(state.global.main) } }));
        }
        else {
            setState({ global: { main: newState } });
        }
    }
    function getGlobalState() {
        return getState().global.main;
    }
    return { setGlobalState, getGlobalState };
}
