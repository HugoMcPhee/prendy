import { makeGlobalStoreUtils } from "../global/utils";
import { VidType } from "../../utils/consts";
import { SectionVidState, VidSection } from ".";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../typedConcepFuncs";
import { makeCameraChangeUtils } from "../../concepts/global/utils/cameraChange";

// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function makeGetSectionVidVideo<
  ConcepFuncs extends BackdopConcepFuncs,
  PlaceName extends string
>(concepFuncs: ConcepFuncs) {
  const { getRefs, getState } = concepFuncs;

  return function getSectionVidVideo(itemName: PlaceName) {
    const sectionVidState = getState().sectionVids[itemName];
    const { safeVidId_playing } = sectionVidState;
    if (!safeVidId_playing) return;

    const backdropVidRefs = getRefs().safeVids[safeVidId_playing];
    return backdropVidRefs.videoElement;
  };
}

export function makeSectionVidStoreUtils<
  ConcepFuncs extends BackdopConcepFuncs,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  PlaceName extends string,
  DollName extends string,
  AnyCameraName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  concepFuncs: ConcepFuncs,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  const { getState, startItemEffect, stopEffect } = concepFuncs;

  const { getGlobalState } = makeGlobalStoreUtils(concepFuncs);

  const getSectionVidVideo = makeGetSectionVidVideo<ConcepFuncs, PlaceName>(
    concepFuncs
  );

  const { getSafeCamName, getSafeSegmentName } = makeCameraChangeUtils<
    ConcepFuncs,
    PlaceInfoByName,
    AnyCameraName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(concepFuncs, placeInfoByName, dollNames);

  // __________________________
  // temporary rules

  async function doWhenSectionVidPlayingAsync(sectionVidId: PlaceName) {
    return new Promise<void>((resolve, _reject) => {
      doWhenSectionVidPlaying(sectionVidId, resolve);
    });
  }

  function doWhenSectionVidStateChanges(
    sectionVidId: PlaceName,
    checkShouldRun: (newVidState: SectionVidState) => boolean,
    callback: () => void
  ) {
    const initialVidState =
      getState().sectionVids[sectionVidId].sectionVidState;
    // console.log(" - - - doWhenSectionVidStateChanges initial", initialVidState);
    if (checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName =
      "doWhenSectionVidStateChanges" + Math.random() + Math.random();

    startItemEffect({
      name: ruleName,
      onItemEffect: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;

        stopEffect(ruleName);
        callback();
      },
      check: {
        type: "sectionVids",
        prop: "sectionVidState",
        name: sectionVidId,
      },
      flow: "sectionVidStateUpdates",
      whenToRun: "subscribe",
    });
    return ruleName;
  }

  function doWhenSectionVidPlaying(
    sectionVidId: PlaceName,
    callback: () => void
  ) {
    return doWhenSectionVidStateChanges(
      sectionVidId,
      (newState) => newState === "play",
      callback
    );
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
    const placeSegmentTimesByCamera = placeInfoByName[safePlace]
      .segmentTimesByCamera as any;
    const typedCamName = safeCam as keyof typeof placeSegmentTimesByCamera;

    const placeSegmentDurations = placeInfoByName[safePlace].segmentDurations;

    const newTime = placeSegmentTimesByCamera[typedCamName][safeSegmentName];
    const newDuration =
      placeSegmentDurations[
        safeSegmentName as keyof typeof placeSegmentDurations
      ];

    return {
      time: newTime,
      duration: newDuration,
    };
  }

  // runs on changes to tick, in the checkVideoLoop flow

  function checkForVideoLoop(itemName: PlaceName) {
    // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSection for too many frames, then do something?
    const itemState = getState().sectionVids[itemName];
    const { nowSection, sectionVidState } = itemState;
    const backdropVid = getSectionVidVideo(itemName);

    // if (sectionVidState !== "play") {
    //   console.log(sectionVidState);
    // }
    // console.log(backdropVid?.currentTime, endTime);

    /*

  !nextSegmentNameWhenVidPlays &&
  !nextCamNameWhenVidPlays
  */

    if (
      // sectionVidState === "play" // might've been getting skipped sometimes?
      sectionVidState !== "unloaded" &&
      sectionVidState !== "waitingForUnload"
    ) {
      // console.log(sectionVidState);
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

      if (
        (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) &&
        // isAtOrAfterEndOfLoop &&
        !isAlreadyLoopingOrChangingSection
      ) {
        // setState({ sectionVids: { [itemName]: { wantToLoop: true } } }); // global handles setting wantToLoop for sectionVids now :)
        // setState({ global: { main: { wantToLoop: true } } });
        return true;
      }
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
