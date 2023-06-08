import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import delay from "delay";
import {
  AnyAnimationName,
  CharacterName,
  ModelInfoByName,
  PickupName,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
} from "../../declarations";
import { get_globalUtils } from "../../helpers/prendyUtils/global";

export function get_playerStoryHelpers(
  storeHelpers: PrendyStoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  modelInfoByName: ModelInfoByName,
  characterNames: readonly CharacterName[]
) {
  const { getState, setState } = storeHelpers;

  const { setGlobalState } = get_globalUtils(storeHelpers);

  type PlayerAnimationNames = {
    walking: AnyAnimationName;
    idle: AnyAnimationName;
  };

  async function enableMovement(canMove: boolean = true, revertDelay?: number) {
    setGlobalState({ playerMovingPaused: !canMove });
    if (revertDelay) {
      await delay(revertDelay);
      setGlobalState({ playerMovingPaused: canMove });
    }
  }

  function isHolding(pickupName: PickupName) {
    const { heldPickups } = getState().global.main;
    return heldPickups.includes(pickupName);
  }

  function takePickup(pickup: PickupName, toHolding: boolean = true) {
    setGlobalState((state) => ({
      heldPickups: toHolding
        ? addItemToUniqueArray(state.heldPickups, pickup)
        : removeItemFromArray(state.heldPickups, pickup),
    }));
  }

  function setPlayerAnimations(newAnimationNames: PlayerAnimationNames) {
    setState({ players: { main: { animationNames: newAnimationNames } } });
  }

  return {
    enableMovement,
    isHolding,
    takePickup,
    setPlayerAnimations,
  };
}
