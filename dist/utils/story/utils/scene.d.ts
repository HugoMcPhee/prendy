import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeSceneStoryUtils<ConceptoFuncs extends GameyConceptoFuncs, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CameraNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs): {
    getSegmentFromStoryRules: <T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: AnySegmentName, callback: () => void) => string;
    doWhenNowCamChanges: (checkingCamName: AnyCameraName, callback: () => void) => string;
};
