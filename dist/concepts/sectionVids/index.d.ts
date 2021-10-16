export declare type SectionVidState = "beforeDoLoop" | "waitingForDoLoop" | "beforeChangeSection" | "waitingForChangeSection" | "play" | "pause" | "beforeUnload" | "waitingForUnload" | "unloaded" | "beforeLoad" | "waitingForLoad";
export declare type VidLetter = "a" | "b";
export declare type VidSection = {
    time: number;
    duration: number;
};
export default function sectionVids<PlaceName extends string>(placeNames: readonly PlaceName[]): {
    state: <T_ItemName extends string>(itemName: T_ItemName) => {
        stackVidId_playing: string;
        stackVidId_waiting: string;
        sectionVidState: SectionVidState;
        nowSection: {
            time: number;
            duration: number;
        };
        wantedSection: VidSection;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSection_keepProgress: boolean;
        newplayingVidStartedTime: number;
        nowSectionSeekedTime: number;
    };
    refs: () => {
        waitingForPlayToDoLoopRuleName: string;
        waitingForPlayToChangeSectionRuleName: string;
    };
    startStates: Record<PlaceName, {
        stackVidId_playing: string;
        stackVidId_waiting: string;
        sectionVidState: SectionVidState;
        nowSection: {
            time: number;
            duration: number;
        };
        wantedSection: VidSection;
        wantToLoad: boolean;
        wantToUnload: boolean;
        wantToLoop: boolean;
        switchSection_keepProgress: boolean;
        newplayingVidStartedTime: number;
        nowSectionSeekedTime: number;
    }>;
};
