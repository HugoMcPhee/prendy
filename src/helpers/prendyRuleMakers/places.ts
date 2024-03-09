import { makeRules, startNewItemEffect, stopNewEffect } from "repond";
import { PlaceName, StoryCallback } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

// --------------------------------------------------
//
// makePlaceLoadRules

type PlaceLoadRulesOptions = Partial<{
  [P_PlaceName in PlaceName]: StoryCallback;
}>;
export function makePlaceLoadRules(atStartOfEachPlace: StoryCallback, callBacksObject: PlaceLoadRulesOptions) {
  return makeRules(({ itemEffect }) => ({
    whenPlaceFinishedLoading: itemEffect({
      run() {
        // onNextTick(() => {
        const usefulStoryStuff = getUsefulStoryStuff();
        const { nowPlaceName } = usefulStoryStuff;

        atStartOfEachPlace?.(usefulStoryStuff);

        (callBacksObject as Record<any, any>)[nowPlaceName]?.(usefulStoryStuff);
        // });
      },
      check: { type: "global", prop: ["isLoadingBetweenPlaces"], becomes: false },
      // step: "respondToNewPlace",
      step: "respondToNewPlaceStory",
      atStepEnd: true,
    }),
  }));
}
export function makePlaceUnloadRules(callBacksObject: PlaceLoadRulesOptions) {
  return makeRules(({ itemEffect }) => ({
    whenPlaceFinishedUnloading: itemEffect({
      run({ prevValue: prevPlace, newValue: newPlace }) {
        let ruleName = startNewItemEffect({
          run() {
            stopNewEffect(ruleName);
            // console.log("unload rules for", prevPlace);
            const usefulStoryStuff = getUsefulStoryStuff();
            (callBacksObject as Record<any, any>)[prevPlace]?.(usefulStoryStuff);
          },
          check: {
            type: "global",
            prop: ["isLoadingBetweenPlaces"],
            becomes: false,
          },
          atStepEnd: true,
          step: "input",
        });
      },
      check: { type: "global", prop: ["nowPlaceName"] },
      step: "story",
      atStepEnd: true,
    }),
  }));
}
