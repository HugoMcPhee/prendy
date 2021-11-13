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
  BackdopConcepts extends PlaceholderBackdopConcepts
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  modelInfoByName: ModelInfoByName,
  characterNames: readonly CharacterName[]
) {
  const { getRefs, getState, setState } = concepFuncs;

  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);

  const { setCharPosition, setCharRotationY } = makeCharacterStoryHelpers(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    modelInfoByName,
    characterNames
  );

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

  function setPlayerToStartSpot() {
    // note always goes to "start_spot"
    const placesRefs = getRefs().places;
    const { nowPlaceName, playerCharacter } = getState().global.main;
    const { dollName } = getState().characters[playerCharacter];
    if (!dollName) return;
    const { rotationY } = getState().dolls[dollName];

    // TODO Hack to start at different start spot at place, could use nextSpotName or something if it's set
    let startSpotName = "spot_start" as const;

    const startPosition =
      placesRefs[nowPlaceName].spotPositions[startSpotName].clone();

    setCharPosition(playerCharacter as CharacterName, startPosition);
    setCharRotationY(playerCharacter as CharacterName, rotationY);
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
    setPlayerToStartSpot,
    isHolding,
    takePickup,
    setPlayerAnimations,
  };
}
