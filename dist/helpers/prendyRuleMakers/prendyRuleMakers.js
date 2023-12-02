import { breakableForEach, forEach } from "chootils/dist/loops";
import { getRefs, getState, makeNestedLeaveRuleMaker, makeNestedRuleMaker, makeRules, setState, startItemEffect, stopEffect, } from "repond";
import { meta } from "../../meta";
import { getCharDollStuff } from "../prendyUtils/characters";
export function getUsefulStoryStuff() {
    const storyState = getState().story.main;
    const storyRefs = getRefs().story.main;
    const globalState = getState().global.main;
    const { nowPlaceName, nowSegmentName } = globalState;
    const { nowCamName } = globalState;
    const placesRefs = getRefs().places;
    const placeRefs = placesRefs[nowPlaceName];
    const { camsRefs } = placesRefs[nowPlaceName];
    const camRefs = camsRefs[nowCamName];
    return {
        storyState,
        storyRefs,
        globalState,
        nowSegmentName: nowSegmentName,
        nowPlaceName: nowPlaceName,
        nowCamName: nowCamName,
        placesRefs: placesRefs,
        placeRefs: placeRefs,
        camsRefs: camsRefs,
        camRefs: camRefs,
    };
}
export function setStoryState(newState) {
    setState({ story: { main: newState } });
}
export function makeCamChangeRules(callBacksObject) {
    return makeNestedRuleMaker(["global", "main", "nowPlaceName"], ["global", "main", "nowCamName"], "cameraChange", getUsefulStoryStuff)(callBacksObject);
}
export function makeCamLeaveRules(callBacksObject) {
    return makeNestedLeaveRuleMaker(["global", "main", "nowPlaceName"], ["global", "main", "nowCamName"], "cameraChange", getUsefulStoryStuff)(callBacksObject);
}
export function makeCamSegmentRules(callBacksObject) {
    return {
        startAll() {
            // This sets an options object in global refs that gets checked when changing segment,
            // so no rules are actually started here, but it uses the same format as the other rule makers
            getRefs().global.main.camSegmentRulesOptions = callBacksObject;
        },
        stopAll() {
            /* nothing to stop */
        },
    };
}
export function makePickupsRules({ onUsePickupAtTrigger, onUsePickupToTalk, onUsePickupGenerally, }) {
    const onPickupButtonClick = (pickupName) => {
        const didUsePickupAtTrigger = onUsePickupAtTrigger(pickupName);
        const didUsePickupWithDoll = onUsePickupToTalk(pickupName);
        console.log("didUsePickupAtTrigger", didUsePickupAtTrigger);
        console.log("didUsePickupWithDoll", didUsePickupWithDoll);
        // NOTE the top two functions can return true if they ran,
        // and if neither returned true, it runs the general one
        if (!didUsePickupAtTrigger && !didUsePickupWithDoll) {
            onUsePickupGenerally(pickupName);
        }
    };
    return {
        startAll() {
            // This sets an onClick callback in global refs that gets called when clicking the pickup button,
            // so no rules are actually started here, but it uses the same format as the other rule makers
            getRefs().global.main.onPickupButtonClick = onPickupButtonClick;
        },
        stopAll() {
            /* nothing to stop */
        },
    };
}
export function makeInteractButtonRules({ onInteractAtTrigger, onInteractAtTalk, }) {
    const interactButtonRules = makeRules(({ itemEffect, effect }) => ({
        whenInteractButtonClicked: itemEffect({
            run() {
                onInteractAtTrigger();
                onInteractAtTalk();
            },
            check: { prop: "interactButtonPressTime", type: "players" },
            // atStepEnd: true,
            step: "story", // story insead of input, so virtual stick animations dont overwrite the story click ones
        }),
    }));
    return interactButtonRules;
}
// the returned function when the interact buttons clicked
export function makeOnInteractAtTrigger(callBacksObject, characterNameParam) {
    const onClickInteractButton = () => {
        const { placeInfoByName } = meta.assets;
        const characterName = characterNameParam || meta.assets.characterNames[0];
        const usefulStoryStuff = getUsefulStoryStuff();
        const { aConvoIsHappening, nowPlaceName, playerMovingPaused } = usefulStoryStuff.globalState;
        if (aConvoIsHappening || playerMovingPaused)
            return;
        const { atTriggers } = getState().characters[characterName];
        const triggerNames = placeInfoByName[nowPlaceName].triggerNames;
        // NOTE Could b breakable if only checking one trigger
        forEach(triggerNames, (triggerName) => {
            if (atTriggers[triggerName]) {
                // removing types to fix issue
                callBacksObject[nowPlaceName]?.[triggerName]?.(usefulStoryStuff);
            }
        });
    };
    return onClickInteractButton;
}
// the returned function gets run when interact button's clicked
export function makeOnInteractToTalk(callBacksObject, distanceType = "talk", characterNameParam) {
    const onClickInteractButton = () => {
        const characterName = characterNameParam || meta.assets.characterNames[0];
        const { dollNames } = meta.assets;
        const usefulStoryStuff = getUsefulStoryStuff();
        const { aConvoIsHappening, playerMovingPaused } = usefulStoryStuff.globalState;
        if (aConvoIsHappening || playerMovingPaused)
            return;
        const { dollState, dollRefs: charDollRefs, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
        if (!dollState)
            return;
        const { inRange } = dollState;
        breakableForEach(dollNames, (dollName) => {
            const dollState = getState().dolls[dollName];
            const callBackToRun = callBacksObject[dollName];
            const isInTalkRange = inRange[dollName][distanceType];
            // && dollState.isVisible
            if (dollName !== charDollName && isInTalkRange) {
                callBackToRun?.(usefulStoryStuff);
                return true; // break
            }
        });
    };
    return onClickInteractButton;
}
// the returned function gets run onClick in the pickup picture button gui
export function makeOnUsePickupAtTrigger(callBacksObject, characterNameParam) {
    const onClickPickupButton = (pickupName) => {
        const characterName = characterNameParam || meta.assets.characterNames[0];
        const { placeInfoByName } = meta.assets;
        const usefulStoryStuff = getUsefulStoryStuff();
        let didInteractWithSomething = false;
        const { aConvoIsHappening, nowPlaceName } = usefulStoryStuff.globalState;
        const { atTriggers } = getState().characters[characterName];
        console.log("makeOnUsePickupAtTrigger, aConvoIsHappening", aConvoIsHappening);
        if (aConvoIsHappening)
            return;
        const triggerNames = placeInfoByName[nowPlaceName].triggerNames;
        // NOTE Could b breakable if only checking one trigger
        forEach(triggerNames, (triggerName) => {
            if (atTriggers[triggerName]) {
                const whatToDo = callBacksObject?.[nowPlaceName]?.[triggerName]?.[pickupName];
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
export function makeOnUsePickupGenerally(callBacksObject) {
    const onClickPickupButton = (pickupName) => {
        const usefulStoryStuff = getUsefulStoryStuff();
        const { aConvoIsHappening } = usefulStoryStuff.globalState;
        if (aConvoIsHappening)
            return;
        // NOTE this should only run if an item wasn't just used with a trigger or a doll
        callBacksObject?.[pickupName]?.(usefulStoryStuff);
    };
    return onClickPickupButton;
}
// the returned function gets run onClick in the pickup picture button gui
export function makeOnUsePickupToTalk(callBacksObject, characterNameParam) {
    const onClickPickupButton = (pickupName) => {
        const characterName = characterNameParam || meta.assets.characterNames[0];
        const { dollNames } = meta.assets;
        let didInteractWithSomething = false;
        const usefulStoryStuff = getUsefulStoryStuff();
        const { aConvoIsHappening } = usefulStoryStuff.globalState;
        if (aConvoIsHappening)
            return;
        const { dollState, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
        if (!dollState)
            return;
        const { inRange } = dollState;
        breakableForEach(dollNames, (dollName) => {
            const whatToDo = callBacksObject[dollName]?.[pickupName];
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
export function makePlaceLoadRules(atStartOfEachPlace, callBacksObject) {
    return makeRules(({ itemEffect }) => ({
        whenPlaceFinishedLoading: itemEffect({
            run() {
                // onNextTick(() => {
                const usefulStoryStuff = getUsefulStoryStuff();
                const { nowPlaceName } = usefulStoryStuff;
                atStartOfEachPlace?.(usefulStoryStuff);
                callBacksObject[nowPlaceName]?.(usefulStoryStuff);
                // });
            },
            check: {
                type: "global",
                prop: ["isLoadingBetweenPlaces"],
                becomes: false,
            },
            // step: "respondToNewPlace",
            step: "respondToNewPlaceStory",
            atStepEnd: true,
        }),
    }));
}
export function makePlaceUnloadRules(callBacksObject) {
    return makeRules(({ itemEffect }) => ({
        whenPlaceFinishedUnloading: itemEffect({
            run({ previousValue: prevPlace, newValue: newPlace }) {
                let ruleName = startItemEffect({
                    run() {
                        stopEffect(ruleName);
                        // console.log("unload rules for", prevPlace);
                        const usefulStoryStuff = getUsefulStoryStuff();
                        callBacksObject[prevPlace]?.(usefulStoryStuff);
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
export function makeTouchRules(callBacksObject, options) {
    const { characterName, distanceType = "touch", whenLeave = false } = options ?? {};
    return makeRules(({ itemEffect }) => ({
        whenInRangeChangesToCheckTouch: itemEffect({
            run({ newValue: inRange, previousValue: prevInRange, itemName: changedDollName, itemState: dollState }) {
                const { dollNames } = meta.assets;
                const { playerCharacter } = getState().global.main;
                const charName = characterName || playerCharacter;
                const { dollName: charDollName } = getCharDollStuff(charName) ?? {};
                // at the moment runs for every doll instead of just the main character,
                // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
                if (!charDollName || changedDollName !== charDollName)
                    return;
                // || !dollState.isVisible
                const usefulStoryStuff = getUsefulStoryStuff();
                forEach(dollNames, (dollName) => {
                    const otherDollState = getState().dolls[dollName];
                    // if (!otherDollState.isVisible) return;
                    const justEntered = inRange[dollName][distanceType] && !prevInRange[dollName][distanceType];
                    const justLeft = !inRange[dollName][distanceType] && prevInRange[dollName][distanceType];
                    const whatToRun = callBacksObject[dollName];
                    if (dollName !== charDollName) {
                        if ((whenLeave && justLeft) || (!whenLeave && justEntered))
                            whatToRun?.(usefulStoryStuff);
                    }
                });
            },
            check: {
                prop: ["inRange"],
                type: "dolls",
            },
            name: `inRangeStoryRules_${characterName ?? "player"}_${distanceType}_${whenLeave}`,
            step: "collisionReaction",
            atStepEnd: true,
        }),
    }));
}
export function makeTriggerRules(callBacksObject, options) {
    // TODO make dynamic rule?
    // this won't update the playerCharacter at the moment
    const { whenLeave = false } = options ?? {};
    const charactersWithTriggers = Object.keys(callBacksObject);
    return makeRules(({ itemEffect }) => ({
        whenAtTriggersChanges: itemEffect({
            run({ newValue: atTriggers, previousValue: prevAtTriggers, itemName: characterName }) {
                const { placeInfoByName } = meta.assets;
                const usefulStoryStuff = getUsefulStoryStuff();
                const { nowPlaceName } = usefulStoryStuff;
                if (!callBacksObject[characterName]) {
                    return;
                }
                const triggerNames = placeInfoByName[nowPlaceName].triggerNames;
                forEach(triggerNames, (triggerName) => {
                    const justEntered = atTriggers[triggerName] && !prevAtTriggers[triggerName];
                    const justLeft = !atTriggers[triggerName] && prevAtTriggers[triggerName];
                    if ((whenLeave && justLeft) || (!whenLeave && justEntered)) {
                        callBacksObject[characterName]?.[nowPlaceName]?.[triggerName]?.(usefulStoryStuff);
                    }
                });
            },
            check: {
                prop: ["atTriggers"],
                type: "characters",
                name: charactersWithTriggers,
            },
            step: "collisionReaction",
        }),
    }));
}
