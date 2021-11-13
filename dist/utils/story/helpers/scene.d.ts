import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { CameraNameByPlace, CharacterName, PlaceInfoByName, SegmentNameByPlace, SpotNameByPlace } from "../../../declarations";
export declare function makeSceneStoryHelpers<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[]): {
    lookAtSpot: <T_Place extends string>(place: T_Place, spot: any, character?: string | undefined) => void;
    hideWallIf: <T_Place_1 extends string, T_Wall extends unknown>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends string, T_Segment extends unknown>(_placeName: T_Place_2, segmentName: T_Segment, whenToRun?: "now" | "at loop") => Promise<void>;
    setCamera: <T_Place_3 extends string, T_Cam extends string>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends string>(toOption: {
        toPlace: T_PlaceName;
        toSpot: any;
        toCam?: any;
        toSegment?: any;
    }, charName?: CharacterName) => void;
};
