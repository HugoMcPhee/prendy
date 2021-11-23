// @refresh-reset
import React from "react";
import { makeAlarmText } from "./AlarmText";
import { makeLoadingOverlay } from "./LoadingOverlay";
import { makeMiniBubble } from "./MiniBubble";
import { makePickups } from "./Pickups";
import { makeScreenSticker } from "./ScreenSticker";
// import { makeShowStates } from "./ShowStates";
import { makeSpeechBubble } from "./SpeechBubbles/SpeechBubble";
import { makeStoryOverlay } from "./StoryOverlay";
import { makeVirtualButtons } from "./VirtualButtons";
import { makeVirtualStick } from "./VirtualStick";
export function makeScreenGui(concepFuncs, PRENDY_OPTIONS, prendyArt) {
    const { pickupsInfo, speechVidFiles, characterNames } = prendyArt;
    const AlarmText = makeAlarmText(concepFuncs);
    const LoadingOverlay = makeLoadingOverlay(concepFuncs);
    const MiniBubble = makeMiniBubble(concepFuncs);
    const Pickups = makePickups(concepFuncs, pickupsInfo);
    const ScreenSticker = makeScreenSticker(concepFuncs);
    const SpeechBubble = makeSpeechBubble(concepFuncs, speechVidFiles);
    const StoryOverlay = makeStoryOverlay(concepFuncs);
    const VirtualStick = makeVirtualStick(concepFuncs);
    const VirtualButtons = makeVirtualButtons(concepFuncs, PRENDY_OPTIONS);
    return function ScreenGui(_) {
        return (React.createElement("div", { style: {
                pointerEvents: "none",
                touchAction: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
            } },
            React.createElement(StoryOverlay, null),
            React.createElement(LoadingOverlay, null),
            React.createElement(AlarmText, null),
            characterNames.map((characterName) => (React.createElement(SpeechBubble, { name: characterName, key: characterName }))),
            React.createElement(MiniBubble, { name: "walkerMiniBubble" }),
            React.createElement(ScreenSticker, null),
            React.createElement(VirtualStick, null),
            React.createElement(VirtualButtons, null),
            React.createElement(Pickups, null)));
    };
}
