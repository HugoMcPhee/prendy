import { PrendyStoreHelpers } from "../../declarations";
import { VidState } from "../../stores/stateVids";
export declare function get_safeVidUtils(storeHelpers: PrendyStoreHelpers): {
    doWhenSafeVidPlayOrPause: (stateVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenSafeVidStateReady: (stateVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => string | null;
};
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
