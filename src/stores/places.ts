import { AbstractMesh, CubeTexture, Sound, TargetCamera, Vector3 } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";
import {
  PlaceName,
  CameraNameByPlace,
  WallNameByPlace,
  SpotPositions,
  SpotRotations,
  SoundspotSounds,
  TriggerMeshes,
  WallMeshes,
} from "../types";

const defaultCamRefs = () => ({
  camera: null as null | TargetCamera,
  camCubeMeshes: [] as AbstractMesh[],
  //
  probeTexture: null as null | CubeTexture,
  //
  isTriggerable: true,
});

export type DefaultCameraRefs = ReturnType<typeof defaultCamRefs>;
export type CameraRefs<T_PlaceName extends PlaceName> = {
  [P_CameraName in CameraNameByPlace[T_PlaceName]]: ReturnType<typeof defaultCamRefs>;
};

export default function places<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { placeInfoByName } = prendyAssets;
  const placeNames = prendyAssets.placeNames as PlaceName[];

  function makeToggledWallsState<K_PlaceName extends PlaceName>(placeName: K_PlaceName) {
    const placeInfo = placeInfoByName[placeName];
    const { wallNames } = placeInfo;
    const wallsEnabled = {} as Record<any, any>;
    forEach(wallNames as WallNameByPlace[K_PlaceName][], (wallName) => (wallsEnabled[wallName] = true));

    return wallsEnabled as Record<WallNameByPlace[K_PlaceName], boolean>;
  }

  // State
  const state = <K_PlaceName extends PlaceName>(placeName: K_PlaceName) => ({
    toggledWalls: makeToggledWallsState(placeName),
    // testState: 0,
    // goalCamWhenNextPlaceLoads: null as MaybeCam<K_PlaceName>,
    // goalCamNameWhenVidPlays: null as MaybeCam<K_PlaceName>, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowCamName
    // goalCamNameAtLoop: null as MaybeCam<K_PlaceName>,
    // goalCamName: null as MaybeCam<K_PlaceName>, // NOTE always set goalCamName? and never nowCamName? to prepare everything first?
    // nowCamName:
    //   ((prendyOptions.place === placeName ? prendyOptions.camera : "") ||
    //     ((placeInfoByName as any)?.[placeName as any]?.cameraNames?.[0] as unknown as AnyCameraName)) ??
    //   ("testItemCamName" as AnyCameraName), // if state() is called with a random itemName
  });
  type PlaceRefs<K_PlaceName extends PlaceName> = {
    rootMesh: null | AbstractMesh;
    spotPositions: SpotPositions<K_PlaceName>;
    spotRotations: SpotRotations<K_PlaceName>;
    soundspotSounds: SoundspotSounds<K_PlaceName>;
    triggerMeshes: TriggerMeshes<K_PlaceName>;
    wallMeshes: WallMeshes<K_PlaceName>;
    camsRefs: CameraRefs<K_PlaceName>;
  };

  // Refs
  function refs<K_PlaceName extends PlaceName>(placeName: K_PlaceName): PlaceRefs<K_PlaceName> {
    const { spotNames, soundspotNames, triggerNames, wallNames, cameraNames } = placeInfoByName[placeName];

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
    [P_PlaceName in PlaceName]: PlaceRefs<P_PlaceName>;
  };

  type StartStates = {
    [K_PlaceName in PlaceName]: ReturnType<typeof state<K_PlaceName>>;
  };

  function makeAutmaticPlaceStartStates() {
    const partialDollStates = {} as Partial<StartStates>;
    forEach(placeNames, (placeName) => {
      partialDollStates[placeName] = state(placeName);
    });
    return partialDollStates as StartStates;
  }

  // const startStates: InitialItemsState<typeof state> = {
  const startRefs: Partial<StartRefs> = {};
  forEach(placeNames, (placeName) => {
    startRefs[placeName] = refs(placeName);
  });
  const startStates = {
    // Automatically make place states
    ...makeAutmaticPlaceStartStates(),
  };

  forEach(placeNames, (placeName) => {
    (startStates[placeName] as any) = state(placeName);
  });

  /*

  as <PlaceName extends PlaceName>(
  itemName: PlaceName | string
) => PlaceRefs<PlaceName>

*/

  return {
    startStates: startStates as StartStates,
    state: state as <K_PlaceName extends PlaceName>(itemName: K_PlaceName | string) => ReturnType<typeof state>,
    refs: refs as <K_PlaceName extends PlaceName>(itemName: K_PlaceName & string) => PlaceRefs<PlaceName>, // TODO change to PlaceRefs<K_PlaceName> when ReturnType is generic
  };
}
