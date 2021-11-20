import delay from "delay";
import { addItemToUniqueArray, removeItemFromArray } from "shutils/dist/arrays";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  BackdopConcepFuncs,
  PlaceholderBackdopConcepts,
} from "../../../concepts/typedConcepFuncs";
import {
  AnyAnimationName,
  BackdopOptions,
  CharacterName,
  ModelInfoByName,
  PickupName,
} from "../../../declarations";
import { makeCharacterStoryHelpers } from "./characters";

export function makerPlayerStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_BackdopOptions extends BackdopOptions = BackdopOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_PickupName extends PickupName = PickupName
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: A_BackdopOptions,
  modelInfoByName: A_ModelInfoByName,
  characterNames: readonly A_CharacterName[]
) {
  const { getState, setState } = concepFuncs;

  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);

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
