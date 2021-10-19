import { VidState } from "../../concepts/safeVids";
import { StackVidState } from ".";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeStackVidStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    doWhenStackVidStateReady: (stackVidId: string, vidStateToCheck: StackVidState, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenStackVidStateReadyOrInstant: (stackVidId: string, vidStateToCheck: StackVidState, callback: () => void) => string | null;
    doWhenStackVidPlay: (stackVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenStackVidPlayOrPause: (stackVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenBothSafeVidsReady: (stackVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => void;
    doWhenBothSafeVidsForStackPlayOrPause: (stackVidId: string, callback: () => void, checkInitial?: boolean) => void;
    setBothSafeVidsState: (stackVidId: string, newState: Partial<Record<any, any>>) => void;
};
