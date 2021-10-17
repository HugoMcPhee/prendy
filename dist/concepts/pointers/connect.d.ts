import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makePointersConnectRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
