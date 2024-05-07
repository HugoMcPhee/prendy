import { getState } from "repond";
import { PickupName } from "../../types";

// TODO move to utils/getters
export function isHolding(pickupName: PickupName) {
  const { heldPickups } = getState().global.main;
  return heldPickups.includes(pickupName);
}
