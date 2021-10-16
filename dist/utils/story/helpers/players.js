import delay from "delay";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import { addItemToUniqueArray, removeItemFromArray } from "shutils/dist/arrays";
import { makeCharacterStoryHelpers } from "./characters";
export function makerPlayerStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName, characterNames) {
    const { getRefs, getState, setState } = conceptoFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(conceptoFuncs);
    const { setCharPosition, setCharRotationY } = makeCharacterStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName, characterNames);
    async function enableMovement(canMove = true, revertDelay) {
        setGlobalState({ playerMovingPaused: !canMove });
        if (revertDelay) {
            await delay(revertDelay);
            setGlobalState({ playerMovingPaused: canMove });
        }
    }
    function setPlayerToStartSpot() {
        // note always goes to "start_spot"
        const placesRefs = getRefs().places;
        const { nowPlaceName, playerCharacter } = getState().global.main;
        const { dollName } = getState().characters[playerCharacter];
        if (!dollName)
            return;
        const { rotationY } = getState().dolls[dollName];
        // TODO Hack to start at different start spot at place, could use nextSpotName or something if it's set
        let startSpotName = "spot_start";
        const startPosition = placesRefs[nowPlaceName].spotPositions[startSpotName].clone();
        setCharPosition(playerCharacter, startPosition);
        setCharRotationY(playerCharacter, rotationY);
    }
    function isHolding(pickupName) {
        const { heldPickups } = getState().global.main;
        return heldPickups.includes(pickupName);
    }
    function takePickup(pickup, toHolding = true) {
        setGlobalState((state) => ({
            heldPickups: toHolding
                ? addItemToUniqueArray(state.heldPickups, pickup)
                : removeItemFromArray(state.heldPickups, pickup),
        }));
    }
    function setPlayerAnimations(newAnimationNames) {
        setState({ players: { main: { animationNames: newAnimationNames } } });
    }
    return {
        enableMovement,
        setPlayerToStartSpot,
        isHolding,
        takePickup,
        setPlayerAnimations,
    };
}
