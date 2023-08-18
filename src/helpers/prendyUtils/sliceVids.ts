import { MyTypes } from "../../declarations";
import { SliceVidState, VidSlice } from "../../stores/sliceVids";
import { get_cameraChangeUtils } from "./cameraChange";
import { get_globalUtils } from "./global";

export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function get_getSliceVidVideo<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]) {
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { getRefs, getState } = storeHelpers;

  return function getSliceVidVideo(itemName: PlaceName) {
    const sliceVidState = getState().sliceVids[itemName];
    const { stateVidId_playing } = sliceVidState;
    if (!stateVidId_playing) return;

    const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
    return backdropVidRefs.videoElement;
  };
}

export function get_getSliceVidWaitingVideo<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { getRefs, getState } = storeHelpers;

  return function getSliceVidWaitingVideo(itemName: PlaceName) {
    const sliceVidState = getState().sliceVids[itemName];
    const { stateVidId_waiting } = sliceVidState;
    if (!stateVidId_waiting) return;

    const backdropVidRefs = getRefs().stateVids[stateVidId_waiting];
    return backdropVidRefs.videoElement;
  };
}

export function get_sliceVidUtils<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type PlaceName = T_MyTypes["Main"]["PlaceName"];
  type CameraNameByPlace = T_MyTypes["Main"]["CameraNameByPlace"];
  type SegmentNameByPlace = T_MyTypes["Main"]["SegmentNameByPlace"];

  const { getState, startItemEffect, stopEffect } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { getGlobalState } = get_globalUtils(storeHelpers);
  const getSliceVidVideo = get_getSliceVidVideo(storeHelpers);
  const getSliceVidWaitingVideo = get_getSliceVidWaitingVideo(storeHelpers);
  const { getSafeCamName, getSafeSegmentName } = get_cameraChangeUtils(prendyAssets, storeHelpers);

  // temporary rule, that gets removed when it finishes
  function doWhenSliceVidStateChanges(
    sliceVidId: PlaceName,
    checkShouldRun: (newVidState: SliceVidState) => boolean,
    callback: () => void
  ) {
    const initialVidState = getState().sliceVids[sliceVidId].sliceVidState;
    if (checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName = "doWhenSliceVidStateChanges" + Math.random() + Math.random();

    startItemEffect({
      name: ruleName,
      run: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "sliceVids", prop: "sliceVidState", name: sliceVidId },
      step: "sliceVidStateUpdates",
      atStepEnd: true,
    });
    return ruleName;
  }

  function doWhenSliceVidPlaying(sliceVidId: PlaceName, callback: () => void) {
    return doWhenSliceVidStateChanges(sliceVidId, (newState) => newState === "play", callback);
  }

  async function doWhenSliceVidPlayingAsync(sliceVidId: PlaceName) {
    return new Promise<void>((resolve, _reject) => {
      doWhenSliceVidPlaying(sliceVidId, resolve);
    });
  }

  function getSliceEndTime(slice: VidSlice) {
    return slice.time + slice.duration - BEFORE_LOOP_PADDING;
  }

  function getSliceForPlace<T_PlaceName extends PlaceName>(
    place: T_PlaceName,
    camName: CameraNameByPlace[T_PlaceName],
    segment: SegmentNameByPlace[T_PlaceName]
  ) {
    const { nowPlaceName: safePlace } = getGlobalState();
    const safeCam = getSafeCamName(camName);

    if (place !== safePlace) console.warn("tried to getSliceForPlace with non current place", place);

    const safeSegmentName = getSafeSegmentName({ segment, cam: safeCam, place: safePlace });

    // NOTE  might be a way to avoid using any but is internal so okay for now
    const placeSegmentTimesByCamera = placeInfoByName[safePlace].segmentTimesByCamera as any;
    const typedCamName = safeCam as keyof typeof placeSegmentTimesByCamera;

    const placeSegmentDurations = placeInfoByName[safePlace].segmentDurations;

    const newTime = placeSegmentTimesByCamera[typedCamName][safeSegmentName];
    const newDuration = placeSegmentDurations[safeSegmentName as keyof typeof placeSegmentDurations];

    return { time: newTime, duration: newDuration };
  }

  function checkIfVideoUnloading(placeName: PlaceName) {
    const itemState = getState().sliceVids[placeName];
    const { sliceVidState } = itemState;

    return sliceVidState === "unloaded" || sliceVidState === "waitingForUnload";
  }

  function checkIfVideoAlreadyChanging(placeName: PlaceName) {
    const itemState = getState().sliceVids[placeName];
    const { sliceVidState } = itemState;

    const isAlreadyLoopingOrChangingSlice =
      sliceVidState === "beforeDoLoop" ||
      sliceVidState === "beforeChangeSlice" ||
      sliceVidState === "waitingForDoLoop" ||
      sliceVidState === "waitingForChangeSlice";

    return isAlreadyLoopingOrChangingSlice;
  }

  // Runs on changes to tick, in the checkVideoLoop flow
  function checkForVideoLoop(placeName: PlaceName) {
    // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSlice for too many frames, then do something?
    const itemState = getState().sliceVids[placeName];
    const { nowSlice } = itemState;
    const backdropVid = getSliceVidVideo(placeName);

    if (checkIfVideoUnloading(placeName)) return false;

    const currentTime = backdropVid?.currentTime ?? 0;
    const endTime = getSliceEndTime(nowSlice);
    const isAtOrAfterEndOfLoop = currentTime >= endTime;
    const isBeforeStartOfLoop = currentTime < nowSlice.time; // if the current time is before the video slices start time

    // const isAlreadyLoopingOrChangingSlice = checkIfVideoAlreadyChanging(placeName);

    const shouldLoop = isAtOrAfterEndOfLoop || isBeforeStartOfLoop;
    return shouldLoop;
  }

  return {
    getSliceVidVideo,
    getSliceVidWaitingVideo,
    doWhenSliceVidPlayingAsync,
    doWhenSliceVidStateChanges,
    doWhenSliceVidPlaying,
    getSliceEndTime,
    getSliceForPlace,
    checkForVideoLoop,
    checkIfVideoUnloading,
    checkIfVideoAlreadyChanging,
  };
}
