import { MyTypes } from "../../declarations";
export declare function get_cameraChangeUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    getSafeCamName: {
        (cam: T_MyTypes["Main"]["AnyCameraName"]): T_MyTypes["Main"]["AnyCameraName"];
        (cam: null): null;
    };
    getSafeSegmentName: <T_PlaceName extends T_MyTypes["Main"]["PlaceName"], T_CameraName extends T_MyTypes["Main"]["AnyCameraName"], T_SegmentName extends T_MyTypes["Main"]["AnySegmentName"]>({ cam, place, segment, useStorySegmentRules, }: {
        place: T_PlaceName;
        cam: T_CameraName;
        segment: T_SegmentName;
        useStorySegmentRules?: boolean | undefined;
    }) => any;
    updateTexturesForNowCamera: (newCameraName: T_MyTypes["Main"]["AnyCameraName"], didChangePlace?: boolean) => void;
    updateNowStuffWhenSliceChanged: () => void;
};
