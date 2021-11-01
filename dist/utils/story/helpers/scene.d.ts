import { BackdopConcepFuncs, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makeSceneStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[]): {
    lookAtSpot: <T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place], character?: CharacterName | undefined) => void;
    hideWallIf: <T_Place_1 extends PlaceName, T_Wall extends WallNameByPlace[T_Place_1]>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends PlaceName, T_Segment extends SegmentNameByPlace[T_Place_2]>(_placeName: T_Place_2, segmentName: T_Segment, whenToRun?: "now" | "at loop") => Promise<void>;
    setCamera: <T_Place_3 extends PlaceName, T_Cam extends keyof PlaceInfoByName[T_Place_3]["segmentTimesByCamera"] & AnyCameraName>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends PlaceName>(toOption: {
        toPlace: T_PlaceName;
        toSpot: SpotNameByPlace[T_PlaceName];
        toCam?: CameraNameByPlace[T_PlaceName] | undefined;
        toSegment?: SegmentNameByPlace[T_PlaceName] | undefined;
    }, charName?: CharacterName) => void;
};
