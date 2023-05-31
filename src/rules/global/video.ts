// import { getRefs, getState, makeRules, setState } from "stores";
import { VidSlice } from "../../stores/sliceVids";
import { get_sliceVidUtils } from "../../helpers/prendyUtils/sliceVids";
import {
  AnyCameraName,
  AnySegmentName,
  PrendyAssets,
  PrendyOptions,
  CameraNameByPlace,
  PlaceName,
  SegmentNameByPlace,
} from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
import { get_cameraChangeUtils } from "../../helpers/prendyUtils/cameraChange";

export function get_globalVideoRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
  storeHelpers: StoreHelpers,
  _prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, getState, makeRules, setState } = storeHelpers;

  const {
    getSliceForPlace: getSliceForPlace,
    getSliceVidVideo: getSliceVidVideo,
    checkForVideoLoop,
  } = get_sliceVidUtils(storeHelpers, prendyStartOptions, prendyAssets);
  const { getSafeSegmentName, updateTexturesForNowCamera, updateNowStuffWhenSliceChanged } = get_cameraChangeUtils(
    storeHelpers,
    prendyStartOptions,
    prendyAssets
  );

  return makeRules(({ itemEffect, effect }) => ({
    whenWantToChooseVideoSlice: effect({
      run() {
        const {
          nowPlaceName,
          nowSegmentName,
          goalSegmentName,
          goalSegmentNameAtLoop,
          goalSegmentNameWhenVidPlays,
          goalPlaceName, // checking this as a very early way to know if its loading a new place, goToNewPlace , which sets goalSegmentName and goalCamName also sets goalPlaceName
          isLoadingBetweenPlaces,
        } = getState().global.main;

        const { goalCamNameWhenVidPlays, goalCamNameAtLoop, goalCamName, nowCamName } = getState().places[nowPlaceName];

        const { sliceVidState, goalSlice, wantToLoop, switchSlice_keepProgress } = getState().sliceVids[nowPlaceName];

        const videoIsOutsideOfCurrentLoop = checkForVideoLoop(nowPlaceName as PlaceName);

        // do all the deciding slice logic in here!

        // all other goal values get cleared each time
        let new_goalSegmentNameAtLoop = goalSegmentNameAtLoop;
        let new_goalCamNameAtLoop = goalCamNameAtLoop;

        let decided_goalCamName = goalCamName;
        let decided_goalSegmentName = goalSegmentName;
        let decided_wantToLoop = videoIsOutsideOfCurrentLoop;

        let decided_shouldKeepTime = true;

        let decided_goalSlice: VidSlice | null = null;

        const alreadyWaitingForASliceToChange = goalSegmentNameWhenVidPlays || goalCamNameWhenVidPlays;

        // if there's a goalPlaceName, so its starting to load the next-place
        if (goalPlaceName) {
          // NOTE , might still want to loop the videos when it's loading a new place ?
          // but it should fade out so hopefully don't need to, it might just show a little bit of the next part of the video while fading , but it can be fixed here if wanted

          if (alreadyWaitingForASliceToChange) {
            setState({
              global: { main: { goalSegmentNameAtLoop: null, goalSegmentNameWhenVidPlays: null } },
              places: { [nowPlaceName]: { goalCamNameAtLoop: null, goalCamNameWhenVidPlays: null } },
              sliceVids: { [nowPlaceName]: { goalSlice: null, wantToLoop: false } },
            });
          }

          return;
        }

        if (sliceVidState === "waitingForLoad" || isLoadingBetweenPlaces) return;

        // right now it skips this if its waiting for a slice change
        // this goal stuff should be checked every frame, then it will update when it's ready!
        if (alreadyWaitingForASliceToChange) return;

        if (videoIsOutsideOfCurrentLoop && (goalCamNameAtLoop || goalSegmentNameAtLoop)) {
          // it should now go to a new slice from the goal segment or cam at loop
          decided_goalCamName = goalCamName || goalCamNameAtLoop;
          decided_goalSegmentName = goalSegmentName || goalSegmentNameAtLoop;

          new_goalCamNameAtLoop = null;
          new_goalSegmentNameAtLoop = null;
        }

        if (decided_goalSegmentName || decided_goalCamName) {
          // it'll definately be a goalSlice next

          // set the other value if its undefined
          decided_goalCamName = decided_goalCamName || nowCamName;
          decided_goalSegmentName = decided_goalSegmentName || nowSegmentName;

          // make sure its a safe segment

          // TODO retype intital state to have segments as strings
          decided_goalSegmentName = getSafeSegmentName({
            cam: decided_goalCamName as CameraNameByPlace[PlaceName] & AnyCameraName,
            place: nowPlaceName as PlaceName,
            segment: decided_goalSegmentName as SegmentNameByPlace[PlaceName] & AnySegmentName,
            useStorySegmentRules: true, // NOTE this could mess with things when manually chaning segment
          });

          // if either the decided segment or camera is different to the now segment and camera
          if (!(decided_goalCamName === nowCamName && decided_goalSegmentName === nowSegmentName)) {
            decided_goalSlice = getSliceForPlace(
              nowPlaceName as PlaceName,
              decided_goalCamName as CameraNameByPlace[PlaceName] & AnyCameraName,
              decided_goalSegmentName! as SegmentNameByPlace[PlaceName] // decided_goalSegmentName should always be decided here
            );
            decided_wantToLoop = false;
          }
        }

        // if changing segments, don't keep the duration of the currently playing slice (which is good for changing cameras and keeping the same loop at different angles)
        if (decided_goalSegmentName !== nowSegmentName) {
          decided_shouldKeepTime = false;
        }

        if (videoIsOutsideOfCurrentLoop && !decided_goalCamName && !decided_goalSegmentName) {
          // it'll definately be a wantToLoop

          decided_wantToLoop = true;
          decided_goalSlice = null;
        }

        // set State for the global and place state, and also the sliceState

        const somethingChanged =
          goalSegmentName !== null ||
          new_goalSegmentNameAtLoop !== goalSegmentNameAtLoop ||
          decided_goalSegmentName !== goalSegmentNameWhenVidPlays ||
          goalCamName !== null ||
          new_goalCamNameAtLoop !== goalCamNameAtLoop ||
          decided_goalCamName !== goalCamNameWhenVidPlays ||
          decided_goalSlice !== goalSlice ||
          decided_wantToLoop !== wantToLoop ||
          decided_shouldKeepTime !== switchSlice_keepProgress;

        if (!somethingChanged) return;

        setState({
          global: {
            main: {
              goalSegmentName: null,
              goalSegmentNameAtLoop: new_goalSegmentNameAtLoop,
              // wantToLoop: false,
              goalSegmentNameWhenVidPlays: decided_goalSegmentName,
            },
          },
          places: {
            [nowPlaceName]: {
              goalCamName: null,
              goalCamNameAtLoop: new_goalCamNameAtLoop,
              goalCamNameWhenVidPlays: decided_goalCamName,
            },
          },
          sliceVids: {
            [nowPlaceName]: {
              goalSlice: decided_goalSlice,
              wantToLoop: decided_wantToLoop,
              switchSlice_keepProgress: decided_shouldKeepTime,
            },
          },
        });
      },
      // check every frame so it can handle goal things that didnt get set yet because there was already a waiting slice vid!
      check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
      step: "chooseVideoSlice",
      // atStepEnd: true, // NOTE changed this recently
    }),
    whenSliceVidChangedAndWantToUpdateNowCamAndSegment: itemEffect({
      run: () => updateNowStuffWhenSliceChanged(),
      check: { type: "sliceVids", prop: ["newPlayingVidStartedTime"] },
      step: "sliceVidStateUpdates",
      atStepEnd: true,
    }),

    //

    // previous stuff

    // note no setState's done in here so its running on subscribe
    whenNowCameraChanges: effect({
      run(diffInfo) {
        const globalState = getState().global.main;
        const { nowPlaceName, goalPlaceName } = globalState;
        if (goalPlaceName !== null) return;

        const { nowCamName } = getState().places[nowPlaceName];
        const globalChangedBools = diffInfo.propsChangedBool.global.main;
        const placeChangedBools = diffInfo.propsChangedBool.places[nowPlaceName];

        const placeChanged = globalChangedBools?.nowPlaceName;
        const cameraChanged = placeChangedBools?.nowCamName;

        if (!cameraChanged && !placeChanged) return;
        // if the place or camera changed
        updateTexturesForNowCamera(nowCamName as AnyCameraName);
      },
      check: { prop: ["nowCamName"], type: ["places"] },
      step: "cameraChange",
      atStepEnd: true,
    }),

    // __________________
    // Changing segments

    // NOTE FIXME TODO WARNING - this might not be still okay to use
    // it might be okay to run when nowCamName changed (since it always swaps the video between a-b vid_wait to vid_play
    whenPlayingVidElementsChanged: itemEffect({
      run({ itemName: videoPlaceName }) {
        // so video texture updates for looping vids (and when slice changes)
        const { nowPlaceName } = getState().global.main;
        const globalRefs = getRefs().global.main;
        if (videoPlaceName !== nowPlaceName) return;

        const backdropVidElement = getSliceVidVideo(nowPlaceName as PlaceName);
        if (!backdropVidElement) return;

        globalRefs.backdropVideoTex?.updateVid(backdropVidElement);
      },
      check: { type: "sliceVids", prop: "newPlayingVidStartedTime" },
      step: "cameraChange",
      atStepEnd: true,
    }),
  }));
}
