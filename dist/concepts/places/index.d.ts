import { TargetCamera, AbstractMesh, Vector3, Sound, CubeTexture } from "@babylonjs/core";
import { PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export default function places<PlaceName extends string, AnyCameraName extends string, TriggerNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SoundspotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SpotNameByPlace extends Record<PlaceName, string>, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(placeNames: readonly PlaceName[], placeInfoByName: PlaceInfoByName): {
    startStates: { [P_PlaceName in PlaceName]: {
        wantedCamNameAtLoop: CameraNameByPlace[P_PlaceName];
        wantedCamName: CameraNameByPlace[P_PlaceName];
        nowCamName: CameraNameByPlace[P_PlaceName];
    }; };
    state: <T_PlaceName extends PlaceName>(itemName: string | T_PlaceName) => {
        wantedCamWhenNextPlaceLoads: CameraNameByPlace[PlaceName];
        nextCamNameWhenVidPlays: CameraNameByPlace[PlaceName];
        wantedCamNameAtLoop: CameraNameByPlace[PlaceName];
        wantedCamName: CameraNameByPlace[PlaceName];
        nowCamName: AnyCameraName;
    };
    refs: <T_PlaceName_1 extends PlaceName>(itemName: T_PlaceName_1 & string) => {
        rootMesh: null | AbstractMesh;
        spotPositions: { [P_SpotName in SpotNameByPlace[PlaceName]]: Vector3; };
        spotRotations: { [P_SpotName_1 in SpotNameByPlace[PlaceName]]: Vector3; };
        soundspotSounds: { [P_SoundName in SoundspotNameByPlace[PlaceName]]: Sound; };
        triggerMeshes: { [P_TriggerName in TriggerNameByPlace[PlaceName]]: AbstractMesh; };
        wallMeshes: { [P_TriggerName_1 in WallNameByPlace[PlaceName]]: AbstractMesh; };
        camsRefs: { [P_CameraName in CameraNameByPlace[PlaceName]]: {
            camera: TargetCamera;
            camCubeMeshes: AbstractMesh[];
            probeTexture: CubeTexture;
            isTriggerable: boolean;
        }; };
    };
};
