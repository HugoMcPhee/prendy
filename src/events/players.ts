import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { setState } from "repond";
import { makeEventTypes } from "repond-events";
import { setGlobalState } from "../helpers/prendyUtils/global";
import { AnyAnimationName, PickupName } from "../types";

type PlayerAnimationNames = {
  walking: AnyAnimationName;
  idle: AnyAnimationName;
};

export const playerEvents = makeEventTypes(({ event }) => ({
  enableMovement: event({
    run: async ({ canMove, revertDelay }, { runMode }) => {
      if (runMode !== "start") return;
      setGlobalState({ playerMovingPaused: !canMove });
      if (revertDelay) {
        await delay(revertDelay);
        setGlobalState({ playerMovingPaused: canMove });
      }
    },
    params: { canMove: true, revertDelay: 0 },
  }),
  takePickup: event({
    run: ({ pickup, toHolding }, { runMode }) => {
      if (runMode !== "start") return;
      setGlobalState((state) => ({
        heldPickups: toHolding
          ? addItemToUniqueArray(state.heldPickups, pickup)
          : removeItemFromArray(state.heldPickups, pickup),
      }));
    },
    params: { pickup: "" as PickupName, toHolding: true },
  }),
  setPlayerAnimations: event({
    run: ({ newAnimationNames }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ players: { main: { animationNames: newAnimationNames } } });
    },
    params: { newAnimationNames: { walking: "", idle: "" } as PlayerAnimationNames },
  }),
}));
