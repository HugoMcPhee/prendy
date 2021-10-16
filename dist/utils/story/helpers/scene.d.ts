import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConceptoFuncs";
export declare function makeSceneStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[]): {
    changeSegmentAtLoop: <T_Place extends PlaceName, T_Segment extends SegmentNameByPlace[T_Place] & AnySegmentName>(_place: T_Place, newSegmentName: T_Segment) => Promise<void>;
    changeCameraAtLoop: <T_Place_1 extends PlaceName, T_Cam extends keyof PlaceInfoByName[T_Place_1]["segmentTimesByCamera"] & AnyCameraName>(_place: T_Place_1, newCamName: T_Cam) => Promise<void>;
    lookAtSpot: <T_Place_2 extends PlaceName>(place: T_Place_2, spot: SpotNameByPlace[T_Place_2], character?: CharacterName) => void;
    hideWallIf: <T_Place_3 extends PlaceName, T_Wall extends WallNameByPlace[T_Place_3]>(placeName: T_Place_3, wallName: T_Wall, isDisabled: boolean) => void;
    setNextSegment: <T_Place_4 extends PlaceName, T_Segment_1 extends SegmentNameByPlace[T_Place_4]>(_placeName: T_Place_4, segmentName: T_Segment_1) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setCamera: <T_Place_5 extends PlaceName, T_Cam_1 extends keyof PlaceInfoByName[T_Place_5]["segmentTimesByCamera"] & AnyCameraName>(_place: T_Place_5, newCam: T_Cam_1) => void;
    goToNewPlace: <T_PlaceName extends PlaceName>(toOption: {
        toPlace: T_PlaceName;
        toSpot: SpotNameByPlace[T_PlaceName];
        toCam?: CameraNameByPlace[T_PlaceName];
        toSegment?: SegmentNameByPlace[T_PlaceName];
    }, charName?: CharacterName) => void;
};
