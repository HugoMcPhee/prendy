import { VidState } from "../../concepts/safeVids";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeSafeVidStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    doWhenSafeVidPlayOrPause: (safeVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenSafeVidStateReady: (safeVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => string | null;
};
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
