import { CharacterName, PlaceInfoByName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
import { Point3D } from "chootils/dist/points3d";
export declare function get_sceneStoryHelpers(storeHelpers: PrendyStoreHelpers, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[]): {
    lookAtSpot: <T_Place extends string>(place: T_Place, spot: string, character?: CharacterName) => void;
    hideWallIf: <T_Place_1 extends string, T_Wall extends string>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends string, T_Segment extends string>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
    setCamera: <T_Place_3 extends string, T_Cam extends string>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends string>(toOption: {
        toPlace: T_PlaceName;
        toSpot?: string | undefined;
        toPositon?: Point3D | undefined;
        toCam?: string | undefined;
        toSegment?: string | undefined;
    }, charName?: CharacterName) => void;
};
