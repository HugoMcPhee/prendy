import { SectionVidState, VidSection } from "../../stores/loopVids";
import { get_cameraChangeUtils } from "./cameraChange";
import { AnyCameraName, PrendyAssets, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../declarations";
import { get_globalUtils } from "./global";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function get_getSectionVidVideo<StoreHelpers extends PrendyStoreHelpers, PlaceName extends string>(
  storeHelpers: StoreHelpers
) {
  const { getRefs, getState } = storeHelpers;

  return function getSectionVidVideo(itemName: PlaceName) {
    const sectionVidState = getState().loopVids[itemName];
    const { stateVidId_playing } = sectionVidState;
    if (!stateVidId_playing) return;

    const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
    return backdropVidRefs.videoElement;
  };
}

export function get_sectionVidUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets) {
  const { getState, startItemEffect, stopEffect } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { getGlobalState } = get_globalUtils(storeHelpers);
  const getSectionVidVideo = get_getSectionVidVideo<StoreHelpers, PlaceName>(storeHelpers);
  const { getSafeCamName, getSafeSegmentName } = get_cameraChangeUtils(storeHelpers, prendyOptions, prendyAssets);

  // temporary rule, that gets removed when it finishes
  function doWhenSectionVidStateChanges(
    sectionVidId: PlaceName,
    checkShouldRun: (newVidState: SectionVidState) => boolean,
    callback: () => void
  ) {
    const initialVidState = getState().loopVids[sectionVidId].sectionVidState;
    if (checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName = "doWhenSectionVidStateChanges" + Math.random() + Math.random();

    startItemEffect({
      name: ruleName,
      run: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;

        stopEffect(ruleName);
        callback();
      },
      check: {
        type: "loopVids",
        prop: "sectionVidState",
        name: sectionVidId,
      },
      step: "loopVidStateUpdates",
      atStepEnd: true,
    });
    return ruleName;
  }

  function doWhenSectionVidPlaying(sectionVidId: PlaceName, callback: () => void) {
    return doWhenSectionVidStateChanges(sectionVidId, (newState) => newState === "play", callback);
  }

  async function doWhenSectionVidPlayingAsync(sectionVidId: PlaceName) {
    return new Promise<void>((resolve, _reject) => {
      doWhenSectionVidPlaying(sectionVidId, resolve);
    });
  }

  function getSectionEndTime(section: VidSection) {
    return section.time + section.duration - BEFORE_LOOP_PADDING;
  }

  function getSectionForPlace<T_PlaceName extends PlaceName>(
    place: T_PlaceName,
    camName: CameraNameByPlace[T_PlaceName],
    segment: SegmentNameByPlace[T_PlaceName]
  ) {
    const { nowPlaceName: safePlace } = getGlobalState();
    const safeCam = getSafeCamName(camName as any) as AnyCameraName | null;

    if (place !== safePlace) {
      console.warn("tried to getSectionForPlace with non current place", place);
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
    // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSection for too many frames, then do something?
    const itemState = getState().loopVids[placeName];
    const placeState = getState().places[placeName];
    const { nowSection, sectionVidState } = itemState;
    const backdropVid = getSectionVidVideo(placeName);

    const { nowCamName } = placeState;

    /*
  !nextSegmentNameWhenVidPlays &&
  !nextCamNameWhenVidPlays
  */

    if (
      // sectionVidState === "play" // might've been getting skipped sometimes?
      sectionVidState === "unloaded" ||
      sectionVidState === "waitingForUnload"
    )
      return false;

    const currentTime = backdropVid?.currentTime ?? 0;

    const endTime = getSectionEndTime(nowSection);
    const isAtOrAfterEndOfLoop = currentTime >= endTime;
    const isBeforeStartOfLoop = currentTime < nowSection.time; // if the current time is before the video sections start time

    const isAlreadyLoopingOrChangingSection =
      sectionVidState === "beforeDoLoop" ||
      sectionVidState === "beforeChangeSection" ||
      sectionVidState === "waitingForDoLoop" ||
      sectionVidState === "waitingForChangeSection";
    // sectionVidState === "play"
    // !wantToLoop

    if (!isAlreadyLoopingOrChangingSection) {
      if (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) {
        // console.log("isAtOrAfterEndOfLoop", isAtOrAfterEndOfLoop);
        // console.log("isBeforeStartOfLoop", isBeforeStartOfLoop);
      }
    }

    // console.log("isAlreadyLoopingOrChangingSection", isAlreadyLoopingOrChangingSection, sectionVidState);
    // console.log("nowSection", nowSection, isAtOrAfterEndOfLoop);
    // console.log("nowCamName", nowCamName, nowSection.time, nowSection.duration);
    // console.log("nowCamName", nowCamName, placeName, nowSection.time, nowSection.duration);
    // console.log("isBeforeStartOfLoop", isBeforeStartOfLoop);

    if (
      (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) &&
      // isAtOrAfterEndOfLoop &&
      !isAlreadyLoopingOrChangingSection
    ) {
      return true;
    }

    return false;
  }

  return {
    getSectionVidVideo,
    doWhenSectionVidPlayingAsync,
    doWhenSectionVidStateChanges,
    doWhenSectionVidPlaying,
    getSectionEndTime,
    getSectionForPlace,
    checkForVideoLoop,
  };
}
