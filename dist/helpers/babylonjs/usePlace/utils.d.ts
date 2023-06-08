import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function get_usePlaceUtils(storeHelpers: PrendyStoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
