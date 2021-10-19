import { InitialItemsState } from "concep";
export declare type StackVidState = "beforePlay" | "waitingForPlay" | "play" | "beforeSeek" | "waitingForSeek" | "beforePause" | "waitingForPause" | "pause" | "beforeLoad" | "waitingForLoad" | "beforeUnload" | "waitingForUnload" | "unloaded";
export default function stackVids<PlaceName extends string>(placeNames: readonly PlaceName[]): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        vidAId: string | null;
        vidBId: string | null;
        vidState: StackVidState;
        playType: "pause" | "play";
        wantedSeekTime: number | null;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSourcePath: string;
        autoplay: boolean;
    };
    refs: () => {};
    startStates: InitialItemsState<(<T_ItemName extends string>(itemName: T_ItemName) => {
        vidAId: string | null;
        vidBId: string | null;
        vidState: StackVidState;
        playType: "pause" | "play";
        wantedSeekTime: number | null;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSourcePath: string;
        autoplay: boolean;
    })>;
};
