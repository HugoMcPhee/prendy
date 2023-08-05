import { PrendyStoreHelpers } from "../../declarations";
import { VidState } from "../../stores/stateVids";
export declare function get_safeVidUtils(storeHelpers: PrendyStoreHelpers): {
    doWhenStateVidPlayOrPause: (stateVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenStateVidStateReady: (stateVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenStateVidStateSeeked: (stateVidId: string, callback: () => void) => string;
};
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
