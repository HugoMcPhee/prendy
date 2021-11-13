import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { BackdopArt, CameraNameByPlace, PlaceName, SoundspotNameByPlace, SpotNameByPlace, TriggerNameByPlace, WallNameByPlace } from "../../declarations";
declare const defaultCamRefs: () => {
    camera: TargetCamera | null;
    camCubeMeshes: AbstractMesh[];
    probeTexture: CubeTexture | null;
    isTriggerable: boolean;
};
export declare type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
declare type MaybeCam<T_PlaceName extends PlaceName> = null | CameraNameByPlace[T_PlaceName];
declare type SpotPositions<T_PlaceName extends PlaceName> = {
    [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
};
declare type SpotRotations<T_PlaceName extends PlaceName> = {
    [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
};
declare type SoundspotSounds<T_PlaceName extends PlaceName> = {
    [P_SoundName in SoundspotNameByPlace[T_PlaceName]]: Sound | null;
};
declare type TriggerMeshes<T_PlaceName extends PlaceName> = {
    [P_TriggerName in TriggerNameByPlace[T_PlaceName]]: AbstractMesh | null;
};
declare type WallMeshes<T_PlaceName extends PlaceName> = {
    [P_TriggerName in WallNameByPlace[T_PlaceName]]: AbstractMesh | null;
};
declare type CameraRefs<T_PlaceName extends PlaceName> = {
    [P_CameraName in CameraNameByPlace[T_PlaceName]]: ReturnType<typeof defaultCamRefs>;
};
declare type PlaceRefs<T_PlaceName extends PlaceName> = {
    rootMesh: null | AbstractMesh;
    spotPositions: SpotPositions<T_PlaceName>;
    spotRotations: SpotRotations<T_PlaceName>;
    soundspotSounds: SoundspotSounds<T_PlaceName>;
    triggerMeshes: TriggerMeshes<T_PlaceName>;
    wallMeshes: WallMeshes<T_PlaceName>;
    camsRefs: CameraRefs<T_PlaceName>;
};
declare type PlaceState<T_PlaceName extends PlaceName> = {
    wantedCamNameAtLoop: MaybeCam<T_PlaceName>;
    wantedCamName: MaybeCam<T_PlaceName>;
    nowCamName: CameraNameByPlace[T_PlaceName];
};
export default function places(backdopArt: BackdopArt): {
    startStates: {
        [x: string]: PlaceState<string>;
    };
    state: <T_PlaceName extends string>(itemName: string | T_PlaceName) => {
        wantedCamWhenNextPlaceLoads: any;
        nextCamNameWhenVidPlays: any;
        wantedCamNameAtLoop: any;
        wantedCamName: any;
        nowCamName: string;
    };
    refs: <T_PlaceName_1 extends string>(itemName: T_PlaceName_1 & string) => PlaceRefs<PlaceName>;
};
export {};
