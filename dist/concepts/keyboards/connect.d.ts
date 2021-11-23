import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeKeyboardConnectRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
