// import { getState, ItemState, setState } from "concepts";
// type GlobalItemState = ItemState<"global">;
// type PartialGlobalState = Partial<GlobalItemState>;
export function makeGlobalStoreUtils(concepFuncs) {
    const { getState, setState } = concepFuncs;
    // type GlobalItemState = AllState["global"]["main"];
    // type PartialGlobalState = Partial<GlobalItemState>;
    function setGlobalState(newState) {
        if (typeof newState === "function") {
            setState((state) => ({
                global: { main: newState(state.global.main) },
            }));
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
