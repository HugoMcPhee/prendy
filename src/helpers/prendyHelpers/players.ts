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

export function get_playerStoryHelpers<
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_CharacterName extends CharacterName = CharacterName,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_PickupName extends PickupName = PickupName,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores
>(
  storeHelpers: A_PrendyStoreHelpers,
  prendyStores: A_PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  modelInfoByName: A_ModelInfoByName,
  characterNames: readonly A_CharacterName[]
) {
  const { getState, setState } = storeHelpers;

  const { setGlobalState } = get_globalUtils(storeHelpers);

  type PlayerAnimationNames = {
    walking: A_AnyAnimationName;
    idle: A_AnyAnimationName;
  };

  async function enableMovement(canMove: boolean = true, revertDelay?: number) {
    setGlobalState({ playerMovingPaused: !canMove });
    if (revertDelay) {
      await delay(revertDelay);
      setGlobalState({ playerMovingPaused: canMove });
    }
  }

  function isHolding(pickupName: A_PickupName) {
    const { heldPickups } = getState().global.main;
    return heldPickups.includes(pickupName);
  }

  function takePickup(pickup: A_PickupName, toHolding: boolean = true) {
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
