import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../stores/typedStoreHelpers";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, CharacterName, DollName, PlaceName, SpotNameByPlace } from "../../../declarations";
export declare function makePrendyStoryUtils<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_PlaceName extends PlaceName = PlaceName, A_CharacterName extends CharacterName = CharacterName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_DollName extends DollName = DollName>(storeHelpers: StoreHelpers, _prendyConcepts: PrendyConcepts): {
    get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
    get2DAngleFromCharacterToSpot: <T_Place extends A_PlaceName>(character: A_CharacterName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<PrendyConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
    doWhenNowCamChanges: (checkingCamName: A_AnyCameraName, callback: () => void) => string | null;
    doWhenNowSegmentChanges: (checkingSegmentName: A_AnySegmentName, callback: () => void) => string | null;
    getSegmentFromStoryRules: <T_Place_1 extends A_PlaceName, T_Cam extends A_CameraNameByPlace[T_Place_1]>(place: T_Place_1, cam: T_Cam) => any;
    getSpotPosition: <T_Place_2 extends A_PlaceName>(place: T_Place_2, spot: A_SpotNameByPlace[T_Place_2]) => any;
    getSpotRotation: <T_Place_3 extends A_PlaceName>(place: T_Place_3, spot: A_SpotNameByPlace[T_Place_3]) => any;
};
