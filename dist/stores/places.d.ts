import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { PrendyAssets, PlaceName, PrendyOptions } from "../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export declare type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export default function places(prendyAssets: PrendyAssets, prendyStartOptions: PrendyOptions): {
    startStates: {
        [x: string]: {
            toggledWalls: Record<string, boolean>;
        };
    };
    state: <K_PlaceName extends string>(itemName: string | K_PlaceName) => {
        toggledWalls: Record<string, boolean>;
    };
    refs: <K_PlaceName_1 extends string>(itemName: K_PlaceName_1 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: {
            [x: string]: Vector3;
        };
        spotRotations: {
            [x: string]: Vector3;
        };
        soundspotSounds: {
            [x: string]: Sound | null;
        };
        triggerMeshes: {
            [x: string]: AbstractMesh | null;
        };
        wallMeshes: {
            [x: string]: AbstractMesh | null;
        };
        camsRefs: {
            [x: string]: {
                camera: TargetCamera | null;
                camCubeMeshes: AbstractMesh[];
                probeTexture: CubeTexture | null;
                isTriggerable: boolean;
            };
        };
    };
};
export {};
