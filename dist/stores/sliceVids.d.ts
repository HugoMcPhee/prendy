import { MyTypes } from "../declarations";
export type SliceVidState = "beforeDoLoop" | "waitingForDoLoop" | "beforeChangeSlice" | "waitingForChangeSlice" | "play" | "pause" | "beforeUnload" | "waitingForUnload" | "unloaded" | "beforeLoad" | "waitingForLoad";
export type VidLetter = "a" | "b";
export type VidSlice = {
    time: number;
    duration: number;
};
export default function sliceVids<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
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
    startStates: Record<T_MyTypes["Types"]["PlaceName"], {
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
