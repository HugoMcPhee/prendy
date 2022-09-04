import { AnyCameraName, PrendyAssets } from "../../declarations";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function makeTyped_cameraChangeUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    getSafeCamName: {
        (cam: AnyCameraName): AnyCameraName;
        (cam: null): null;
    };
    getSafeSegmentName: <T_PlaceName extends string, T_CameraName extends string, T_SegmentName extends string>({ cam, place, segment, useStorySegmentRules, }: {
        place: T_PlaceName;
        cam: T_CameraName;
        segment: T_SegmentName;
        useStorySegmentRules?: boolean | undefined;
    }) => any;
    updateTexturesForNowCamera: (newCameraName: AnyCameraName, didChangePlace?: boolean) => void;
    updateNowStuffWhenSectionChanged: () => void;
};
