import { makePrendyOptions } from "../getPrendyOptions";
const TEST_START_OPTIONS = makePrendyOptions({
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
    headHeightOffsets: { walker: 2.75 },
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
