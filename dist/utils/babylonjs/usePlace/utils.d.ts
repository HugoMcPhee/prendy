import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { PrendyConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { PrendyArt, PlaceName } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function makeUsePlaceUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyArt: PrendyArt): {
    loadVideoBlob: (filepath: string) => Promise<Blob>;
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
