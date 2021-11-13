import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  PlaceName,
} from "../../../declarations";
import { makeGetUsefulStoryStuff } from "../../../storyRuleMakers";

export function makeSceneStoryUtils<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { getRefs, getState, startItemEffect, stopEffect } = concepFuncs;

  const getUsefulStoryStuff = makeGetUsefulStoryStuff(concepFuncs);
  const globalRefs = getRefs().global.main;

  function getSegmentFromStoryRules<
    T_Place extends PlaceName,
    T_Cam extends CameraNameByPlace[T_Place]
  >(place: T_Place, cam: T_Cam) {
    const foundRuleSegmentName = (globalRefs.camSegmentRulesOptions as any)?.[
      place
    ]?.[cam]?.(getUsefulStoryStuff());

    return foundRuleSegmentName;
  }

  function doWhenNowSegmentChanges(
    checkingSegmentName: AnySegmentName,
    callback: () => void
  ) {
    const initialNowSegmentName = getState().global.main.nowSegmentName;
    if (checkingSegmentName === initialNowSegmentName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowSegmentChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      onItemEffect: ({ newValue: newNowSegmentName }) => {
        // if (newNowSegmentName !== checkingSegmentName) return;
        // wait until the segment changed from the original (even if it doesn't change to the new one)
        if (newNowSegmentName === initialNowSegmentName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "global", prop: "nowSegmentName", name: "main" },
      flow: "cameraChange",
      whenToRun: "subscribe",
    });
    return ruleName;
  }

  function doWhenNowCamChanges(
    // WARNING This might mess up if the place changes while the cam change was waiting
    checkingCamName: AnyCameraName,
    callback: () => void
  ) {
    const { nowPlaceName } = getState().global.main;

    const initialNowCamName = getState().places[nowPlaceName].nowCamName;
    if (checkingCamName === initialNowCamName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowSegmentChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      onItemEffect: ({ newValue: newNowCamName, itemName }) => {
        if (itemName !== nowPlaceName) return;

        // if (newNowCamName !== checkingCamName) return;
        if (newNowCamName === initialNowCamName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "places", prop: "nowCamName" },
      flow: "cameraChange",
      whenToRun: "subscribe",
    });
    return ruleName;
  }

  return {
    getSegmentFromStoryRules,
    doWhenNowSegmentChanges,
    doWhenNowCamChanges,
  };
}
