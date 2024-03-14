import { getRefs, getState, onNextTick, startNewItemEffect, stopNewEffect } from "repond";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, PlaceName } from "../../types";
import { getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";

export function getSegmentFromSegmentRules<T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(
  place: T_Place,
  cam: T_Cam
) {
  const globalRefs = getRefs().global.main;
  const foundRuleSegmentName = (globalRefs.camSegmentRulesOptions as any)?.[place]?.[cam]?.(getUsefulStoryStuff());

  return foundRuleSegmentName;
}

export function doWhenNowSegmentChanges(checkingSegmentName: AnySegmentName, callback: () => void) {
  const initialNowSegmentName = getState().global.main.nowSegmentName;
  if (checkingSegmentName === initialNowSegmentName) {
    callback();
    return null;
  }
  const effectId = "doWhenNowSegmentChanges" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newNowSegmentName }) => {
      // if (newNowSegmentName !== checkingSegmentName) return;
      // wait until the segment changed from the original (even if it doesn't change to the new one)
      if (newNowSegmentName === initialNowSegmentName) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "global", prop: "nowSegmentName", id: "main" },
    step: "cameraChange",
    atStepEnd: true,
  });
  return effectId;
}

export function doWhenNowCamChanges(
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
  const effectId = "doWhenNowCamChanges" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newNowCamName }) => {
      if (newNowCamName === initialNowCamName) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "global", prop: "nowCamName" },
    step: "cameraChange",
    atStepEnd: true,
  });
  return effectId;
}

export function doWhenNowPlaceChanges(checkingPlaceName: PlaceName, callback: () => void) {
  const { nowPlaceName } = getState().global.main;

  const initialNowPlaceName = getState().global.main.nowPlaceName;
  if (checkingPlaceName === initialNowPlaceName) {
    callback();
    return null;
  }
  const effectId = "doWhenNowPlaceChanges" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newNowCamName }) => {
      if (newNowCamName === initialNowPlaceName) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "global", prop: "nowPlaceName" },
    step: "default",
    atStepEnd: true,
  });
  return effectId;
}

export function doWhenPlaceFullyLoaded(checkingPlaceName: PlaceName, callback: () => void) {
  const { nowPlaceName } = getState().global.main;

  const initialNowPlaceName = getState().global.main.nowPlaceName;
  const initialIsLoadingBetweenPlaces = getState().global.main.initialIsLoadingBetweenPlaces;
  if (checkingPlaceName === initialNowPlaceName && initialIsLoadingBetweenPlaces === false) {
    callback();
    return null;
  }
  const effectId = "doWhenPlaceFullyLoaded" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: isLoadingBetweenPlaces }) => {
      const nowPlaceName = getState().global.main.nowPlaceName;

      if (isLoadingBetweenPlaces === true || nowPlaceName !== checkingPlaceName) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "global", prop: "isLoadingBetweenPlaces" },
    step: "default",
    atStepEnd: true,
  });
  return effectId;
}

export async function waitForPlaceFullyLoaded(checkingPlaceName: PlaceName) {
  return new Promise<void>((resolve) => {
    doWhenPlaceFullyLoaded(checkingPlaceName, resolve);
  });
}

export async function waitForNowPlaceToChange(checkingPlaceName: PlaceName) {
  return new Promise<void>((resolve) => {
    doWhenNowPlaceChanges(checkingPlaceName, resolve);
  });
}

export async function waitForNowCamToChange(checkingCamName: AnyCameraName) {
  return new Promise<void>((resolve) => {
    doWhenNowCamChanges(checkingCamName, resolve);
  });
}

export const waitForNextTick = () => new Promise((resolve) => onNextTick(resolve));
