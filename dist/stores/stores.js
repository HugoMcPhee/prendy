import characters from "./characters/characters";
import dolls from "./dolls/dolls";
import global from "./global/global";
import keyboards from "./keyboards/keyboards";
import miniBubbles from "./miniBubbles/miniBubbles";
import models from "./models/models";
import places from "./places/places";
import players from "./players/players";
import pointers from "./pointers/pointers";
import safeVids from "./safeVids/safeVids";
import sectionVids from "./sectionVids/sectionVids";
import speechBubbles from "./speechBubbles/speechBubbles";
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
export function makePrendyStores(prendyStartOptions, prendyAssets) {
    return {
        keyboards: keyboards(),
        miniBubbles: miniBubbles(prendyAssets),
        pointers: pointers(),
        global: global(prendyStartOptions, prendyAssets),
        models: models(prendyAssets),
        dolls: dolls(prendyAssets),
        characters: characters(prendyAssets),
        players: players(prendyStartOptions),
        speechBubbles: speechBubbles(prendyAssets),
        places: places(prendyAssets),
        safeVids: safeVids(prendyAssets),
        sectionVids: sectionVids(prendyAssets),
    };
}
