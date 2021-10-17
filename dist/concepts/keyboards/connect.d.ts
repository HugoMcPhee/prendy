import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeKeyboardConnectRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
