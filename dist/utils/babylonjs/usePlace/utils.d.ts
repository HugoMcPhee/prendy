import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { PrendyAssets, PlaceName } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function makeUsePlaceUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    loadVideoBlob: (filepath: string) => Promise<Blob>;
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
