import { MyTypes } from "../../declarations";
import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";

export function get_sceneStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]) {
  type AnyCameraName = T_MyTypes["Main"]["AnyCameraName"];
  type AnySegmentName = T_MyTypes["Main"]["AnySegmentName"];
  type CameraNameByPlace = T_MyTypes["Main"]["CameraNameByPlace"];
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { getRefs, getState, startItemEffect, stopEffect } = storeHelpers;

  const getUsefulStoryStuff = get_getUsefulStoryStuff(storeHelpers);
  const globalRefs = getRefs().global.main;

  function getSegmentFromStoryRules<T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(
    place: T_Place,
    cam: T_Cam
  ) {
    const foundRuleSegmentName = (globalRefs.camSegmentRulesOptions as any)?.[place]?.[cam]?.(getUsefulStoryStuff());

    return foundRuleSegmentName;
  }

  function doWhenNowSegmentChanges(checkingSegmentName: AnySegmentName, callback: () => void) {
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
    checkingCamName: AnyCameraName,
    callback: () => void
  ) {
    const { nowPlaceName } = getState().global.main;

    const initialNowCamName = getState().global.main.nowCamName;
    if (checkingCamName === initialNowCamName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowCamChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newNowCamName }) => {
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

  function doWhenNowPlaceChanges(checkingPlaceName: PlaceName, callback: () => void) {
    const { nowPlaceName } = getState().global.main;

    const initialNowPlaceName = getState().global.main.nowPlaceName;
    if (checkingPlaceName === initialNowPlaceName) {
      callback();
      return null;
    }
    const ruleName = "doWhenNowPlaceChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newNowCamName }) => {
        if (newNowCamName === initialNowPlaceName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "global", prop: "nowPlaceName" },
      step: "default",
      atStepEnd: true,
    });
    return ruleName;
  }

  function doWhenPlaceFullyLoaded(checkingPlaceName: PlaceName, callback: () => void) {
    const { nowPlaceName } = getState().global.main;

    const initialNowPlaceName = getState().global.main.nowPlaceName;
    const initialIsLoadingBetweenPlaces = getState().global.main.initialIsLoadingBetweenPlaces;
    if (checkingPlaceName === initialNowPlaceName && initialIsLoadingBetweenPlaces === false) {
      callback();
      return null;
    }
    const ruleName = "doWhenPlaceFullyLoaded" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: isLoadingBetweenPlaces }) => {
        const nowPlaceName = getState().global.main.nowPlaceName;

        if (isLoadingBetweenPlaces === true || nowPlaceName !== checkingPlaceName) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "global", prop: "isLoadingBetweenPlaces" },
      step: "default",
      atStepEnd: true,
    });
    return ruleName;
  }

  async function waitForPlaceFullyLoaded(checkingPlaceName: PlaceName) {
    return new Promise<void>((resolve) => {
      doWhenPlaceFullyLoaded(checkingPlaceName, resolve);
    });
  }

  async function waitForNowPlaceToChange(checkingPlaceName: PlaceName) {
    return new Promise<void>((resolve) => {
      doWhenNowPlaceChanges(checkingPlaceName, resolve);
    });
  }

  async function waitForNowCamToChange(checkingCamName: AnyCameraName) {
    return new Promise<void>((resolve) => {
      doWhenNowCamChanges(checkingCamName, resolve);
    });
  }

  const waitForNextTick = () => new Promise((resolve) => storeHelpers.onNextTick(resolve));

  return {
    getSegmentFromStoryRules,
    doWhenNowSegmentChanges,
    doWhenNowCamChanges,
    waitForNowPlaceToChange,
    waitForPlaceFullyLoaded,
    waitForNowCamToChange,
    waitForNextTick,
  };
}
