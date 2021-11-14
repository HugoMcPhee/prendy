import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { AnyCameraName, BackdopArt, CameraNameByPlace, PlaceName, SoundspotNameByPlace, SpotNameByPlace, TriggerNameByPlace, WallNameByPlace } from "../../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export declare type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export default function places<A_PlaceName extends PlaceName = PlaceName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_BackdopArt extends BackdopArt = BackdopArt, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(backdopArt: A_BackdopArt): {
    startStates: { [P_PlaceName in A_PlaceName]: {
        wantedCamNameAtLoop: A_CameraNameByPlace[P_PlaceName] | null;
        wantedCamName: A_CameraNameByPlace[P_PlaceName] | null;
        nowCamName: A_CameraNameByPlace[P_PlaceName];
    }; };
    state: <K_PlaceName extends A_PlaceName>(itemName: string | K_PlaceName) => {
        wantedCamWhenNextPlaceLoads: A_CameraNameByPlace[A_PlaceName] | null;
        nextCamNameWhenVidPlays: A_CameraNameByPlace[A_PlaceName] | null;
        wantedCamNameAtLoop: A_CameraNameByPlace[A_PlaceName] | null;
        wantedCamName: A_CameraNameByPlace[A_PlaceName] | null;
        nowCamName: A_AnyCameraName;
    };
    refs: <K_PlaceName_1 extends A_PlaceName>(itemName: K_PlaceName_1 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: { [P_SpotName in A_SpotNameByPlace[A_PlaceName]]: Vector3; };
        spotRotations: { [P_SpotName_1 in A_SpotNameByPlace[A_PlaceName]]: Vector3; };
        soundspotSounds: { [P_SoundName in A_SoundspotNameByPlace[A_PlaceName]]: Sound | null; };
        triggerMeshes: { [P_TriggerName in A_TriggerNameByPlace[A_PlaceName]]: AbstractMesh | null; };
        wallMeshes: { [P_TriggerName_1 in A_WallNameByPlace[A_PlaceName]]: AbstractMesh | null; };
        camsRefs: { [P_CameraName in A_CameraNameByPlace[A_PlaceName]]: {
            camera: TargetCamera | null;
            camCubeMeshes: AbstractMesh[];
            probeTexture: CubeTexture | null;
            isTriggerable: boolean;
        }; };
    };
};
export {};
