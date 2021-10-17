import { BackdopConcepFuncs } from "../../typedConcepFuncs";
export declare function makeGlobalStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    setGlobalState: (newState: Partial<Record<any, any>> | ((state: Record<any, any>) => Partial<Record<any, any>>)) => void;
    getGlobalState: () => Record<any, any>;
};
