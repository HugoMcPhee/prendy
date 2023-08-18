import { Point3D } from "chootils/dist/points3d";
import { MyTypes } from "../../declarations";
export declare function get_sceneStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    lookAtSpot: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place], character?: T_MyTypes["Main"]["CharacterName"] | undefined) => void;
    hideWallIf: <T_Place_1 extends T_MyTypes["Main"]["PlaceName"], T_Wall extends T_MyTypes["Main"]["WallNameByPlace"][T_Place_1]>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setSegment: <T_Place_2 extends T_MyTypes["Main"]["PlaceName"], T_Segment extends T_MyTypes["Main"]["SegmentNameByPlace"][T_Place_2]>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
    setCamera: <T_Place_3 extends T_MyTypes["Main"]["PlaceName"], T_Cam extends keyof T_MyTypes["Main"]["PlaceInfoByName"][T_Place_3]["segmentTimesByCamera"] & T_MyTypes["Main"]["AnyCameraName"]>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    goToNewPlace: <T_PlaceName extends T_MyTypes["Main"]["PlaceName"]>(toOption: {
        toPlace: T_PlaceName;
        toSpot?: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName] | undefined;
        toPositon?: Point3D | undefined;
        toCam?: T_MyTypes["Main"]["CameraNameByPlace"][T_PlaceName] | undefined;
        toSegment?: T_MyTypes["Main"]["SegmentNameByPlace"][T_PlaceName] | undefined;
    }, charName?: T_MyTypes["Main"]["CharacterName"]) => void;
};
