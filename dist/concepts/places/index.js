import { Vector3, } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
const defaultCamRefs = () => ({
    camera: null,
    camCubeMeshes: [],
    //
    probeTexture: null,
    //
    isTriggerable: true,
});
export default function places(backdopArt) {
    const { placeNames, placeInfoByName } = backdopArt;
    // State
    const state = (placeName) => {
        var _a, _b, _c, _d;
        return {
            wantedCamWhenNextPlaceLoads: null,
            nextCamNameWhenVidPlays: null,
            wantedCamNameAtLoop: null,
            wantedCamName: null,
            nowCamName: (_d = (_c = (_b = (_a = placeInfoByName) === null || _a === void 0 ? void 0 : _a[placeName]) === null || _b === void 0 ? void 0 : _b.cameraNames) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : "testItemCamName", // if state() is called with a random itemName
        };
    };
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
  
    as <T_PlaceName extends PlaceName>(
    itemName: T_PlaceName | string
  ) => PlaceRefs<T_PlaceName>
  
  */
    return {
        startStates: startStates,
        state: state,
        refs: refs, // TODO change to PlaceRefs<T_PlaceName> when ReturnType is generic
    };
}
