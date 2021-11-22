import delay from "delay";
import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
export function makerPlayerStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName, characterNames) {
    const { getState, setState } = concepFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    async function enableMovement(canMove = true, revertDelay) {
        setGlobalState({ playerMovingPaused: !canMove });
        if (revertDelay) {
            await delay(revertDelay);
            setGlobalState({ playerMovingPaused: canMove });
        }
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
        isHolding,
        takePickup,
        setPlayerAnimations,
    };
}
