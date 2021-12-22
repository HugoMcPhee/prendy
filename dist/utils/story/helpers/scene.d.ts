import { PrendyStoreHelpers } from "../../../concepts/typedStoreHelpers";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, CharacterName, PlaceInfoByName, PlaceName, SegmentNameByPlace, SpotNameByPlace, WallNameByPlace } from "../../../declarations";
export declare function makeSceneStoryHelpers<StoreHelpers extends PrendyStoreHelpers, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(storeHelpers: StoreHelpers, placeInfoByName: A_PlaceInfoByName, characterNames: readonly A_CharacterName[]): {
    lookAtSpot: <T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place], character?: A_CharacterName | undefined) => void;
    hideWallIf: <T_Place_1 extends A_PlaceName, T_Wall extends A_WallNameByPlace[T_Place_1]>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends A_PlaceName, T_Segment extends A_SegmentNameByPlace[T_Place_2]>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
    setCamera: <T_Place_3 extends A_PlaceName, T_Cam extends keyof A_PlaceInfoByName[T_Place_3]["segmentTimesByCamera"] & A_AnyCameraName>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends A_PlaceName>(toOption: {
        toPlace: T_PlaceName;
        toSpot: A_SpotNameByPlace[T_PlaceName];
        toCam?: A_CameraNameByPlace[T_PlaceName] | undefined;
        toSegment?: A_SegmentNameByPlace[T_PlaceName] | undefined;
    }, charName?: A_CharacterName) => void;
};
