import { makeNestedLeaveRuleMaker, makeNestedRuleMaker } from "repond";
import { CameraNameFromPlace, PlaceName } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

type CamChangeRulesParam = Partial<{
  [P_PlaceName in PlaceName]: Partial<
    Record<CameraNameFromPlace<P_PlaceName>, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>
  >;
}>;

type CamChangeRulesReturn = {
  start: (ruleName: "whenPropertyChanges") => void;
  stop: (ruleName: "whenPropertyChanges") => void;
  startAll: () => void;
  stopAll: () => void;
  ruleNames: "whenPropertyChanges"[];
  run: (ruleName: "whenPropertyChanges") => void;
  runAll: () => void;
};

type CamChangeRules = (callBacksObject: CamChangeRulesParam) => CamChangeRulesReturn;

export function makeCamChangeRules(callBacksObject: CamChangeRulesParam) {
  return makeNestedRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callBacksObject) as CamChangeRulesReturn;
}

export function makeCamLeaveRules(callBacksObject: CamChangeRulesParam) {
  return makeNestedLeaveRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callBacksObject) as CamChangeRulesReturn;
}
