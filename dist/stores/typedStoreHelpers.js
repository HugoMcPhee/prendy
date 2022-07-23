import { createStoreHelpers } from "pietem";
import { prendyStepNames } from ".";
import { getPrendyOptions } from "../getPrendyOptions";
import { story_fake } from "../storyRuleMakers/fakeStoryStore";
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
const TEST_START_OPTIONS = getPrendyOptions({
    // place: "cave",
    // segment: "start",
    // camera: "View_Camera",
    place: "street",
    segment: "start",
    camera: "test_low_cam",
    heldPickups: [],
    playerCharacter: "walker",
    playerAnimations: { walking: "walker_walking", idle: "walker_idle" },
    zoomLevels: { default: 1.1, max: 2 },
    walkSpeed: 10,
    animationSpeed: 1,
    headHeightOffset: -0.5,
    doorsInfo: {
        street: {
        // test_trigger: {
        //   toPlace: "cityb",
        //   toCam: "looping",
        //   toSegment: "start",
        //   toSpot: "start_spot",
        // },
        },
    },
    modelNamesByPlace: {
        street: ["walker", "cat", "chef", "fakefish", "fish", "ladder", "taptop"],
    },
});
const testNames = ["testA", "testB"];
const getModelInfoByName = () => ({
    modelFile: "test",
    animationNames: testNames,
    boneNames: testNames,
    meshNames: testNames,
    materialNames: testNames,
    skeletonName: "test",
});
const testArtStuff = {
    modelNames: ["modelA", "modelB"],
    dollNames: ["dollA", "dollB"],
    placeNames: ["placeA"],
    characterNames: ["characterA", "characterB"],
    musicNames: ["musicA", "musicB"],
    soundNames: ["soundA", "soundB"],
    fontNames: ["fontA", "fontB"],
    modelInfoByName: {
        modelA: getModelInfoByName(),
        modelB: getModelInfoByName(),
    },
    placeInfoByName: {
        placeA: {
            modelFile: "test",
            videoFiles: { backdrop: "test" },
            cameraNames: testNames,
            segmentDurations: { start: 1 },
            segmentNames: testNames,
            wallNames: testNames,
            floorNames: testNames,
            triggerNames: testNames,
            spotNames: testNames,
            soundspotNames: testNames,
            probesByCamera: { camA: "test" },
            segmentTimesByCamera: { camA: { start: 0 } },
        },
    },
    dollOptions: {
        characterA: { model: "modelA" },
        characterB: { model: "modelB" },
    },
    characterOptions: {
        characterA: { doll: "dollA", font: "fontA" },
        characterB: { doll: "dollB", font: "fontA" },
    },
};
const placeholderPrendyStores = {
    keyboards: keyboards(),
    miniBubbles: miniBubbles(testArtStuff),
    pointers: pointers(),
    global: global(TEST_START_OPTIONS, testArtStuff),
    models: models(testArtStuff),
    dolls: dolls(testArtStuff),
    characters: characters(testArtStuff),
    players: players(TEST_START_OPTIONS),
    speechBubbles: speechBubbles(testArtStuff),
    places: places(testArtStuff),
    safeVids: safeVids(testArtStuff),
    sectionVids: sectionVids(testArtStuff),
    //
    story: story_fake(),
};
// const storeHelpers = _createStoreHelpers_ForTypes(placeholderPrendyStores, {
const storeHelpers = createStoreHelpers(placeholderPrendyStores, {
    stepNames: prendyStepNames,
    dontSetMeta: true,
});
