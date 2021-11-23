import { VidState } from "../../concepts/safeVids";
import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeSafeVidStoreUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    doWhenSafeVidPlayOrPause: (safeVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenSafeVidStateReady: (safeVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => string | null;
};
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
