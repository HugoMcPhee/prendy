import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { MyTypes } from "../../../declarations";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
type PlaceName = MyTypes["Types"]["PlaceName"];
export declare function loadNowVideosForPlace(): Promise<boolean>;
export declare function loadProbeImagesForPlace(placeName: PlaceName): Promise<void>;
export declare function makeCameraFromModel(theCamera: Camera, scene: Scene): TargetCamera;
export {};
