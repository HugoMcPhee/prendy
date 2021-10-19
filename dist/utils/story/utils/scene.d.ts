import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeSceneStoryUtils<ConcepFuncs extends BackdopConcepFuncs, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CameraNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs): {
    getSegmentFromStoryRules: <T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: AnySegmentName, callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: AnyCameraName, callback: () => void) => string | null;
};
