import { BackdopArt, PlaceName } from "../../declarations";
export declare type SectionVidState = "beforeDoLoop" | "waitingForDoLoop" | "beforeChangeSection" | "waitingForChangeSection" | "play" | "pause" | "beforeUnload" | "waitingForUnload" | "unloaded" | "beforeLoad" | "waitingForLoad";
export declare type VidLetter = "a" | "b";
export declare type VidSection = {
    time: number;
    duration: number;
};
export default function sectionVids<A_BackdopArt extends BackdopArt = BackdopArt, A_PlaceName extends PlaceName = PlaceName>(backdopArt: A_BackdopArt): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        safeVidId_playing: string | null;
        safeVidId_waiting: string | null;
        sectionVidState: SectionVidState;
        nowSection: {
            time: number;
            duration: number;
        };
        wantedSection: VidSection | null;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSection_keepProgress: boolean;
        newplayingVidStartedTime: number;
        nowSectionSeekedTime: number;
    };
    refs: () => {
        waitingForPlayToDoLoopRuleName: string | null;
        waitingForPlayToChangeSectionRuleName: string | null;
    };
    startStates: Record<A_PlaceName, {
        safeVidId_playing: string | null;
        safeVidId_waiting: string | null;
        sectionVidState: SectionVidState;
        nowSection: {
            time: number;
            duration: number;
        };
        wantedSection: VidSection | null;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSection_keepProgress: boolean;
        newplayingVidStartedTime: number;
        nowSectionSeekedTime: number;
    }>;
};
