import delay from "delay";
import { addItemToUniqueArray, removeItemFromArray } from "chootils/dist/arrays";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  PrendyStoreHelpers,
  PlaceholderPrendyConcepts,
} from "../../../concepts/typedStoreHelpers";
import {
  AnyAnimationName,
  PrendyOptions,
  CharacterName,
  ModelInfoByName,
  PickupName,
} from "../../../declarations";
import { makeCharacterStoryHelpers } from "./characters";

export function makerPlayerStoryHelpers<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyConcepts extends PlaceholderPrendyConcepts,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_PickupName extends PickupName = PickupName
>(
  storeHelpers: StoreHelpers,
  prendyConcepts: PrendyConcepts,
  prendyStartOptions: A_PrendyOptions,
  modelInfoByName: A_ModelInfoByName,
  characterNames: readonly A_CharacterName[]
) {
  const { getState, setState } = storeHelpers;

  const { setGlobalState } = makeGlobalStoreUtils(storeHelpers);

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
