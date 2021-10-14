import { makeGlobalStoreUtils } from "../global/utils";
import { VidType } from "../../utils/consts";
import { SectionVidState, VidSection } from ".";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../typedConceptoFuncs";
import { makeCameraChangeUtils } from "../../concepts/global/utils/cameraChange";

// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)

export function makeGetSectionVidVideo<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceName extends string
>(conceptoFuncs: ConceptoFuncs) {
  const { getRefs, getState } = conceptoFuncs;

  return function getSectionVidVideo(
    itemName: PlaceName,
    vidType: VidType = "color"
  ) {
    const sectionVidState = getState().sectionVids[itemName];
    const { stackVidId_playing } = sectionVidState;
    if (!stackVidId_playing) return;

    const stackVidState = getState().stackVids[stackVidId_playing];
    const { vidAId, vidBId } = stackVidState;
    if (!vidAId || !vidBId) return;

    const isDepth = vidType === "depth";
    const colorVidRefs = getRefs().safeVids[isDepth ? vidBId : vidAId];
    return colorVidRefs.videoElement;
  };
}

export function makeSectionVidStoreUtils<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  PlaceName extends string,
  DollName extends string,
  AnyCameraName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  const { getState, startItemEffect, stopEffect } = conceptoFuncs;

  const { getGlobalState } = makeGlobalStoreUtils(conceptoFuncs);

  const getSectionVidVideo = makeGetSectionVidVideo<ConceptoFuncs, PlaceName>(
    conceptoFuncs
  );

  const { getSafeCamName, getSafeSegmentName } = makeCameraChangeUtils<
    ConceptoFuncs,
    PlaceInfoByName,
    AnyCameraName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(conceptoFuncs, placeInfoByName, dollNames);

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
    const initialVidState = getState().sectionVids[sectionVidId]
      .sectionVidState;
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
    const colorVid = getSectionVidVideo(itemName);
    const depthVid = getSectionVidVideo(itemName, "depth");

    // if (sectionVidState !== "play") {
    //   console.log(sectionVidState);
    // }
    // console.log(colorVid?.currentTime, endTime);

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
      const currentTime = colorVid?.currentTime ?? depthVid?.currentTime ?? 0;
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
