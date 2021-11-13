import { BackdopConcepFuncs } from "../concepts/typedConcepFuncs";
import { CharacterName, DollName, PlaceInfoByName } from "../declarations";
declare type SegmentNameFromCameraAndPlace<T_Place extends keyof PlaceInfoByName, T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]> = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];
export declare function makeGetUsefulStoryStuff<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): () => {
    storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
    storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
    globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
    chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
    storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
    nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
    nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
    placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
    nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
    placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
    camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
    camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
};
export declare function makeSetStoryState<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): (newState: Partial<ReturnType<ConcepFuncs["getState"]>["story"]["main"]>) => void;
export declare function makeAllStoryRuleMakers<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[]): {
    makeCamChangeRules: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: number]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: symbol]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
        }>;
    }>) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeCamLeaveRules: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: number]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: symbol]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
        }>;
    }>) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeCamSegmentRules: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => string;
        }>;
    }>) => boolean;
    makeOnInteractAtTrigger: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: number]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: symbol]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
        }>;
    }>, characterName?: CharacterName) => () => void;
    makeOnInteractToTalk: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: {
            storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
            storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
            globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
            chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
            storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
            nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
            placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
            nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
            placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
            camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
        }) => void;
    }>, characterName?: CharacterName) => () => void;
    makeOnUsePickupAtTrigger: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                    storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                    globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                    chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                    storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                    nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                    nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                    placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                    nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                    placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                    camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                    camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
                }) => void;
            }>;
            [x: number]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                    storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                    globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                    chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                    storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                    nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                    nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                    placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                    nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                    placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                    camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                    camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
                }) => void;
            }>;
            [x: symbol]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                    storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                    globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                    chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                    storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                    nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                    nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                    placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                    nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                    placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                    camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                    camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
                }) => void;
            }>;
        }>;
    }>, characterName?: CharacterName) => <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
    makeOnUsePickupGenerally: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: {
            storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
            storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
            globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
            chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
            storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
            nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
            placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
            nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
            placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
            camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
        }) => void;
    }>) => <T_PickupName_1 extends string>(pickupName: T_PickupName_1) => void;
    makeOnUsePickupToTalk: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
        }>;
    }>, characterName?: CharacterName) => <T_PickupName_2 extends string>(pickupName: T_PickupName_2) => false | undefined;
    makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: {
        storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
        storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
        globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
        chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
        storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
        nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
        nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
        placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
        nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
        placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
        camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
        camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
    }) => void, callBacksObject: Partial<{
        [x: string]: (usefulStuff: {
            storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
            storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
            globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
            chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
            storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
            nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
            placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
            nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
            placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
            camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
        }) => void;
    }>) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makePlaceNotLoadedRules: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: {
            storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
            storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
            globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
            chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
            storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
            nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
            placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
            nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
            placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
            camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
        }) => void;
    }>) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeStoryPartRules: (callBacksObject: Partial<Record<string, (usefulStuff: {
        storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
        storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
        globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
        chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
        storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
        nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
        nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
        placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
        nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
        placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
        camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
        camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
    }) => void>>) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeTouchRules: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: {
            storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
            storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
            globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
            chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
            storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
            nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
            placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
            nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
            placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
            camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
        }) => void;
    }>, options?: {
        characterName?: string | undefined;
        distanceType?: "touch" | "talk" | undefined;
        whenLeave?: boolean | undefined;
    } | undefined) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeTriggerRules: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: number]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
            [x: symbol]: (usefulStuff: {
                storyState: ReturnType<ConcepFuncs["getState"]>["story"]["main"];
                storyRefs: ReturnType<ConcepFuncs["getRefs"]>["story"]["main"];
                globalState: ReturnType<ConcepFuncs["getState"]>["global"]["main"];
                chapterName: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["chapterName"];
                storyPart: ReturnType<ConcepFuncs["getState"]>["story"]["main"]["storyPart"];
                nowSegmentName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowSegmentName"];
                nowPlaceName: ReturnType<ConcepFuncs["getState"]>["global"]["main"]["nowPlaceName"];
                placeState: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]];
                nowCamName: ReturnType<ConcepFuncs["getState"]>["places"][keyof ReturnType<ConcepFuncs["getState"]>["places"]]["nowCamName"];
                placeRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]];
                camsRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"];
                camRefs: ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"][keyof ReturnType<ConcepFuncs["getRefs"]>["places"]]["camsRefs"]];
            }) => void;
        }>;
    }>, options?: {
        characterName?: string | undefined;
        whenLeave?: boolean | undefined;
    } | undefined) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
};
export {};
