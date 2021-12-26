import { breakableForEach, forEach } from "chootils/dist/loops";
import { makeGetCharDollStuff } from "../concepts/characters/utils";
// export each of the rule makers stuff from here :)
export function makeGetUsefulStoryStuff(storeHelpers) {
    const { getRefs, getState } = storeHelpers;
    return function getUsefulStoryStuff() {
        const storyState = getState().story.main;
        const storyRefs = getRefs().story.main;
        const globalState = getState().global.main;
        const { chapterName, storyPart } = storyState;
        const { nowPlaceName, nowSegmentName } = globalState;
        const allPlacesState = getState().places;
        const placeState = allPlacesState[nowPlaceName];
        const { nowCamName } = placeState;
        const placesRefs = getRefs().places;
        const placeRefs = placesRefs[nowPlaceName];
        const { camsRefs } = placesRefs[nowPlaceName];
        const camRefs = camsRefs[nowCamName];
        return {
            storyState,
            storyRefs,
            globalState,
            chapterName: chapterName,
            storyPart: storyPart,
            nowSegmentName: nowSegmentName,
            nowPlaceName: nowPlaceName,
            placeState: placeState,
            nowCamName: nowCamName,
            placesRefs: placesRefs,
            placeRefs: placeRefs,
            camsRefs: camsRefs,
            camRefs: camRefs,
        };
    };
}
export function makeSetStoryState(storeHelpers) {
    const { setState } = storeHelpers;
    return function setStoryState(newState) {
        setState({ story: { main: newState } });
    };
}
export function makeAllStoryRuleMakers(storeHelpers, placeInfoByName, characterNames, dollNames) {
    const { getRefs, getState, makeRules, startItemEffect, stopEffect, onNextTick, } = storeHelpers;
    const getCharDollStuff = makeGetCharDollStuff(storeHelpers);
    const getUsefulStoryStuff = makeGetUsefulStoryStuff(storeHelpers);
    function makeCamChangeRules(callBacksObject) {
        return makeRules(({ itemEffect }) => ({
            whenCameraChanges: itemEffect({
                run({ newValue: nowCamName }) {
                    var _a, _b;
                    const usefulStoryStuff = getUsefulStoryStuff();
                    const { nowPlaceName } = usefulStoryStuff;
                    (_b = (_a = callBacksObject[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[nowCamName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                },
                check: { prop: "nowCamName", type: "places" },
                step: "cameraChange",
                atStepEnd: true,
            }),
        }));
    }
    function makeCamLeaveRules(callBacksObject) {
        return makeRules(({ itemEffect }) => ({
            whenCameraChanges: itemEffect({
                run({ previousValue: prevCamName }) {
                    var _a, _b;
                    const usefulStoryStuff = getUsefulStoryStuff();
                    const { nowPlaceName } = usefulStoryStuff;
                    (_b = (_a = callBacksObject[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[prevCamName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                },
                check: { prop: "nowCamName", type: "places" },
                step: "cameraChange",
                atStepEnd: true,
            }),
        }));
    }
    //  This sets an options object in global refs that gets checked when changing segment
    function makeCamSegmentRules(callBacksObject) {
        setTimeout(() => {
            getRefs().global.main.camSegmentRulesOptions = callBacksObject;
        }, 0);
        return true;
    }
    // the returned function when the interact buttons clicked
    function makeOnInteractAtTrigger(callBacksObject, characterName = characterNames[0]) {
        const onClickInteractButton = () => {
            const usefulStoryStuff = getUsefulStoryStuff();
            const { aConvoIsHappening, nowPlaceName, playerMovingPaused, } = usefulStoryStuff.globalState;
            if (aConvoIsHappening || playerMovingPaused)
                return;
            const { atTriggers } = getState().characters[characterName];
            const triggerNames = placeInfoByName[nowPlaceName]
                .triggerNames;
            // NOTE Could b breakable if only checking one trigger
            forEach(triggerNames, (triggerName) => {
                var _a, _b;
                if (atTriggers[triggerName]) {
                    // removing types to fix issue
                    (_b = (_a = callBacksObject[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[triggerName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                }
            });
        };
        return onClickInteractButton;
    }
    // the returned function gets run when interact button's clicked
    function makeOnInteractToTalk(callBacksObject, characterName = characterNames[0]) {
        const onClickInteractButton = () => {
            var _a;
            const usefulStoryStuff = getUsefulStoryStuff();
            const { aConvoIsHappening, playerMovingPaused, } = usefulStoryStuff.globalState;
            if (aConvoIsHappening || playerMovingPaused)
                return;
            const { dollState, dollName: charDollName } = (_a = getCharDollStuff(characterName)) !== null && _a !== void 0 ? _a : {};
            if (!dollState)
                return;
            const { inRange } = dollState;
            breakableForEach(dollNames, (dollName) => {
                const callBackToRun = callBacksObject[dollName];
                const isInTalkRange = inRange[dollName].talk;
                if (dollName !== charDollName && isInTalkRange) {
                    callBackToRun === null || callBackToRun === void 0 ? void 0 : callBackToRun(usefulStoryStuff);
                    return true; // break
                }
            });
        };
        return onClickInteractButton;
    }
    // the returned function gets run onClick in the pickup picture button gui
    function makeOnUsePickupAtTrigger(callBacksObject, characterName = characterNames[0]) {
        const onClickPickupButton = (pickupName) => {
            let didInteractWithSomething = false;
            const usefulStoryStuff = getUsefulStoryStuff();
            const { aConvoIsHappening, nowPlaceName } = usefulStoryStuff.globalState;
            const { atTriggers } = getState().characters[characterName];
            if (aConvoIsHappening)
                return;
            const triggerNames = placeInfoByName[nowPlaceName]
                .triggerNames;
            // NOTE Could b breakable if only checking one trigger
            forEach(triggerNames, (triggerName) => {
                var _a, _b, _c;
                if (atTriggers[triggerName]) {
                    const whatToDo = (_c = (_b = (_a = callBacksObject) === null || _a === void 0 ? void 0 : _a[nowPlaceName]) === null || _b === void 0 ? void 0 : _b[triggerName]) === null || _c === void 0 ? void 0 : _c[pickupName];
                    if (whatToDo) {
                        whatToDo(usefulStoryStuff);
                        didInteractWithSomething = true;
                    }
                }
            });
            return didInteractWithSomething;
        };
        return onClickPickupButton;
    }
    // the returned function gets run onClick in the pickup picture button gui
    function makeOnUsePickupGenerally(callBacksObject) {
        const onClickPickupButton = (pickupName) => {
            var _a, _b;
            const usefulStoryStuff = getUsefulStoryStuff();
            const { aConvoIsHappening } = usefulStoryStuff.globalState;
            if (aConvoIsHappening)
                return;
            // NOTE this should only run if an item wasn't just used with a trigger or a doll
            (_b = (_a = callBacksObject) === null || _a === void 0 ? void 0 : _a[pickupName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
        };
        return onClickPickupButton;
    }
    // the returned function gets run onClick in the pickup picture button gui
    function makeOnUsePickupToTalk(callBacksObject, characterName = characterNames[0]) {
        const onClickPickupButton = (pickupName) => {
            var _a;
            let didInteractWithSomething = false;
            const usefulStoryStuff = getUsefulStoryStuff();
            const { aConvoIsHappening } = usefulStoryStuff.globalState;
            if (aConvoIsHappening)
                return;
            const { dollState, dollName: charDollName } = (_a = getCharDollStuff(characterName)) !== null && _a !== void 0 ? _a : {};
            if (!dollState)
                return;
            const { inRange } = dollState;
            breakableForEach(dollNames, (dollName) => {
                var _a;
                const whatToDo = (_a = callBacksObject[dollName]) === null || _a === void 0 ? void 0 : _a[pickupName];
                const isInTalkRange = inRange[dollName].talk;
                if (dollName !== charDollName && isInTalkRange) {
                    if (whatToDo) {
                        whatToDo(usefulStoryStuff);
                        didInteractWithSomething = true;
                    }
                    return true; // break
                }
            });
            return didInteractWithSomething;
        };
        return onClickPickupButton;
    }
    function makePlaceLoadRules(atStartOfEachPlace, callBacksObject) {
        return makeRules(({ itemEffect }) => ({
            whenPlaceFinishedLoading: itemEffect({
                run() {
                    var _a, _b;
                    // onNextTick(() => {
                    const usefulStoryStuff = getUsefulStoryStuff();
                    const { nowPlaceName } = usefulStoryStuff;
                    atStartOfEachPlace === null || atStartOfEachPlace === void 0 ? void 0 : atStartOfEachPlace(usefulStoryStuff);
                    (_b = (_a = callBacksObject)[nowPlaceName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                    // });
                },
                check: {
                    type: "global",
                    prop: ["isLoadingBetweenPlaces"],
                    becomes: false,
                },
                step: "respondToNewPlace",
                atStepEnd: true,
            }),
        }));
    }
    function makePlaceNotLoadedRules(callBacksObject) {
        return makeRules(({ itemEffect }) => ({
            whenPlaceFinishedLoading: itemEffect({
                run({ previousValue: prevPlace, newValue: newPlace }) {
                    let ruleName = startItemEffect({
                        run() {
                            var _a, _b;
                            stopEffect(ruleName);
                            // console.log("unload rules for", prevPlace);
                            const usefulStoryStuff = getUsefulStoryStuff();
                            (_b = (_a = callBacksObject)[prevPlace]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                        },
                        check: {
                            type: "global",
                            prop: ["isLoadingBetweenPlaces"],
                            becomes: false,
                        },
                        atStepEnd: true,
                        step: "input",
                    });
                },
                check: { type: "global", prop: ["nowPlaceName"] },
                step: "story",
                atStepEnd: true,
            }),
        }));
    }
    function makeStoryPartRules(callBacksObject) {
        return makeRules((_itemEffect, effect) => ({
            whenStoryPartChanges: effect({
                run(_diffInfo) {
                    var _a;
                    const usefulStoryStuff = getUsefulStoryStuff();
                    const { storyPart } = usefulStoryStuff;
                    (_a = callBacksObject[storyPart]) === null || _a === void 0 ? void 0 : _a.call(callBacksObject, usefulStoryStuff);
                },
                check: {
                    prop: ["storyPart"],
                    type: "story",
                },
                step: "story",
                atStepEnd: true,
            }),
        }));
    }
    function makeTouchRules(callBacksObject, options) {
        const { characterName = "walker", distanceType = "touch", whenLeave = false, } = options !== null && options !== void 0 ? options : {};
        return makeRules(({ itemEffect }) => ({
            whenInRangeChangesToCheckTouch: itemEffect({
                run({ newValue: inRange, previousValue: prevInRange, itemName: changedDollName, }) {
                    var _a;
                    const { dollName: charDollName } = (_a = getCharDollStuff(characterName)) !== null && _a !== void 0 ? _a : {};
                    // at the moment runs for every doll instead of just the main character,
                    // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
                    if (!charDollName || changedDollName !== charDollName)
                        return;
                    const usefulStoryStuff = getUsefulStoryStuff();
                    forEach(dollNames, (dollName) => {
                        const justEntered = inRange[dollName][distanceType] &&
                            !prevInRange[dollName][distanceType];
                        const justLeft = !inRange[dollName][distanceType] &&
                            prevInRange[dollName][distanceType];
                        // console.warn(dollName, { justEntered, justLeft });
                        const whatToRun = callBacksObject[dollName];
                        if (dollName !== charDollName) {
                            if ((whenLeave && justLeft) || (!whenLeave && justEntered))
                                whatToRun === null || whatToRun === void 0 ? void 0 : whatToRun(usefulStoryStuff);
                        }
                    });
                },
                check: {
                    prop: ["inRange"],
                    type: "dolls",
                },
                name: `inRangeStoryRules_${characterName}_${distanceType}_${whenLeave}`,
                step: "collisionReaction",
            }),
        }));
    }
    function makeTriggerRules(callBacksObject, options) {
        const { characterName = "walker", whenLeave = false } = options !== null && options !== void 0 ? options : {};
        return makeRules(({ itemEffect }) => ({
            whenAtTriggersChanges: itemEffect({
                run({ newValue: atTriggers, previousValue: prevAtTriggers }) {
                    const usefulStoryStuff = getUsefulStoryStuff();
                    const { nowPlaceName } = usefulStoryStuff;
                    const triggerNames = placeInfoByName[nowPlaceName]
                        .triggerNames;
                    forEach(triggerNames, (triggerName) => {
                        var _a, _b;
                        const justEntered = atTriggers[triggerName] && !prevAtTriggers[triggerName];
                        const justLeft = !atTriggers[triggerName] && prevAtTriggers[triggerName];
                        if ((whenLeave && justLeft) || (!whenLeave && justEntered)) {
                            (_b = (_a = callBacksObject[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[triggerName]) === null || _b === void 0 ? void 0 : _b.call(_a, usefulStoryStuff);
                        }
                    });
                },
                check: {
                    prop: ["atTriggers"],
                    type: "characters",
                    name: characterName,
                },
                step: "collisionReaction",
            }),
        }));
    }
    return {
        makeCamChangeRules,
        makeCamLeaveRules,
        makeCamSegmentRules,
        makeOnInteractAtTrigger,
        makeOnInteractToTalk,
        makeOnUsePickupAtTrigger,
        makeOnUsePickupGenerally,
        makeOnUsePickupToTalk,
        makePlaceLoadRules,
        makePlaceNotLoadedRules,
        makeStoryPartRules,
        makeTouchRules,
        makeTriggerRules,
    };
}
