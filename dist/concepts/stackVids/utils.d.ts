import { VidState } from "../../concepts/safeVids";
import { StackVidState } from ".";
import { GameyConceptoFuncs } from "../typedConceptoFuncs";
export declare function makeStackVidStoreUtils<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    doWhenStackVidStateReady: (stackVidId: string, vidStateToCheck: StackVidState, callback: () => void, checkInitial?: boolean) => string;
    doWhenStackVidStateReadyOrInstant: (stackVidId: string, vidStateToCheck: StackVidState, callback: () => void) => string;
    doWhenStackVidPlay: (stackVidId: string, callback: () => void, checkInitial?: boolean) => string;
    doWhenStackVidPlayOrPause: (stackVidId: string, callback: () => void, checkInitial?: boolean) => string;
    doWhenBothSafeVidsReady: (stackVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => void;
    doWhenBothSafeVidsForStackPlayOrPause: (stackVidId: string, callback: () => void, checkInitial?: boolean) => void;
    setBothSafeVidsState: (stackVidId: string, newState: Partial<Record<any, any>>) => void;
};
