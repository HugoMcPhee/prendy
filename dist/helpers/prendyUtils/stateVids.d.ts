import { VidState } from "../../stores/stateVids";
export declare function doWhenStateVidStateChanges(stateVidId: string, checkShouldRun: (newVidState: VidState) => boolean, callback: () => void, checkInitial?: boolean): string | null;
export declare function doWhenStateVidStateSeeked(stateVidId: string, callback: () => void): string;
export declare function doWhenStateVidStateReady(stateVidId: string, vidStateToCheck: VidState, callback: () => void, checkInitial?: boolean): string | null;
export declare function doWhenStateVidPlayOrPause(stateVidId: string, callback: () => void, checkInitial?: boolean): string | null;
export declare function makeVideoElementFromPath(filepath: string): HTMLVideoElement;
