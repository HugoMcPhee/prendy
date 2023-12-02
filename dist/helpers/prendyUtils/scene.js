import { getRefs, getState, onNextTick, startItemEffect, stopEffect } from "repond";
import { getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";
export function getSegmentFromStoryRules(place, cam) {
    var _a, _b, _c;
    const globalRefs = getRefs().global.main;
    const foundRuleSegmentName = (_c = (_b = (_a = globalRefs.camSegmentRulesOptions) === null || _a === void 0 ? void 0 : _a[place]) === null || _b === void 0 ? void 0 : _b[cam]) === null || _c === void 0 ? void 0 : _c.call(_b, getUsefulStoryStuff());
    return foundRuleSegmentName;
}
export function doWhenNowSegmentChanges(checkingSegmentName, callback) {
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
export function doWhenNowCamChanges(
// WARNING This might mess up if the place changes while the cam change was waiting
checkingCamName, callback) {
    const { nowPlaceName } = getState().global.main;
    const initialNowCamName = getState().global.main.nowCamName;
    if (checkingCamName === initialNowCamName) {
        callback();
        return null;
    }
    const ruleName = "doWhenNowCamChanges" + Math.random();
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
export function doWhenNowPlaceChanges(checkingPlaceName, callback) {
    const { nowPlaceName } = getState().global.main;
    const initialNowPlaceName = getState().global.main.nowPlaceName;
    if (checkingPlaceName === initialNowPlaceName) {
        callback();
        return null;
    }
    const ruleName = "doWhenNowPlaceChanges" + Math.random();
    startItemEffect({
        name: ruleName,
        run: ({ newValue: newNowCamName }) => {
            if (newNowCamName === initialNowPlaceName)
                return;
            stopEffect(ruleName);
            callback();
        },
        check: { type: "global", prop: "nowPlaceName" },
        step: "default",
        atStepEnd: true,
    });
    return ruleName;
}
export function doWhenPlaceFullyLoaded(checkingPlaceName, callback) {
    const { nowPlaceName } = getState().global.main;
    const initialNowPlaceName = getState().global.main.nowPlaceName;
    const initialIsLoadingBetweenPlaces = getState().global.main.initialIsLoadingBetweenPlaces;
    if (checkingPlaceName === initialNowPlaceName && initialIsLoadingBetweenPlaces === false) {
        callback();
        return null;
    }
    const ruleName = "doWhenPlaceFullyLoaded" + Math.random();
    startItemEffect({
        name: ruleName,
        run: ({ newValue: isLoadingBetweenPlaces }) => {
            const nowPlaceName = getState().global.main.nowPlaceName;
            if (isLoadingBetweenPlaces === true || nowPlaceName !== checkingPlaceName)
                return;
            stopEffect(ruleName);
            callback();
        },
        check: { type: "global", prop: "isLoadingBetweenPlaces" },
        step: "default",
        atStepEnd: true,
    });
    return ruleName;
}
export async function waitForPlaceFullyLoaded(checkingPlaceName) {
    return new Promise((resolve) => {
        doWhenPlaceFullyLoaded(checkingPlaceName, resolve);
    });
}
export async function waitForNowPlaceToChange(checkingPlaceName) {
    return new Promise((resolve) => {
        doWhenNowPlaceChanges(checkingPlaceName, resolve);
    });
}
export async function waitForNowCamToChange(checkingCamName) {
    return new Promise((resolve) => {
        doWhenNowCamChanges(checkingCamName, resolve);
    });
}
export const waitForNextTick = () => new Promise((resolve) => onNextTick(resolve));
