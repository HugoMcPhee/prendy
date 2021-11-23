import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makePointersConnectRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
