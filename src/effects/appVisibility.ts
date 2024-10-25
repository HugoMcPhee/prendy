import { getRefs, getState } from "repond";

export function updateAppVisibility(event: Event) {
  if (document.visibilityState === "visible") {
    getRefs().global.main.gameIsInBackground = false;
    // handlePausingVideoWhenHidden(false);
  } else if (document.visibilityState === "hidden") {
    getRefs().global.main.gameIsInBackground = true;
    // handlePausingVideoWhenHidden(true);
  }
}
