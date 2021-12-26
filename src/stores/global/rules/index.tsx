import { PrendyArt, PrendyOptions } from "../../../declarations";
import {
  PrendyStoreHelpers,
  PlaceholderPrendyConcepts,
} from "../../typedStoreHelpers";
import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";

export function makeStartAllGlobalRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyConcepts extends PlaceholderPrendyConcepts
>(
  storeHelpers: StoreHelpers,
  prendyConcepts: PrendyConcepts,
  prendyStartOptions: PrendyOptions,
  prendyArt: PrendyArt
) {
  // making rules
  const globalVideoRules = makeGlobalVideoRules(
    storeHelpers,
    prendyConcepts,
    prendyStartOptions,
    prendyArt
  );
  const globalChangePlaceRules = makeGlobalChangePlaceRules(
    storeHelpers,
    prendyConcepts,
    prendyStartOptions,
    prendyArt
  );
  const globalGeneralRules = makeGlobalGeneralRules(storeHelpers);
  const globalScenePlaneRules = makeGlobalScenePlaneRules(
    storeHelpers,
    prendyStartOptions
  );

  return function startAllGlobalRules() {
    globalVideoRules.startAll();
    globalChangePlaceRules.startAll();
    globalScenePlaneRules.startAll();
    globalGeneralRules.startAll();

    return function stopAllGlobalRules() {
      globalVideoRules.stopAll();
      globalChangePlaceRules.stopAll();
      globalScenePlaneRules.stopAll();
      globalGeneralRules.stopAll();
    };
  };
}
