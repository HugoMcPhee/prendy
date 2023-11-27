import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { setGlobalState } from "../prendyUtils/global";
import { meta } from "../../meta";
export async function enableMovement(canMove = true, revertDelay) {
    setGlobalState({ playerMovingPaused: !canMove });
    if (revertDelay) {
        await delay(revertDelay);
        setGlobalState({ playerMovingPaused: canMove });
    }
}
export function isHolding(pickupName) {
    const { getState } = meta.repond;
    const { heldPickups } = getState().global.main;
    return heldPickups.includes(pickupName);
}
export function takePickup(pickup, toHolding = true) {
    setGlobalState((state) => ({
        heldPickups: toHolding
            ? addItemToUniqueArray(state.heldPickups, pickup)
            : removeItemFromArray(state.heldPickups, pickup),
    }));
}
export function setPlayerAnimations(newAnimationNames) {
    const { setState } = meta.repond;
    setState({ players: { main: { animationNames: newAnimationNames } } });
}
