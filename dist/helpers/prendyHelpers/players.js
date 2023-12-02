import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { getState, setState } from "repond";
import { setGlobalState } from "../prendyUtils/global";
export async function enableMovement(canMove = true, revertDelay) {
    setGlobalState({ playerMovingPaused: !canMove });
    if (revertDelay) {
        await delay(revertDelay);
        setGlobalState({ playerMovingPaused: canMove });
    }
}
export function isHolding(pickupName) {
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
    setState({ players: { main: { animationNames: newAnimationNames } } });
}
