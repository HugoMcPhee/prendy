import { getRefs, getState } from "repond";

function handlePausingVideoWhenHidden(isHidden: boolean) {
  const { nowPlaceName, gameTimeSpeed } = getState().global.main;

  const sliceVidState = getState().sliceVids[nowPlaceName];
  const { stateVidId_playing, stateVidId_waiting } = sliceVidState;

  const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
  const backdropWaitVidRefs = getRefs().stateVids[stateVidId_waiting];

  if (isHidden) {
    // pause all videos
    backdropVidRefs.videoElement.playbackRate = 0;
    backdropWaitVidRefs.videoElement.playbackRate = 0;
  } else {
    // resume all videos
    backdropVidRefs.videoElement.playbackRate = gameTimeSpeed;
    backdropWaitVidRefs.videoElement.playbackRate = gameTimeSpeed;
  }
}

export function updateAppVisibility(event: Event) {
  if (document.visibilityState === "visible") {
    getRefs().global.main.gameIsInBackground = false;
    handlePausingVideoWhenHidden(false);
  } else if (document.visibilityState === "hidden") {
    getRefs().global.main.gameIsInBackground = true;
    handlePausingVideoWhenHidden(true);
  }
}
