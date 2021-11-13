import { BackdopArt, BackdopOptions } from "../declarations";
import characters from "./characters";
import dolls from "./dolls";
import global from "./global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import pointers from "./pointers";
import safeVids from "./safeVids";
import sectionVids from "./sectionVids";
import speechBubbles from "./speechBubbles";

export const backdopFlowNames = [
  // updating internal video states
  "safeVidStateUpdates",
  "sectionVidStateUpdates",
  // game stuff
  "respondToNewPlace", // TODO Maybe use this for when a place loads, and the other "loadNewPlace" for starting to load a place?
  "cameraChange", // meant for checking stuff like nowCamName and nowSegmentName changed by listening to sectionVidStateUpdates
  "input", // input updates position
  "editPosition", // editMovement" ,?
  "positionReaction", // ?
  "checkCollisions", // editMovement" ,?
  "collisionReaction",
  "story", // might need to set things for the next frame, so it can respond, OR have story stuff run in different flows ")"
  "storyReaction", // if playerMovingPaused was set in or before story, this is where it can be reacted to before dollAnimation
  "planePosition",
  "planePositionStartMovers",
  "dollAnimation",
  "dollAnimation2",
  "dollAnimationStartMovers",
  "positionUi", // positioned ui like speech bubbles
  "loadNewPlaceModels", //
  "loadNewPlace", // might ned a load new place, and respondToNewPlace seperate parts
  // deciding and changing for next videos
  // "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSection" , so mvoed to the last flow as a quick probably temporary fix
  "chooseVideoSection", // when game logic changes to choose a new video section ( like when wantedCamera or segment changes)
  "sectionVidWantsToPlay",
  "sectionVidWantsToPlay2", // just a easier way to react to a second subscriber in sectionVids , instead of inlining what to do when vidLetter_play and vidLetter_wait changes
  "safeVidWantsToPlay",
  // drawing to the screen
  "default", // draw components
  "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
] as const;

export type FlowName = typeof backdopFlowNames[number];

export function makeBackdopConcepts(
  backdopStartOptions: BackdopOptions,
  backdopArt: BackdopArt
) {
  return {
    keyboards: keyboards(),
    miniBubbles: miniBubbles(),
    pointers: pointers(),
    global: global(backdopStartOptions, backdopArt),
    models: models(backdopArt),
    dolls: dolls(backdopArt),
    characters: characters(backdopArt),
    players: players(backdopStartOptions),
    speechBubbles: speechBubbles(backdopArt),
    places: places(backdopArt),
    safeVids: safeVids(backdopArt),
    sectionVids: sectionVids(backdopArt),
  };
}
