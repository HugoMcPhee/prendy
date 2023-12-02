import { globalChangePlaceRules } from "./changePlace";
import { globalGeneralRules } from "./general";
import { globalSlateRules } from "./slate";
import { globalVideoRules } from "./video";

export function startAllGlobalRules() {
  globalVideoRules.startAll();
  globalChangePlaceRules.startAll();
  globalSlateRules.startAll();
  globalGeneralRules.startAll();

  return function stopAllGlobalRules() {
    globalVideoRules.stopAll();
    globalChangePlaceRules.stopAll();
    globalSlateRules.stopAll();
    globalGeneralRules.stopAll();
  };
}
