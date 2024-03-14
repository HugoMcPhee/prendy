import { makeEffects, startNewItemEffect, stopNewEffect } from "repond";
import { PlaceName, StoryCallback } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

// --------------------------------------------------
//
// makePlaceLoadRules

type PlaceLoadRulesOptions = Partial<{
  [P_PlaceName in PlaceName]: StoryCallback;
}>;
export function makePlaceLoadEffects(atStartOfEachPlace: StoryCallback, callbacksMap: PlaceLoadRulesOptions) {
  return makeEffects(({ itemEffect }) => ({
    whenPlaceFinishedLoading: itemEffect({
      run() {
        // onNextTick(() => {
        const usefulStoryStuff = getUsefulStoryStuff();
        const { nowPlaceName } = usefulStoryStuff;

        atStartOfEachPlace?.(usefulStoryStuff);

        (callbacksMap as Record<any, any>)[nowPlaceName]?.(usefulStoryStuff);
        // });
      },
      check: { type: "global", prop: ["isLoadingBetweenPlaces"], becomes: false },
      // step: "respondToNewPlace",
      step: "respondToNewPlaceStory",
      atStepEnd: true,
    }),
  }));
}

export function makePlaceUnloadEffects(callbacksMap: PlaceLoadRulesOptions) {
  return makeEffects(({ itemEffect }) => ({
    whenPlaceFinishedUnloading: itemEffect({
      run({ prevValue: prevPlace, newValue: newPlace }) {
        let effectId = startNewItemEffect({
          run() {
            stopNewEffect(effectId);
            // console.log("unload rules for", prevPlace);
            const usefulStoryStuff = getUsefulStoryStuff();
            (callbacksMap as Record<any, any>)[prevPlace]?.(usefulStoryStuff);
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
