import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { MyTypes } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function get_usePlaceUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
