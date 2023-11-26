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
    "moverUpdates",
    // updating internal video states
    "stateVidStateUpdates",
    "sliceVidStateUpdates",
    // game stuff
    "respondToNewPlace",
    "respondToNewPlaceStory",
    "cameraChange",
    "input",
    "editPosition",
    "positionReaction",
    "checkCollisions",
    "collisionReaction",
    "story",
    "storyReaction",
    "slatePosition",
    "slatePositionDontGoOverEdges",
    "slatePositionStartMovers",
    "dollAnimation",
    "dollAnimation2",
    "dollCorrectRotationAndPosition",
    "dollAnimationStartMovers",
    "positionUi",
    "loadNewPlaceModels",
    "loadNewPlace",
    // deciding and changing for next videos
    // "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSlice" , so mvoed to the last flow as a quick probably temporary fix
    "chooseVideoSlice",
    "sliceVidWantsToPlay",
    "sliceVidWantsToPlay2",
    "safeVidWantsToPlay",
    // ...MOVERS_STEPS
    "moversGoal",
    "moversStart",
    // drawing to the screen
    "default",
    "rendering",
    "overlay", // = painting extra scenes to show ontop of everything
];
export function makePrendyStores(prendyAssets) {
    return {
        keyboards: keyboards(),
        miniBubbles: miniBubbles(prendyAssets),
        global: global(prendyAssets),
        models: models(prendyAssets),
        dolls: dolls(prendyAssets),
        characters: characters(prendyAssets),
        players: players(prendyAssets),
        speechBubbles: speechBubbles(prendyAssets),
        places: places(prendyAssets),
        stateVids: stateVids(prendyAssets),
        sliceVids: sliceVids(prendyAssets),
    };
}
