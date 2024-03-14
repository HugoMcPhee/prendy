import { makeNestedEffectsMaker } from "repond";
import { CameraNameFromPlace, PlaceName } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

type CamChangeRulesParam = Partial<{
  [P_PlaceName in PlaceName]: Partial<
    Record<CameraNameFromPlace<P_PlaceName>, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>
  >;
}>;

export function makeCamChangeEffects(callbacksMap: CamChangeRulesParam) {
  return makeNestedEffectsMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callbacksMap);
}

export function makeCamLeaveEffects(callbacksMap: CamChangeRulesParam) {
  return makeNestedEffectsMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callbacksMap);
}
