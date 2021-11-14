import { InitialItemsState } from "concep";
import { BackdopArt, PlaceName } from "../../declarations";
export declare type VidState = "beforePlay" | "waitingForPlay" | "readyToPlay" | "play" | "beforeSeek" | "waitingForSeek" | "beforePause" | "waitingForPause" | "pause" | "beforeLoad" | "waitingForLoad" | "beforeUnload" | "waitingForUnload" | "unloaded";
export default function safeVids<A_BackdopArt extends BackdopArt = BackdopArt, A_PlaceName extends PlaceName = PlaceName>(backdopArt: A_BackdopArt): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        vidState: VidState;
        playType: "pause" | "play";
        wantedSeekTime: number | null;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSource: string;
        autoplay: boolean;
    };
    refs: () => {
        videoElement: HTMLVideoElement | null;
    };
    startStates: InitialItemsState<(<T_ItemName extends string>(itemName: T_ItemName) => {
        vidState: VidState;
        playType: "pause" | "play";
        wantedSeekTime: number | null;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSource: string;
        autoplay: boolean;
    })>;
};
