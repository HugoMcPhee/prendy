import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
export function get_playerStoryHelpers(storeHelpers) {
    const { getState, setState } = storeHelpers;
    const { setGlobalState } = get_globalUtils(storeHelpers);
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
