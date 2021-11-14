import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { AnyCameraName, AnySegmentName } from "../../../declarations";
export declare function makeSceneStoryUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    getSegmentFromStoryRules: <T_Place extends string, T_Cam extends string>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: AnySegmentName, callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: AnyCameraName, callback: () => void) => string | null;
};
