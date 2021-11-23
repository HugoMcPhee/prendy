import { PrendyConcepFuncs } from "../../typedConcepFuncs";
export declare function makeGlobalStoreUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    setGlobalState: <GlobalItemState extends ReturnType<ConcepFuncs["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getGlobalState: () => ReturnType<ConcepFuncs["getState"]>["global"]["main"];
};
