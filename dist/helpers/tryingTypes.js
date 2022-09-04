// manual test
export default "default";
const testDoll = {
    hungry: 5,
    size: "medium",
    modelName: "person",
    dollAnimations: { running: true, walking: true },
};
function makeDoll(dollOptions) {
    return dollOptions;
}
const testDolls = {
    testPerson: makeDoll({
        modelName: "person",
        dollAnimations: { running: true, walking: true },
        hungry: 1,
        size: "medium",
    }),
    testPuppy: makeDoll({
        modelName: "puppy",
        dollAnimations: { chasing: true, trotting: true },
        hungry: 1,
        size: "medium",
    }),
};
const something = testDolls.testPerson.modelName === "person" &&
    testDolls.testPerson.dollAnimations.running;
