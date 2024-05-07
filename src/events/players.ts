import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import { setState } from "repond";
import { II, addSubEvents, makeEventTypes } from "repond-events";
import { setGlobalState } from "../helpers/prendyUtils/global";
import { AnyAnimationName, PickupName } from "../types";

type PlayerAnimationNames = {
  walking: AnyAnimationName;
  idle: AnyAnimationName;
};

export const playerEvents = makeEventTypes(({ event }) => ({
  enableMovement: event({
    run: async ({ canMove = true, revertDelay }, { runMode, liveId }) => {
      if (runMode !== "start") return;
      setGlobalState({ playerMovingPaused: !canMove });
      if (revertDelay) {
        addSubEvents(liveId, [
          II("basic", "wait", { time: revertDelay }),
          II("setState", "setState", { global: { main: { playerMovingPaused: !canMove } } }),
        ]);
      }
    },
    params: { canMove: undefined as boolean | undefined, revertDelay: undefined as undefined | number },
  }),
  takePickup: event({
    run: ({ which: pickup, toHolding = true }, { runMode }) => {
      if (runMode !== "start") return;
      setGlobalState((state) => ({
        heldPickups: toHolding
          ? addItemToUniqueArray(state.heldPickups, pickup)
          : removeItemFromArray(state.heldPickups, pickup),
      }));
    },
    params: { which: "" as PickupName, toHolding: undefined as undefined | boolean },
  }),
  setAnimations: event({
    run: ({ animations }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ players: { main: { animationNames: animations } } });
    },
    params: { animations: { walking: "", idle: "" } as PlayerAnimationNames },
  }),
}));
