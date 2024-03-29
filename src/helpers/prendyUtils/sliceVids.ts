import { getRefs, getState, startNewItemEffect, stopNewEffect } from "repond";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { SliceVidState, VidSlice } from "../../stores/sliceVids";
import { PlaceName } from "../../types";
import { getSafeCamName, getSafeSegmentName } from "./cameraChange";
import { getGlobalState } from "./global";

export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function getSliceVidVideo(itemId: PlaceName) {
  const sliceVidState = getState().sliceVids[itemId];
  const { stateVidId_playing } = sliceVidState;
  if (!stateVidId_playing) return;

  const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
  return backdropVidRefs.videoElement;
}

export function getSliceVidWaitingVideo(itemId: PlaceName) {
  const sliceVidState = getState().sliceVids[itemId];
  const { stateVidId_waiting } = sliceVidState;
  if (!stateVidId_waiting) return;

  const backdropVidRefs = getRefs().stateVids[stateVidId_waiting];
  return backdropVidRefs.videoElement;
}

type CameraNameByPlace = MyTypes["Types"]["CameraNameByPlace"];
type SegmentNameByPlace = MyTypes["Types"]["SegmentNameByPlace"];

// temporary rule, that gets removed when it finishes
export function doWhenSliceVidStateChanges(
  sliceVidId: PlaceName,
  checkShouldRun: (newVidState: SliceVidState) => boolean,
  callback: () => void
) {
  const { placeInfoByName } = meta.assets!;
  const initialVidState = getState().sliceVids[sliceVidId].sliceVidState;
  if (checkShouldRun(initialVidState)) {
    callback();
    return null;
  }

  const effectId = "doWhenSliceVidStateChanges" + Math.random() + Math.random();

  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newVidState }) => {
      if (!checkShouldRun(newVidState)) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "sliceVids", prop: "sliceVidState", id: sliceVidId },
    step: "sliceVidStateUpdates",
    atStepEnd: true,
  });
  return effectId;
}

export function doWhenSliceVidPlaying(sliceVidId: PlaceName, callback: () => void) {
  return doWhenSliceVidStateChanges(sliceVidId, (newState) => newState === "play", callback);
}

export async function doWhenSliceVidPlayingAsync(sliceVidId: PlaceName) {
  return new Promise<void>((resolve, _reject) => {
    doWhenSliceVidPlaying(sliceVidId, resolve);
  });
}

export function getSliceEndTime(slice: VidSlice) {
  return slice.time + slice.duration - BEFORE_LOOP_PADDING;
}

export function getSliceForPlace<T_PlaceName extends PlaceName>(
  place: T_PlaceName,
  camName: CameraNameByPlace[T_PlaceName],
  segment: SegmentNameByPlace[T_PlaceName]
) {
  const { placeInfoByName } = meta.assets!;

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

export function checkIfVideoUnloading(placeName: PlaceName) {
  const itemState = getState().sliceVids[placeName];
  const { sliceVidState } = itemState;

  return sliceVidState === "unloaded" || sliceVidState === "waitingForUnload";
}

export function checkIfVideoAlreadyChanging(placeName: PlaceName) {
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
export function checkForVideoLoop(placeName: PlaceName) {
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

//  {
//   getSliceVidVideo,
//   getSliceVidWaitingVideo,
//   doWhenSliceVidPlayingAsync,
//   doWhenSliceVidStateChanges,
//   doWhenSliceVidPlaying,
//   getSliceEndTime,
//   getSliceForPlace,
//   checkForVideoLoop,
//   checkIfVideoUnloading,
//   checkIfVideoAlreadyChanging,
// };
