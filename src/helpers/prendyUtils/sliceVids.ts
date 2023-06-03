import { SliceVidState, VidSlice } from "../../stores/sliceVids";
import { get_cameraChangeUtils } from "./cameraChange";
import { AnyCameraName, PrendyAssets, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../declarations";
import { get_globalUtils } from "./global";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function get_getSliceVidVideo<StoreHelpers extends PrendyStoreHelpers, PlaceName extends string>(
  storeHelpers: StoreHelpers
) {
  const { getRefs, getState } = storeHelpers;

  return function getSliceVidVideo(itemName: PlaceName) {
    const sliceVidState = getState().sliceVids[itemName];
    const { stateVidId_playing } = sliceVidState;
    if (!stateVidId_playing) return;

    const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
    return backdropVidRefs.videoElement;
  };
}

export function get_sliceVidUtils<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(
  storeHelpers: StoreHelpers,
  prendyOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getState, startItemEffect, stopEffect } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { getGlobalState } = get_globalUtils(storeHelpers);
  const getSliceVidVideo = get_getSliceVidVideo<StoreHelpers, PlaceName>(storeHelpers);
  const { getSafeCamName, getSafeSegmentName } = get_cameraChangeUtils(storeHelpers, prendyOptions, prendyAssets);

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
      check: {
        type: "sliceVids",
        prop: "sliceVidState",
        name: sliceVidId,
      },
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
    const safeCam = getSafeCamName(camName as any) as AnyCameraName | null;

    if (place !== safePlace) {
      console.warn("tried to getSliceForPlace with non current place", place);
    }

    const safeSegmentName = getSafeSegmentName({
      segment,
      cam: safeCam as any, // FIXME any type
      place: safePlace,
    });

    // NOTE  might be a way to avoid using any but is internal so okay for now
    const placeSegmentTimesByCamera = placeInfoByName[safePlace].segmentTimesByCamera as any;
    const typedCamName = safeCam as keyof typeof placeSegmentTimesByCamera;

    const placeSegmentDurations = placeInfoByName[safePlace].segmentDurations;

    const newTime = placeSegmentTimesByCamera[typedCamName][safeSegmentName];
    const newDuration = placeSegmentDurations[safeSegmentName as keyof typeof placeSegmentDurations];

    return { time: newTime, duration: newDuration };
  }

  // runs on changes to tick, in the checkVideoLoop flow

  function checkForVideoLoop(placeName: PlaceName) {
    // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSlice for too many frames, then do something?
    const itemState = getState().sliceVids[placeName];
    const globalState = getState().global.main;
    const { nowSlice, sliceVidState } = itemState;
    const backdropVid = getSliceVidVideo(placeName);

    const { nowCamName } = globalState;

    /*
  !goalSegmentNameWhenVidPlays &&
  !goalCamNameWhenVidPlays
  */

    if (
      // sliceVidState === "play" // might've been getting skipped sometimes?
      sliceVidState === "unloaded" ||
      sliceVidState === "waitingForUnload"
    )
      return false;

    const currentTime = backdropVid?.currentTime ?? 0;

    const endTime = getSliceEndTime(nowSlice);
    const isAtOrAfterEndOfLoop = currentTime >= endTime;
    const isBeforeStartOfLoop = currentTime < nowSlice.time; // if the current time is before the video slices start time

    const isAlreadyLoopingOrChangingSlice =
      sliceVidState === "beforeDoLoop" ||
      sliceVidState === "beforeChangeSlice" ||
      sliceVidState === "waitingForDoLoop" ||
      sliceVidState === "waitingForChangeSlice";
    // sliceVidState === "play"
    // !wantToLoop

    if (!isAlreadyLoopingOrChangingSlice) {
      if (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) {
        // console.log("isAtOrAfterEndOfLoop", isAtOrAfterEndOfLoop);
        // console.log("isBeforeStartOfLoop", isBeforeStartOfLoop);
      }
    }

    // console.log("isAlreadyLoopingOrChangingSlice", isAlreadyLoopingOrChangingSlice, sliceVidState);
    // console.log("nowSlice", nowSlice, isAtOrAfterEndOfLoop);
    // console.log("nowCamName", nowCamName, nowSlice.time, nowSlice.duration);
    // console.log("nowCamName", nowCamName, placeName, nowSlice.time, nowSlice.duration);
    // console.log("isBeforeStartOfLoop", isBeforeStartOfLoop);

    if (
      (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) &&
      // isAtOrAfterEndOfLoop &&
      !isAlreadyLoopingOrChangingSlice
    ) {
      return true;
    }

    return false;
  }

  return {
    getSliceVidVideo,
    doWhenSliceVidPlayingAsync,
    doWhenSliceVidStateChanges,
    doWhenSliceVidPlaying,
    getSliceEndTime,
    getSliceForPlace,
    checkForVideoLoop,
  };
}
