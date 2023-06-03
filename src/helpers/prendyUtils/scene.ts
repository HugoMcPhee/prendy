import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, PlaceName } from "../../declarations";
import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";

export function get_sceneStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_PlaceName extends PlaceName = PlaceName
>(storeHelpers: StoreHelpers) {
  const { getRefs, getState, startItemEffect, stopEffect } = storeHelpers;

  const getUsefulStoryStuff = get_getUsefulStoryStuff(storeHelpers);
  const globalRefs = getRefs().global.main;

  function getSegmentFromStoryRules<T_Place extends A_PlaceName, T_Cam extends A_CameraNameByPlace[T_Place]>(
    place: T_Place,
    cam: T_Cam
  ) {
    const foundRuleSegmentName = (globalRefs.camSegmentRulesOptions as any)?.[place]?.[cam]?.(getUsefulStoryStuff());

    return foundRuleSegmentName;
  }

  function doWhenNowSegmentChanges(checkingSegmentName: A_AnySegmentName, callback: () => void) {
    const initialNowSegmentName = getState().global.main.nowSegmentName;
    if (checkingSegmentName === initialNowSegmentName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowSegmentChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newNowSegmentName }) => {
        // if (newNowSegmentName !== checkingSegmentName) return;
        // wait until the segment changed from the original (even if it doesn't change to the new one)
        if (newNowSegmentName === initialNowSegmentName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "global", prop: "nowSegmentName", name: "main" },
      step: "cameraChange",
      atStepEnd: true,
    });
    return ruleName;
  }

  function doWhenNowCamChanges(
    // WARNING This might mess up if the place changes while the cam change was waiting
    checkingCamName: A_AnyCameraName,
    callback: () => void
  ) {
    const { nowPlaceName } = getState().global.main;

    const initialNowCamName = getState().global.main.nowCamName;
    if (checkingCamName === initialNowCamName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowSegmentChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newNowCamName }) => {
        // if (newNowCamName !== checkingCamName) return;
        if (newNowCamName === initialNowCamName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "global", prop: "nowCamName" },
      step: "cameraChange",
      atStepEnd: true,
    });
    return ruleName;
  }

  return {
    getSegmentFromStoryRules,
    doWhenNowSegmentChanges,
    doWhenNowCamChanges,
  };
}
