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
import stackVids from "./stackVids";
export const backdopFlowNames = [
    // updating internal video states
    "safeVidStateUpdates",
    "stackVidStateUpdates",
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
    "checkVideoLoop",
    "chooseVideoSection",
    "sectionVidWantsToPlay",
    "sectionVidWantsToPlay2",
    "stackVidWantsToPlay",
    "safeVidWantsToPlay",
    // drawing to the screen
    "default",
    "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
];
export function makeBackdopConcepts(backdopStartOptions, placeInfoByName, modelInfoByName, dollOptions, characterOptions, placeNames, modelNames, dollNames, characterNames, musicNames, soundNames, fontNames) {
    return {
        keyboards: keyboards(),
        miniBubbles: miniBubbles(),
        pointers: pointers(),
        global: global(backdopStartOptions, musicNames, soundNames),
        models: models(modelNames),
        dolls: dolls(modelNames, dollNames, modelInfoByName, dollOptions),
        characters: characters(characterNames, dollNames, characterOptions),
        players: players(backdopStartOptions),
        speechBubbles: speechBubbles(characterNames, characterOptions, fontNames),
        places: places(placeNames, placeInfoByName),
        safeVids: safeVids(placeNames, placeInfoByName),
        stackVids: stackVids(placeNames),
        sectionVids: sectionVids(placeNames),
    };
}
