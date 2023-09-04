import { MyTypes } from "../declarations";
import characters from "./characters";
import dolls from "./dolls/dolls";
import global from "./global/global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import sliceVids from "./sliceVids";
import speechBubbles from "./speechBubbles";
import stateVids from "./stateVids";

export const prendyStepNames = [
  "elapsedTimeUpdates",
  // updating internal video states
  "stateVidStateUpdates",
  "sliceVidStateUpdates",
  // game stuff
  "respondToNewPlace", // TODO Maybe use this for when a place loads, and the other "loadNewPlace" for starting to load a place?
  "respondToNewPlaceStory",
  "cameraChange", // meant for checking stuff like nowCamName and nowSegmentName changed by listening to sliceVidStateUpdates
  "input", // input updates position
  "editPosition", // editMovement" ,?
  "positionReaction", // ?
  "checkCollisions", // editMovement" ,?
  "collisionReaction",
  "story", // might need to set things for the next frame, so it can respond, OR have story stuff run in different flows ")"
  "storyReaction", // if playerMovingPaused was set in or before story, this is where it can be reacted to before dollAnimation
  "slatePosition",
  "slatePositionDontGoOverEdges",
  "slatePositionStartMovers",
  "dollAnimation",
  "dollAnimation2",
  "dollCorrectRotationAndPosition",
  "dollAnimationStartMovers",
  "positionUi", // positioned ui like speech bubbles
  "loadNewPlaceModels", //
  "loadNewPlace", // might ned a load new place, and respondToNewPlace seperate parts
  // deciding and changing for next videos
  // "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSlice" , so mvoed to the last flow as a quick probably temporary fix
  "chooseVideoSlice", // when game logic changes to choose a new video slice ( like when goalCamera or segment changes)
  "sliceVidWantsToPlay",
  "sliceVidWantsToPlay2", // just a easier way to react to a second subscriber in sliceVids , instead of inlining what to do when vidLetter_play and vidLetter_wait changes
  "safeVidWantsToPlay",
  // ...MOVERS_STEPS
  "moversGoal",
  "moversStart",
  // drawing to the screen
  "default", // draw components
  "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
  "overlay", // = painting extra scenes to show ontop of everything
] as const;

export type PrendyStepName = (typeof prendyStepNames)[number];

export function makePrendyStores<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  return {
    keyboards: keyboards(),
    miniBubbles: miniBubbles<T_MyTypes>(prendyAssets),
    global: global<T_MyTypes>(prendyAssets),
    models: models<T_MyTypes>(prendyAssets),
    dolls: dolls<T_MyTypes>(prendyAssets),
    characters: characters<T_MyTypes>(prendyAssets),
    players: players<T_MyTypes>(prendyAssets),
    speechBubbles: speechBubbles<T_MyTypes>(prendyAssets),
    places: places<T_MyTypes>(prendyAssets),
    stateVids: stateVids<T_MyTypes>(prendyAssets),
    sliceVids: sliceVids<T_MyTypes>(prendyAssets),
  };
}
