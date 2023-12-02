import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { MyTypes } from "../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export default function places<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    startStates: { [K_PlaceName in T_MyTypes["Types"]["PlaceName"]]: {
        toggledWalls: Record<T_MyTypes["Types"]["WallNameByPlace"][K_PlaceName], boolean>;
    }; };
    state: <K_PlaceName_1 extends T_MyTypes["Types"]["PlaceName"]>(itemName: string | K_PlaceName_1) => {
        toggledWalls: Record<T_MyTypes["Types"]["WallNameByPlace"][T_MyTypes["Types"]["PlaceName"]], boolean>;
    };
    refs: <K_PlaceName_2 extends T_MyTypes["Types"]["PlaceName"]>(itemName: K_PlaceName_2 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: { [P_SpotName in T_MyTypes["Types"]["SpotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: Vector3; };
        spotRotations: { [P_SpotName_1 in T_MyTypes["Types"]["SpotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: Vector3; };
        soundspotSounds: { [P_SoundName in T_MyTypes["Types"]["SoundspotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: Sound | null; };
        triggerMeshes: { [P_TriggerName in T_MyTypes["Types"]["TriggerNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: AbstractMesh | null; };
        wallMeshes: { [P_WallName in T_MyTypes["Types"]["WallNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: AbstractMesh | null; };
        camsRefs: { [P_CameraName in T_MyTypes["Types"]["CameraNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: {
            camera: TargetCamera | null;
            camCubeMeshes: AbstractMesh[];
            probeTexture: CubeTexture | null;
            isTriggerable: boolean;
        }; };
    };
};
export {};
