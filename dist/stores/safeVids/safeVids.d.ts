import { InitialItemsState } from "pietem";
import { PrendyAssets, PlaceName } from "../../declarations";
export declare type VidState = "beforePlay" | "waitingForPlay" | "readyToPlay" | "play" | "beforeSeek" | "waitingForSeek" | "beforePause" | "waitingForPause" | "pause" | "beforeLoad" | "waitingForLoad" | "beforeUnload" | "waitingForUnload" | "unloaded";
export declare const abLetters: readonly ["a", "b"];
export default function safeVids<A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PlaceName extends PlaceName = PlaceName>(prendyAssets: A_PrendyAssets): {
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
