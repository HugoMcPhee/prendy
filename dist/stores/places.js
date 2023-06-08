import { Vector3 } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
const defaultCamRefs = () => ({
    camera: null,
    camCubeMeshes: [],
    //
    probeTexture: null,
    //
    isTriggerable: true,
});
// export
export default function places(prendyAssets, prendyStartOptions) {
    const { placeInfoByName } = prendyAssets;
    const placeNames = prendyAssets.placeNames;
    // State
    const state = (placeName) => ({
        testState: 0,
        // goalCamWhenNextPlaceLoads: null as MaybeCam<K_PlaceName>,
        // goalCamNameWhenVidPlays: null as MaybeCam<K_PlaceName>, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowCamName
        // goalCamNameAtLoop: null as MaybeCam<K_PlaceName>,
        // goalCamName: null as MaybeCam<K_PlaceName>, // NOTE always set goalCamName? and never nowCamName? to prepare everything first?
        // nowCamName:
        //   ((prendyStartOptions.place === placeName ? prendyStartOptions.camera : "") ||
        //     ((placeInfoByName as any)?.[placeName as any]?.cameraNames?.[0] as unknown as AnyCameraName)) ??
        //   ("testItemCamName" as AnyCameraName), // if state() is called with a random itemName
    });
    // Refs
    function refs(placeName) {
        const { spotNames, soundspotNames, triggerNames, wallNames, cameraNames } = placeInfoByName[placeName];
        const spotPositions = {};
        const spotRotations = {};
        const soundspotSounds = {};
        const triggerMeshes = {};
        const wallMeshes = {};
        const camsRefs = {};
        forEach(spotNames, (spotName) => {
            // https://stackoverflow.com/questions/42273853/in-typescript-what-is-the-exclamation-mark-bang-operator-when-dereferenci
            // spotPositions[loopedPlaceName]![loopedSpotName] = new Vector3(0, 0, 0);
            spotPositions[spotName] = new Vector3();
            spotRotations[spotName] = new Vector3();
        });
        forEach(soundspotNames, (soundspotName) => {
            soundspotSounds[soundspotName] = null;
        });
        forEach(triggerNames, (triggerName) => {
            triggerMeshes[triggerName] = null;
        });
        forEach(wallNames, (wallName) => {
            wallMeshes[wallName] = null;
        });
        forEach(cameraNames, (camName) => {
            camsRefs[camName] = defaultCamRefs();
        });
        return {
            rootMesh: null,
            spotPositions,
            spotRotations,
            soundspotSounds,
            triggerMeshes,
            wallMeshes,
            camsRefs,
            backdropVid: null,
        };
    }
    // const startStates: InitialItemsState<typeof state> = {
    const startRefs = {};
    forEach(placeNames, (placeName) => {
        startRefs[placeName] = refs(placeName);
    });
    const startStates = {};
    forEach(placeNames, (placeName) => {
        startStates[placeName] = state(placeName);
    });
    /*
  
    as <PlaceName extends PlaceName>(
    itemName: PlaceName | string
  ) => PlaceRefs<PlaceName>
  
  */
    return {
        startStates: startStates,
        state: state,
        refs: refs, // TODO change to PlaceRefs<K_PlaceName> when ReturnType is generic
    };
}
