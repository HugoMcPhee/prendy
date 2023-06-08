import { CharacterName, PlaceInfoByName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
export declare function get_sceneStoryHelpers(storeHelpers: PrendyStoreHelpers, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[]): {
    lookAtSpot: <T_Place extends string>(place: T_Place, spot: string, character?: CharacterName) => void;
    hideWallIf: <T_Place_1 extends string, T_Wall extends string>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends string, T_Segment extends string>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
    setCamera: <T_Place_3 extends string, T_Cam extends string>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends string>(toOption: {
        toPlace: T_PlaceName;
        toSpot: string;
        toCam?: string | undefined;
        toSegment?: string | undefined;
    }, charName?: CharacterName) => void;
};
