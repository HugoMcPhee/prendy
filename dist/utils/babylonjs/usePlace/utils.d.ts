import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { BackdopArt, PlaceName } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function makeUsePlaceUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopArt: BackdopArt): {
    loadVideoBlob: (filepath: string) => Promise<Blob>;
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
