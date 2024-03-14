import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { getState, setState } from "repond";
import { AnyAnimationName, PickupName } from "../../types";
import { setGlobalState } from "../prendyUtils/global";

type PlayerAnimationNames = {
  walking: AnyAnimationName;
  idle: AnyAnimationName;
};

export async function enableMovement(canMove: boolean = true, revertDelay?: number) {
  setGlobalState({ playerMovingPaused: !canMove });
  if (revertDelay) {
    await delay(revertDelay);
    setGlobalState({ playerMovingPaused: canMove });
  }
}

export function isHolding(pickupName: PickupName) {
  const { heldPickups } = getState().global.main;
  return heldPickups.includes(pickupName);
}

export function takePickup(pickup: PickupName, toHolding: boolean = true) {
  setGlobalState((state) => ({
    heldPickups: toHolding
      ? addItemToUniqueArray(state.heldPickups, pickup)
      : removeItemFromArray(state.heldPickups, pickup),
  }));
}

export function setPlayerAnimations(newAnimationNames: PlayerAnimationNames) {
  setState({ players: { main: { animationNames: newAnimationNames } } });
}
