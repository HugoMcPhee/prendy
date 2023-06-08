import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";
export function get_sceneStoryUtils(storeHelpers) {
    const { getRefs, getState, startItemEffect, stopEffect } = storeHelpers;
    const getUsefulStoryStuff = get_getUsefulStoryStuff(storeHelpers);
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
            run: ({ newValue: newNowSegmentName }) => {
                // if (newNowSegmentName !== checkingSegmentName) return;
                // wait until the segment changed from the original (even if it doesn't change to the new one)
                if (newNowSegmentName === initialNowSegmentName)
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: { type: "global", prop: "nowSegmentName", name: "main" },
            step: "cameraChange",
            atStepEnd: true,
        });
        return ruleName;
    }
    function doWhenNowCamChanges(
    // WARNING This might mess up if the place changes while the cam change was waiting
    checkingCamName, callback) {
        const { nowPlaceName } = getState().global.main;
        const initialNowCamName = getState().global.main.nowCamName;
        if (checkingCamName === initialNowCamName) {
            callback();
            return null;
        }
        const ruleName = "doWhenNowSegmentChanges" + Math.random();
        startItemEffect({
            name: ruleName,
            run: ({ newValue: newNowCamName }) => {
                if (newNowCamName === initialNowCamName)
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: { type: "global", prop: "nowCamName" },
            step: "cameraChange",
            atStepEnd: true,
        });
        return ruleName;
    }
    return {
        getSegmentFromStoryRules,
        doWhenNowSegmentChanges,
        doWhenNowCamChanges,
    };
}
