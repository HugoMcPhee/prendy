import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { AnyCameraName, PrendyAssets, CameraNameByPlace, PlaceName, SoundspotNameByPlace, SpotNameByPlace, TriggerNameByPlace, WallNameByPlace, PrendyOptions } from "../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export default function places<A_AnyCameraName extends AnyCameraName = AnyCameraName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(prendyAssets: A_PrendyAssets, prendyStartOptions: A_PrendyOptions): {
    startStates: { [K_PlaceName in A_PlaceName]: {
        toggledWalls: Record<A_WallNameByPlace[K_PlaceName], boolean>;
    }; };
    state: <K_PlaceName_1 extends A_PlaceName>(itemName: string | K_PlaceName_1) => {
        toggledWalls: Record<A_WallNameByPlace[A_PlaceName], boolean>;
    };
    refs: <K_PlaceName_2 extends A_PlaceName>(itemName: K_PlaceName_2 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: { [P_SpotName in A_SpotNameByPlace[A_PlaceName]]: Vector3; };
        spotRotations: { [P_SpotName_1 in A_SpotNameByPlace[A_PlaceName]]: Vector3; };
        soundspotSounds: { [P_SoundName in A_SoundspotNameByPlace[A_PlaceName]]: Sound | null; };
        triggerMeshes: { [P_TriggerName in A_TriggerNameByPlace[A_PlaceName]]: AbstractMesh | null; };
        wallMeshes: { [P_WallName in A_WallNameByPlace[A_PlaceName]]: AbstractMesh | null; };
        camsRefs: { [P_CameraName in A_CameraNameByPlace[A_PlaceName]]: {
            camera: TargetCamera | null;
            camCubeMeshes: AbstractMesh[];
            probeTexture: CubeTexture | null;
            isTriggerable: boolean;
        }; };
    };
};
export {};
