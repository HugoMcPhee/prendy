import { PrendyAssets } from "../declarations";
export declare type SliceVidState = "beforeDoLoop" | "waitingForDoLoop" | "beforeChangeSlice" | "waitingForChangeSlice" | "play" | "pause" | "beforeUnload" | "waitingForUnload" | "unloaded" | "beforeLoad" | "waitingForLoad";
export declare type VidLetter = "a" | "b";
export declare type VidSlice = {
    time: number;
    duration: number;
};
export default function sliceVids(prendyAssets: PrendyAssets): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        stateVidId_playing: string | null;
        stateVidId_waiting: string | null;
        sliceVidState: SliceVidState;
        nowSlice: {
            time: number;
            duration: number;
        };
        goalSlice: VidSlice | null;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSlice_keepProgress: boolean;
        newPlayingVidStartedTime: number;
        nowSliceSeekedTime: number;
    };
    refs: () => {
        waitingForPlayToDoLoopRuleName: string | null;
    };
    startStates: Record<string, {
        stateVidId_playing: string | null;
        stateVidId_waiting: string | null;
        sliceVidState: SliceVidState;
        nowSlice: {
            time: number;
            duration: number;
        };
        goalSlice: VidSlice | null;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSlice_keepProgress: boolean;
        newPlayingVidStartedTime: number;
        nowSliceSeekedTime: number;
    }>;
};
