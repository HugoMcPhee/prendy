import { InitialItemsState } from "concep";
import { PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare type VidState = "beforePlay" | "waitingForPlay" | "readyToPlay" | "play" | "beforeSeek" | "waitingForSeek" | "beforePause" | "waitingForPause" | "pause" | "beforeLoad" | "waitingForLoad" | "beforeUnload" | "waitingForUnload" | "unloaded";
export default function safeVids<PlaceName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<PlaceName>>(placeNames: readonly PlaceName[], placeInfoByName: PlaceInfoByName): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        vidState: VidState;
        playType: "pause" | "play";
        wantedSeekTime: number;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSource: string;
        autoplay: boolean;
    };
    refs: () => {
        videoElement: HTMLVideoElement;
    };
    startStates: InitialItemsState<(<T_ItemName extends string>(itemName: T_ItemName) => {
        vidState: VidState;
        playType: "pause" | "play";
        wantedSeekTime: number;
        wantToPlay: boolean;
        wantToPause: boolean;
        wantToUnload: boolean;
        wantToLoad: boolean;
        videoSource: string;
        autoplay: boolean;
    })>;
};
