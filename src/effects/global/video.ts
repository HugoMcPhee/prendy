import { getRefs, getState, makeEffects, onNextTick, setState } from "repond";
import { getSafeSegmentName, updateTexturesForNowCamera } from "../../helpers/prendyUtils/cameraChange";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../types";
import { meta } from "../../meta";
import { focusSlateOnFocusedDoll } from "../../helpers/babylonjs/slate";

export const globalVideoEffects = makeEffects(({ itemEffect, effect }) => ({
  whenWantToUpdateBackdropFrameInfo: effect({
    run({}, frameDuration) {
      const {
        nowPlaceName,
        nowSegmentName,
        goalSegmentName,
        goalSegmentNameAtLoop,
        goalSegmentNameWhenVidPlays,
        goalPlaceName, // checking this as a very early way to know if its loading a new place, goToNewPlace , which sets goalSegmentName and goalCamName also sets goalPlaceName
        isLoadingBetweenPlaces,
        readyToSwapPlace,
        //
        backdropTime,
        backdropFrame,
      } = getState().global.main;

      const { goalCamNameAtLoop, goalCamName, nowCamName, gameTimeSpeed } = getState().global.main;
      // const videoIsOutsideOfCurrentLoop = checkForVideoLoop(nowPlaceName as PlaceName);
      // const videoIsAlreadyChanging = checkIfVideoAlreadyChanging(nowPlaceName);

      // all other goal values get cleared each time
      let new_goalSegmentNameAtLoop = goalSegmentNameAtLoop;
      let new_goalCamNameAtLoop = goalCamNameAtLoop;

      let new_goalCamName = goalCamName;
      let new_goalSegmentName = goalSegmentName;
      let new_wantToLoop = false;

      let new_shouldKeepTime = true;

      const { placeInfoByName } = meta.assets!;

      const nowPlaceInfo = placeInfoByName[nowPlaceName];

      // if there's a goalPlaceName, so its starting to load the next-place
      if (goalPlaceName) {
        // NOTE , might still want to loop the videos when it's loading a new place ?
        // but it should fade out so hopefully don't need to, it might just show a little bit of the next part of the video while fading , but it can be fixed here if wanted
        // return;
      }

      if (isLoadingBetweenPlaces) return;

      if (new_wantToLoop && (goalCamNameAtLoop || goalSegmentNameAtLoop)) {
        new_goalCamName = goalCamName || goalCamNameAtLoop;
        new_goalSegmentName = goalSegmentName || goalSegmentNameAtLoop;

        new_goalCamNameAtLoop = null;
        new_goalSegmentNameAtLoop = null;
      }

      if (new_goalSegmentName || new_goalCamName) {
        // set the other value if its undefined
        new_goalCamName = new_goalCamName || nowCamName;
        new_goalSegmentName = new_goalSegmentName || nowSegmentName;

        // make sure its a safe segment

        // TODO retype intital state to have segments as strings
        new_goalSegmentName = getSafeSegmentName({
          cam: new_goalCamName as CameraNameByPlace[PlaceName] & AnyCameraName,
          place: nowPlaceName as PlaceName,
          segment: new_goalSegmentName as SegmentNameByPlace[PlaceName] & AnySegmentName,
          useStorySegmentRules: true, // NOTE this could mess with things when manually chaning segment
        });

        // if either the decided segment or camera is different to the now segment and camera
        if (!(new_goalCamName === nowCamName && new_goalSegmentName === nowSegmentName)) {
          new_wantToLoop = false;
        }
      }

      // if changing segments, don't keep the duration of the currently playing backdrop (which is good for changing cameras and keeping the same loop at different angles)
      if (new_goalSegmentName !== nowSegmentName) {
        new_shouldKeepTime = false;
      }

      // ------------------------------------------------
      // Backrop times:
      let new_backdropTime = backdropTime + frameDuration * gameTimeSpeed;

      const backdropInfo =
        nowPlaceInfo.backdropsByCamera[nowCamName as AnyCameraName][nowSegmentName as AnySegmentName];

      const { frameRate, totalFrames } = backdropInfo;

      // if (new_backdropTime > segmentDuration) {
      //   // if the time is over the duration, then it should loop
      //   new_backdropTime = 0;
      //   new_wantToLoop = true;
      // }
      let new_backdropFrame = Math.floor((new_backdropTime * frameRate) / 1000);

      if (new_backdropFrame >= totalFrames) {
        new_backdropFrame = 0;
        new_backdropTime = 0;
        new_wantToLoop = true;
      }
      // NOTE I think it always keeps the segment time when changing cameras

      // ------------------------------------------------

      // set State for global and sliceVids

      const somethingChanged =
        goalSegmentName !== null ||
        new_goalSegmentNameAtLoop !== goalSegmentNameAtLoop ||
        new_goalSegmentName !== goalSegmentNameWhenVidPlays ||
        goalCamName !== null ||
        new_goalCamNameAtLoop !== goalCamNameAtLoop ||
        new_backdropTime !== backdropTime ||
        new_backdropFrame !== backdropFrame;

      if (!somethingChanged) return;

      // onNextTick(() => {
      setState({
        global: {
          main: {
            goalSegmentName: null,
            goalSegmentNameAtLoop: new_goalSegmentNameAtLoop,
            nowSegmentName: new_goalSegmentName ?? nowSegmentName,
            // goalCamName: null,
            // goalCamName: new_goalCamName ?? nowCamName,
            nowCamName: new_goalCamName ?? nowCamName,
            goalCamNameAtLoop: new_goalCamNameAtLoop,
            // switchSegment_keepProgress
            backdropFrame: new_backdropFrame,
            backdropTime: new_backdropTime,
          },
        },
      });
      // });
    },
    // check every frame so it can handle goal things that didnt get set yet because there was already a waiting slice vid!
    check: { type: ["global"], id: ["main"], prop: ["frameTick"] },
    step: "updateBackdropFrameInfo",
    // atStepEnd: true, // NOTE changed this recently
  }),
  // note no setState's done in here so its running on subscribe
  whenNowCameraChanges: effect({
    run(diffInfo) {
      const globalState = getState().global.main;
      const { goalPlaceName } = globalState;
      // if (goalPlaceName !== null) return;

      const { nowCamName } = getState().global.main;
      const globalChangedBools = diffInfo.propsChangedBool.global.main;

      const placeChanged = globalChangedBools?.nowPlaceName;
      const cameraChanged = globalChangedBools?.nowCamName;

      if (!cameraChanged && !placeChanged) return;
      // if the place or camera changed
      // onNextTick(() => {
      // onNextTick(() => {
      // onNextTick(() => {
      // onNextTick(() => {
      // onNextTick(() => {
      updateTexturesForNowCamera(nowCamName as AnyCameraName);
      // });
      // });
      // });
      // });
      // });
    },
    check: { prop: ["nowCamName"], type: ["global"] },
    step: "cameraChange",
    atStepEnd: true,
  }),

  // __________________
  // Changing segments

  // NOTE FIXME TODO WARNING - this might not be still okay to use
  // it might be okay to run when nowCamName changed (since it always swaps the video between a-b vid_wait to vid_play
  whenPlayingVidElementsChanged: itemEffect({
    run({ itemId: videoPlaceName }) {
      // so video texture updates for looping vids (and when slice changes)
      const { nowPlaceName } = getState().global.main;
      const globalRefs = getRefs().global.main;
      if (videoPlaceName !== nowPlaceName) return;
    },
    check: { type: "sliceVids", prop: "newPlayingVidStartedTime" },
    step: "cameraChange",
    atStepEnd: true,
  }),
}));
