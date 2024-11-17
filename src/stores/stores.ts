import { repondEventsStores } from "repond-events";
import { MyTypes } from "../declarations";
import characters from "./characters";
import dolls from "./dolls/dolls";
import global from "./global/global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import speechBubbles from "./speechBubbles";

export const prendyStepNames = [
  "elapsedTimeUpdates",
  "eventUpdates",
  "moverUpdates",
  "updateBackdropFrameInfo", // when game logic changes to choose a new video slice ( like when goalCamera or segment changes)
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
  // ...MOVERS_STEPS
  "moversGoal",
  "moversStart",
  // drawing to the screen
  "default", // draw components
  "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
  "overlay", // = painting extra scenes to show ontop of everything
] as const;

export type PrendyStepName = (typeof prendyStepNames)[number];

// NOTE stores are made before prendy is initialized, so they probably have to be made as a factory function with assets passed in

export function makePrendyStores<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  return {
    ...repondEventsStores,
    keyboards: keyboards(),
    miniBubbles: miniBubbles<T_MyTypes>(prendyAssets),
    global: global<T_MyTypes>(prendyAssets),
    models: models<T_MyTypes>(prendyAssets),
    dolls: dolls<T_MyTypes>(prendyAssets),
    characters: characters<T_MyTypes>(prendyAssets),
    players: players<T_MyTypes>(prendyAssets),
    speechBubbles: speechBubbles<T_MyTypes>(prendyAssets),
    places: places<T_MyTypes>(prendyAssets),
    // stateVids: stateVids<T_MyTypes>(prendyAssets),
    // sliceVids: sliceVids<T_MyTypes>(prendyAssets),
  };
}
