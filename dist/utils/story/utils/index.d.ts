import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeBackdopStoryUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, DollName extends string, PlaceName extends string, CharacterName extends string, AnyCameraName extends string, AnySegmentName extends string, CameraNameByPlace extends Record<PlaceName, string>, SpotNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    get2DAngleBetweenCharacters: (charA: CharacterName, charB: CharacterName) => number;
    get2DAngleFromCharacterToSpot: <T_Place extends PlaceName>(character: CharacterName, place: T_Place, spot: SpotNameByPlace[T_Place]) => number;
    getModelNameFromDoll: <T_DollName extends DollName>(dollName: T_DollName) => any;
    doWhenNowCamChanges: (checkingCamName: AnyCameraName, callback: () => void) => string;
    doWhenNowSegmentChanges: (checkingSegmentName: AnySegmentName, callback: () => void) => string;
    getSegmentFromStoryRules: <T_Place_1 extends PlaceName, T_Cam extends CameraNameByPlace[T_Place_1]>(place: T_Place_1, cam: T_Cam) => any;
    getSpotPosition: <T_Place_2 extends PlaceName>(place: T_Place_2, spot: SpotNameByPlace[T_Place_2]) => any;
    getSpotRotation: <T_Place_3 extends PlaceName>(place: T_Place_3, spot: SpotNameByPlace[T_Place_3]) => any;
};
