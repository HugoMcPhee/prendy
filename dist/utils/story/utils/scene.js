import { makeGetUsefulStoryStuff } from "../../../storyRuleMakers";
export function makeSceneStoryUtils(conceptoFuncs) {
    const { getRefs, getState, startItemEffect, stopEffect } = conceptoFuncs;
    const getUsefulStoryStuff = makeGetUsefulStoryStuff(conceptoFuncs);
    const globalRefs = getRefs().global.main;
    function getSegmentFromStoryRules(place, cam) {
        var _a, _b, _c;
        const foundRuleSegmentName = (_c = (_b = (_a = globalRefs.camSegmentRulesOptions) === null || _a === void 0 ? void 0 : _a[place]) === null || _b === void 0 ? void 0 : _b[cam]) === null || _c === void 0 ? void 0 : _c.call(_b, getUsefulStoryStuff());
        return foundRuleSegmentName;
    }
    function doWhenNowSegmentChanges(checkingSegmentName, callback) {
        const initialNowSegmentName = getState().global.main.nowSegmentName;
        if (checkingSegmentName === initialNowSegmentName) {
            callback();
            return null;
        }
        const ruleName = "doWhenNowSegmentChanges" + Math.random();
        startItemEffect({
            name: ruleName,
            onItemEffect: ({ newValue: newNowSegmentName }) => {
                if (newNowSegmentName !== checkingSegmentName)
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: { type: "global", prop: "nowSegmentName", name: "main" },
            flow: "cameraChange",
            whenToRun: "subscribe",
        });
        return ruleName;
    }
    function doWhenNowCamChanges(
    // WARNING This might mess up if the place changes while the cam change was waiting
    checkingCamName, callback) {
        const { nowPlaceName } = getState().global.main;
        const initialNowCamName = getState().places[nowPlaceName].nowCamName;
        if (checkingCamName === initialNowCamName) {
            callback();
            return null;
        }
        const ruleName = "doWhenNowSegmentChanges" + Math.random();
        startItemEffect({
            name: ruleName,
            onItemEffect: ({ newValue: newNowCamName, itemName }) => {
                if (itemName !== nowPlaceName)
                    return;
                if (newNowCamName !== checkingCamName)
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: { type: "places", prop: "nowCamName" },
            flow: "cameraChange",
            whenToRun: "subscribe",
        });
        return ruleName;
    }
    return {
        getSegmentFromStoryRules,
        doWhenNowSegmentChanges,
        doWhenNowCamChanges,
    };
}
