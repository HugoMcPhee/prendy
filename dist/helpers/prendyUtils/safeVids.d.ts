import { VidState } from "../../stores/safeVids";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function get_safeVidUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    doWhenSafeVidPlayOrPause: (safeVidId: string, callback: () => void, checkInitial?: boolean) => string | null;
    doWhenSafeVidStateReady: (safeVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean) => string | null;
};
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
