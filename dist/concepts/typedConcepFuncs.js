import { createConcepts } from "concep";
import { backdopFlowNames } from ".";
import { makeGetBackdopOptions } from "../getBackdopOptions";
import { story_fake } from "../storyRuleMakers/fakeStoryConcepts";
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
const testGetBackdopOptions = makeGetBackdopOptions();
const TEST_START_OPTIONS = testGetBackdopOptions({
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
const testStuff = {
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
const placeholderBackdopConcepts = {
    keyboards: keyboards(),
    miniBubbles: miniBubbles(),
    pointers: pointers(),
    global: global(TEST_START_OPTIONS, testStuff.musicNames, testStuff.soundNames),
    models: models(testStuff.modelNames),
    dolls: dolls(testStuff.modelNames, testStuff.dollNames, testStuff.modelInfoByName, testStuff.dollOptions),
    characters: characters(testStuff.characterNames, testStuff.dollNames, testStuff.characterOptions),
    players: players(TEST_START_OPTIONS),
    speechBubbles: speechBubbles(testStuff.characterNames, testStuff.characterOptions, testStuff.fontNames),
    places: places(testStuff.placeNames, testStuff.placeInfoByName),
    safeVids: safeVids(testStuff.placeNames, testStuff.placeInfoByName),
    sectionVids: sectionVids(testStuff.placeNames),
    //
    story: story_fake(),
};
// const concepFuncs = _createConcepts_ForTypes(placeholderBackdopConcepts, {
const concepFuncs = createConcepts(placeholderBackdopConcepts, {
    flowNames: backdopFlowNames,
    dontSetMeta: true,
});
