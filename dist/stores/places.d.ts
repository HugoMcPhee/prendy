import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { MyTypes } from "../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export default function places<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"]): {
    startStates: { [K_PlaceName in T_MyTypes["Main"]["PlaceName"]]: {
        toggledWalls: Record<T_MyTypes["Main"]["WallNameByPlace"][K_PlaceName], boolean>;
    }; };
    state: <K_PlaceName_1 extends T_MyTypes["Main"]["PlaceName"]>(itemName: string | K_PlaceName_1) => {
        toggledWalls: Record<T_MyTypes["Main"]["WallNameByPlace"][T_MyTypes["Main"]["PlaceName"]], boolean>;
    };
    refs: <K_PlaceName_2 extends T_MyTypes["Main"]["PlaceName"]>(itemName: K_PlaceName_2 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: { [P_SpotName in T_MyTypes["Main"]["SpotNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: Vector3; };
        spotRotations: { [P_SpotName_1 in T_MyTypes["Main"]["SpotNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: Vector3; };
        soundspotSounds: { [P_SoundName in T_MyTypes["Main"]["SoundspotNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: Sound | null; };
        triggerMeshes: { [P_TriggerName in T_MyTypes["Main"]["TriggerNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: AbstractMesh | null; };
        wallMeshes: { [P_WallName in T_MyTypes["Main"]["WallNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: AbstractMesh | null; };
        camsRefs: { [P_CameraName in T_MyTypes["Main"]["CameraNameByPlace"][T_MyTypes["Main"]["PlaceName"]]]: {
            camera: TargetCamera | null;
            camCubeMeshes: AbstractMesh[];
            probeTexture: CubeTexture | null;
            isTriggerable: boolean;
        }; };
    };
};
export {};
