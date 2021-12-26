import { forEach } from "chootils/dist/loops";
import pointIsInside from "../../utils/babylonjs/pointIsInside";
import { makeScenePlaneUtils } from "../../utils/babylonjs/scenePlane";
export function makeCharacterDynamicRules(storeHelpers, prendyStartOptions, prendyArt) {
    const { getState, setState, getRefs, makeDynamicRules } = storeHelpers;
    const { placeInfoByName } = prendyArt;
    const { updatePlanePositionToFocusOnMesh } = makeScenePlaneUtils(storeHelpers, prendyStartOptions);
    const refs = getRefs();
    const placesRefs = refs.places;
    // makeDynamicRules(({ itemEffect })=> ({
    //   sdsdf: itemEffect()
    // }))
    return makeDynamicRules(({ itemEffect, effect }) => ({
        whenPositionChanges: effect(({ characterName, dollName, }) => ({
            // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
            run({ itemRefs, itemState }) {
                // TODO
                // only update the collider stuff here
                // Also listen to dolls positions, and return if not the same dollNAme (easier than dynamic rules for now)
                if (!itemRefs.meshRef)
                    return;
                const { nowPlaceName, loadingOverlayToggled, focusedDoll, } = getState().global.main;
                const nowPlaceInfo = placeInfoByName[nowPlaceName];
                const triggerNames = nowPlaceInfo.triggerNames;
                const cameraNames = nowPlaceInfo.cameraNames;
                if (loadingOverlayToggled === true)
                    return;
                const characterState = getState().characters[characterName];
                // --------------------------
                // check cam cubes
                let newAtTheseCamCubes = {};
                const currentAtCamCubes = characterState.atCamCubes;
                let atCamCubesHasChanged = false;
                forEach(cameraNames, (loopedCameraName) => {
                    const camsRefs = placesRefs[nowPlaceName].camsRefs[loopedCameraName];
                    let isAtLoopedCamCube = false;
                    forEach(camsRefs.camCubeMeshes, (loopedMesh) => {
                        const isAtLoopedCamCubeMesh = !!(itemRefs.meshRef &&
                            loopedMesh &&
                            camsRefs.isTriggerable &&
                            pointIsInside(itemRefs.meshRef.position, loopedMesh));
                        if (isAtLoopedCamCubeMesh) {
                            isAtLoopedCamCube = true;
                        }
                    });
                    newAtTheseCamCubes[loopedCameraName] = isAtLoopedCamCube;
                    if (currentAtCamCubes[loopedCameraName] !==
                        newAtTheseCamCubes[loopedCameraName]) {
                        atCamCubesHasChanged = true;
                    }
                });
                if (atCamCubesHasChanged) {
                    setState({
                        characters: {
                            [characterName]: { atCamCubes: newAtTheseCamCubes },
                        },
                    });
                }
                // --------------------------
                // check triggers
                let newAtTheseTriggers = {};
                const currentAtTriggers = characterState.atTriggers;
                let atTriggersHasChanged = false;
                forEach(triggerNames, (loopedTriggerName) => {
                    const loopedMesh = placesRefs[nowPlaceName].triggerMeshes[loopedTriggerName];
                    const isAtLoopedTrigger = !!(itemRefs.meshRef &&
                        loopedMesh &&
                        pointIsInside(itemRefs.meshRef.position, loopedMesh));
                    newAtTheseTriggers[loopedTriggerName] = isAtLoopedTrigger;
                    if (currentAtTriggers[loopedTriggerName] !==
                        newAtTheseTriggers[loopedTriggerName]) {
                        atTriggersHasChanged = true;
                    }
                });
                if (atTriggersHasChanged) {
                    setState({
                        characters: {
                            [characterName]: { atTriggers: newAtTheseTriggers },
                        },
                    });
                }
                if (dollName === focusedDoll) {
                    // Update screen position :)
                    updatePlanePositionToFocusOnMesh({ meshRef: itemRefs.meshRef });
                }
            },
            check: { type: "dolls", prop: "position", name: dollName },
            atStepEnd: true,
            step: "checkCollisions",
        })),
        // whenInRangeChanges: itemEffect(
        //   ({
        //     characterName,
        //     dollName,
        //   }: {
        //     characterName: CharacterName;
        //     dollName: DollName;
        //   }) => ({
        //     // nameThisRule: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
        //     run({ newValue: newInRange, itemName }) {
        //       // console.log(itemName, " in range");
        //       // console.log(newInRange.cat);
        //     },
        //     check: { type: "dolls", prop: "inRange", name: dollName },
        //     atStepEnd: true,
        //   })
        // ),
    }));
}
// FIXME
// maybe allow concepto to run 'addedOrRemoved' rules for initialState?
// TODO add addOrRemovd rules for characters
export function makeStartDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, storeHelpers) {
    const { getState } = storeHelpers;
    return function startDynamicCharacterRulesForInitialState() {
        forEach(characterNames, (characterName) => {
            const { dollName } = getState().characters[characterName];
            if (!dollName)
                return;
            characterDynamicRules.startAll({ characterName, dollName });
        });
        return function stopDynamicCharacterRulesForInitialState() {
            forEach(characterNames, (characterName) => {
                const { dollName } = getState().characters[characterName];
                if (!dollName)
                    return;
                characterDynamicRules.stopAll({ characterName, dollName });
            });
        };
    };
}
export function makeCharacterRules(storeHelpers, prendyArt) {
    const { makeRules, getState, setState } = storeHelpers;
    const { placeInfoByName } = prendyArt;
    return makeRules(({ itemEffect, effect }) => ({
        // should be a  dynamic rule ?
        whenCameraChangesForPlanePosition: effect({
            // in a different flow to "cameraChange"
            run() {
                // focusScenePlaneOnFocusedDoll();
            },
            check: { type: "places", prop: ["nowCamName"] },
        }),
        whenAtCamCubes: itemEffect({
            run({ newValue: newAtCamCubes, previousValue: prevAtCamCubes, itemName: charName, }) {
                const { playerCharacter } = getState().global.main;
                if (charName !== playerCharacter)
                    return; // NOTE maybe dynamic rule better (since the listener wont run for other characters)
                const { nowPlaceName } = getState().global.main;
                const { nowCamName } = getState().places[nowPlaceName];
                const cameraNames = placeInfoByName[nowPlaceName]
                    .cameraNames;
                forEach(cameraNames, (loopedCameraName) => {
                    if (loopedCameraName !== nowCamName &&
                        newAtCamCubes[loopedCameraName] &&
                        !prevAtCamCubes[loopedCameraName]) {
                        setState({
                            places: {
                                // [nowPlaceName]: { nowCamName: loopedCameraName },
                                [nowPlaceName]: { wantedCamName: loopedCameraName },
                            },
                        });
                    }
                });
            },
            check: { type: "characters", prop: "atCamCubes" },
            step: "collisionReaction",
            atStepEnd: true,
        }),
        // NOTE Could be dynamic rule for all characters?
        whenPlaceChanges: itemEffect({
            run() {
                setState((state) => ({
                    characters: {
                        [state.global.main.playerCharacter]: {
                            hasLeftFirstTrigger: false,
                        },
                    },
                }));
            },
            check: { type: "global", prop: "nowPlaceName" },
        }),
    }));
}
