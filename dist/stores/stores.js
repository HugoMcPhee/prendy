import characters from "./characters";
import dolls from "./dolls/dolls";
import global from "./global/global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import stateVids from "./stateVids";
import sliceVids from "./sliceVids";
import speechBubbles from "./speechBubbles";
export const prendyStepNames = [
    // updating internal video states
    "stateVidStateUpdates",
    "sliceVidStateUpdates",
    // game stuff
    "respondToNewPlace",
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
    // drawing to the screen
    "default",
    "rendering",
    "overlay", // = painting extra scenes to show ontop of everything
];
// NOTE the generic types are used to prevent the typescript compiler widneing
// [K_CharacterName in CharacterName] to [x: string]
// or
// Record<PlaceName, Something> to Record<string, Something>
// it keeps the types generic , which is good since the types are updated from each project (declaration merging)
export function makePrendyStores(prendyStartOptions, prendyAssets) {
    return {
        keyboards: keyboards(),
        miniBubbles: miniBubbles(prendyAssets),
        global: global(prendyStartOptions, prendyAssets),
        models: models(prendyAssets),
        dolls: dolls(prendyAssets),
        characters: characters(prendyAssets),
        players: players(prendyStartOptions),
        speechBubbles: speechBubbles(prendyAssets),
        places: places(prendyAssets, prendyStartOptions),
        stateVids: stateVids(prendyAssets),
        sliceVids: sliceVids(prendyAssets),
    };
}
