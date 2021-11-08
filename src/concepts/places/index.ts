import {
  TargetCamera,
  AbstractMesh,
  Vector3,
  Sound,
  CubeTexture,
} from "@babylonjs/core";

import { forEach } from "shutils/dist/loops";
import { PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";

const defaultCamRefs = () => ({
  camera: null as null | TargetCamera,
  camCubeMeshes: [] as AbstractMesh[],
  //
  probeTexture: null as null | CubeTexture,
  //
  isTriggerable: true,
});

export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;

export default function places<
  PlaceName extends string,
  AnyCameraName extends string,
  TriggerNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>,
  SoundspotNameByPlace extends Record<PlaceName, string>,
  WallNameByPlace extends Record<PlaceName, string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>
>(placeNames: readonly PlaceName[], placeInfoByName: PlaceInfoByName) {
  type MaybeCam<T_PlaceName extends PlaceName> =
    | null
    | CameraNameByPlace[T_PlaceName];

  // State
  const state = <T_PlaceName extends PlaceName>(placeName: T_PlaceName) => {
    return {
      wantedCamWhenNextPlaceLoads: null as MaybeCam<T_PlaceName>,
      nextCamNameWhenVidPlays: null as MaybeCam<T_PlaceName>, // near the start of a frame, when the section vid has finished changing, this is used as the new nowCamName
      wantedCamNameAtLoop: null as MaybeCam<T_PlaceName>,
      wantedCamName: null as MaybeCam<T_PlaceName>,
      nowCamName:
        (((placeInfoByName as any)?.[placeName as any]
          ?.cameraNames?.[0] as unknown) as AnyCameraName) ??
        ("testItemCamName" as AnyCameraName), // if state() is called with a random itemName
    };
  };

  type SpotPositions<T_PlaceName extends PlaceName> = {
    [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
  };
  type SpotRotations<T_PlaceName extends PlaceName> = {
    [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
  };
  type SoundspotSounds<T_PlaceName extends PlaceName> = {
    [P_SoundName in SoundspotNameByPlace[T_PlaceName]]: Sound | null;
  };
  type TriggerMeshes<T_PlaceName extends PlaceName> = {
    [P_TriggerName in TriggerNameByPlace[T_PlaceName]]: AbstractMesh | null;
  };
  type WallMeshes<T_PlaceName extends PlaceName> = {
    [P_TriggerName in WallNameByPlace[T_PlaceName]]: AbstractMesh | null;
  };
  type CameraRefs<T_PlaceName extends PlaceName> = {
    [P_CameraName in CameraNameByPlace[T_PlaceName]]: ReturnType<
      typeof defaultCamRefs
    >;
  };

  type PlaceRefs<T_PlaceName extends PlaceName> = {
    rootMesh: null | AbstractMesh;
    spotPositions: SpotPositions<T_PlaceName>;
    spotRotations: SpotRotations<T_PlaceName>;
    soundspotSounds: SoundspotSounds<T_PlaceName>;
    triggerMeshes: TriggerMeshes<T_PlaceName>;
    wallMeshes: WallMeshes<T_PlaceName>;
    camsRefs: CameraRefs<T_PlaceName>;
  };

  // export
  type PlaceState<T_PlaceName extends PlaceName> = {
    wantedCamNameAtLoop: MaybeCam<T_PlaceName>;
    wantedCamName: MaybeCam<T_PlaceName>;
    nowCamName: CameraNameByPlace[T_PlaceName];
  };

  // Refs
  function refs<T_PlaceName extends PlaceName>(
    placeName: T_PlaceName
  ): PlaceRefs<T_PlaceName> {
    const {
      spotNames,
      soundspotNames,
      triggerNames,
      wallNames,
      cameraNames,
    } = placeInfoByName[placeName];

    const spotPositions: Partial<SpotPositions<T_PlaceName>> = {};
    const spotRotations: Partial<SpotRotations<T_PlaceName>> = {};
    const soundspotSounds: Partial<SoundspotSounds<T_PlaceName>> = {};
    const triggerMeshes: Partial<TriggerMeshes<T_PlaceName>> = {};
    const wallMeshes: Partial<WallMeshes<T_PlaceName>> = {};
    const camsRefs: Partial<CameraRefs<T_PlaceName>> = {};

    forEach(spotNames, (spotName) => {
      // https://stackoverflow.com/questions/42273853/in-typescript-what-is-the-exclamation-mark-bang-operator-when-dereferenci
      // spotPositions[loopedPlaceName]![loopedSpotName] = new Vector3(0, 0, 0);
      spotPositions[spotName as keyof typeof spotPositions] = new Vector3();
      spotRotations[spotName as keyof typeof spotRotations] = new Vector3();
    });
    forEach(soundspotNames, (soundspotName) => {
      soundspotSounds[soundspotName as keyof typeof soundspotSounds] = null;
    });
    forEach(triggerNames, (triggerName) => {
      triggerMeshes[triggerName as keyof typeof triggerMeshes] = null;
    });
    forEach(wallNames, (wallName) => {
      wallMeshes[wallName as keyof typeof wallMeshes] = null;
    });
    forEach(cameraNames, (camName) => {
      camsRefs[camName as keyof typeof camsRefs] = defaultCamRefs();
    });

    return {
      rootMesh: null as null | AbstractMesh,
      spotPositions,
      spotRotations,
      soundspotSounds,
      triggerMeshes,
      wallMeshes,
      camsRefs,
      backdropVid: null as null | HTMLVideoElement,
    } as PlaceRefs<T_PlaceName>;
  }

  type StartRefs = {
    [P_PlaceName in PlaceName]: PlaceRefs<P_PlaceName>;
  };

  type StartStates = {
    [P_PlaceName in PlaceName]: PlaceState<P_PlaceName>;
  };

  // const startStates: InitialItemsState<typeof state> = {
  const startRefs: Partial<StartRefs> = {};
  forEach(placeNames, (placeName) => {
    startRefs[placeName] = refs(placeName);
  });
  const startStates: Partial<StartStates> = {};

  forEach(placeNames, (placeName) => {
    (startStates[placeName] as any) = state(placeName);
  });

  /*

  as <T_PlaceName extends PlaceName>(
  itemName: T_PlaceName | string
) => PlaceRefs<T_PlaceName>

*/

  return {
    startStates: startStates as StartStates,
    state: state as <T_PlaceName extends PlaceName>(
      itemName: T_PlaceName | string
    ) => ReturnType<typeof state>,
    refs: refs as <T_PlaceName extends PlaceName>(
      itemName: T_PlaceName & string
    ) => PlaceRefs<PlaceName>, // TODO change to PlaceRefs<T_PlaceName> when ReturnType is generic
  };
}
