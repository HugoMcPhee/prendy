import {
  AbstractMesh,
  CubeTexture,
  Sound,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import {
  AnyCameraName,
  BackdopArt,
  CameraNameByPlace,
  PlaceName,
  SoundspotNameByPlace,
  SpotNameByPlace,
  TriggerNameByPlace,
  WallNameByPlace,
} from "../../declarations";

const defaultCamRefs = () => ({
  camera: null as null | TargetCamera,
  camCubeMeshes: [] as AbstractMesh[],
  //
  probeTexture: null as null | CubeTexture,
  //
  isTriggerable: true,
});

export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;

// export

export default function places<
  A_PlaceName extends PlaceName = PlaceName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_BackdopArt extends BackdopArt = BackdopArt,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(backdopArt: A_BackdopArt) {
  const { placeInfoByName } = backdopArt;
  const placeNames = backdopArt.placeNames as A_PlaceName[];

  type MaybeCam<T_PlaceName extends A_PlaceName> =
    | null
    | A_CameraNameByPlace[T_PlaceName];

  type SpotPositions<T_PlaceName extends A_PlaceName> = {
    [P_SpotName in A_SpotNameByPlace[T_PlaceName]]: Vector3;
  };
  type SpotRotations<T_PlaceName extends A_PlaceName> = {
    [P_SpotName in A_SpotNameByPlace[T_PlaceName]]: Vector3;
  };
  type SoundspotSounds<T_PlaceName extends A_PlaceName> = {
    [P_SoundName in A_SoundspotNameByPlace[T_PlaceName]]: Sound | null;
  };
  type TriggerMeshes<T_PlaceName extends A_PlaceName> = {
    [P_TriggerName in A_TriggerNameByPlace[T_PlaceName]]: AbstractMesh | null;
  };
  type WallMeshes<T_PlaceName extends A_PlaceName> = {
    [P_TriggerName in A_WallNameByPlace[T_PlaceName]]: AbstractMesh | null;
  };
  type CameraRefs<T_PlaceName extends A_PlaceName> = {
    [P_CameraName in A_CameraNameByPlace[T_PlaceName]]: ReturnType<
      typeof defaultCamRefs
    >;
  };

  type PlaceState<K_PlaceName extends A_PlaceName> = {
    wantedCamNameAtLoop: MaybeCam<K_PlaceName>;
    wantedCamName: MaybeCam<K_PlaceName>;
    nowCamName: A_CameraNameByPlace[K_PlaceName];
  };

  // State
  const state = <K_PlaceName extends A_PlaceName>(placeName: K_PlaceName) => {
    return {
      wantedCamWhenNextPlaceLoads: null as MaybeCam<K_PlaceName>,
      nextCamNameWhenVidPlays: null as MaybeCam<K_PlaceName>, // near the start of a frame, when the section vid has finished changing, this is used as the new nowCamName
      wantedCamNameAtLoop: null as MaybeCam<K_PlaceName>,
      wantedCamName: null as MaybeCam<K_PlaceName>,
      nowCamName:
        (((placeInfoByName as any)?.[placeName as any]
          ?.cameraNames?.[0] as unknown) as A_AnyCameraName) ??
        ("testItemCamName" as A_AnyCameraName), // if state() is called with a random itemName
    };
  };

  type PlaceRefs<K_PlaceName extends A_PlaceName> = {
    rootMesh: null | AbstractMesh;
    spotPositions: SpotPositions<K_PlaceName>;
    spotRotations: SpotRotations<K_PlaceName>;
    soundspotSounds: SoundspotSounds<K_PlaceName>;
    triggerMeshes: TriggerMeshes<K_PlaceName>;
    wallMeshes: WallMeshes<K_PlaceName>;
    camsRefs: CameraRefs<K_PlaceName>;
  };

  // Refs
  function refs<K_PlaceName extends A_PlaceName>(
    placeName: K_PlaceName
  ): PlaceRefs<K_PlaceName> {
    const {
      spotNames,
      soundspotNames,
      triggerNames,
      wallNames,
      cameraNames,
    } = placeInfoByName[placeName];

    const spotPositions: Partial<SpotPositions<K_PlaceName>> = {};
    const spotRotations: Partial<SpotRotations<K_PlaceName>> = {};
    const soundspotSounds: Partial<SoundspotSounds<K_PlaceName>> = {};
    const triggerMeshes: Partial<TriggerMeshes<K_PlaceName>> = {};
    const wallMeshes: Partial<WallMeshes<K_PlaceName>> = {};
    const camsRefs: Partial<CameraRefs<K_PlaceName>> = {};

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
    } as PlaceRefs<K_PlaceName>;
  }

  type StartRefs = {
    [P_PlaceName in A_PlaceName]: PlaceRefs<P_PlaceName>;
  };

  type StartStates = {
    [P_PlaceName in A_PlaceName]: PlaceState<P_PlaceName>;
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

  as <A_PlaceName extends A_PlaceName>(
  itemName: A_PlaceName | string
) => PlaceRefs<A_PlaceName>

*/

  return {
    startStates: startStates as StartStates,
    state: state as <K_PlaceName extends A_PlaceName>(
      itemName: K_PlaceName | string
    ) => ReturnType<typeof state>,
    refs: refs as <K_PlaceName extends A_PlaceName>(
      itemName: K_PlaceName & string
    ) => PlaceRefs<A_PlaceName>, // TODO change to PlaceRefs<K_PlaceName> when ReturnType is generic
  };
}
