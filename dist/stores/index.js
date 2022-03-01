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
export const prendyStepNames = [
    // updating internal video states
    "safeVidStateUpdates",
    "sectionVidStateUpdates",
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
    "planePosition",
    "planePositionStartMovers",
    "dollAnimation",
    "dollAnimation2",
    "dollAnimationStartMovers",
    "positionUi",
    "loadNewPlaceModels",
    "loadNewPlace",
    // deciding and changing for next videos
    // "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSection" , so mvoed to the last flow as a quick probably temporary fix
    "chooseVideoSection",
    "sectionVidWantsToPlay",
    "sectionVidWantsToPlay2",
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
export function makePrendyStores(prendyStartOptions, prendyArt) {
    return {
        keyboards: keyboards(),
        miniBubbles: miniBubbles(),
        pointers: pointers(),
        global: global(prendyStartOptions, prendyArt),
        models: models(prendyArt),
        dolls: dolls(prendyArt),
        characters: characters(prendyArt),
        players: players(prendyStartOptions),
        speechBubbles: speechBubbles(prendyArt),
        places: places(prendyArt),
        safeVids: safeVids(prendyArt),
        sectionVids: sectionVids(prendyArt),
    };
}
