import React from "react";
import { makeAlarmText } from "./AlarmText";
import { makeLoadingOverlay } from "./LoadingOverlay";
import { makeMiniBubble } from "./MiniBubble";
import { makePickups } from "./Pickups";
import { makeScreenSticker } from "./ScreenSticker";
// import { makeShowStates } from "./ShowStates";
import { makeSpeechBubble } from "./SpeechBubbles/SpeechBubble";
import { makeStoryOverlay } from "./StoryOverlay";
import { makeVirtualStick } from "./VirtualStick";
export function makeScreenGui(conceptoFuncs, characterNames, pickupsInfo) {
    const AlarmText = makeAlarmText(conceptoFuncs);
    const LoadingOverlay = makeLoadingOverlay(conceptoFuncs);
    const MiniBubble = makeMiniBubble(conceptoFuncs);
    const Pickups = makePickups(conceptoFuncs, pickupsInfo);
    const ScreenSticker = makeScreenSticker(conceptoFuncs);
    const SpeechBubble = makeSpeechBubble(conceptoFuncs);
    const StoryOverlay = makeStoryOverlay(conceptoFuncs);
    const VirtualStick = makeVirtualStick(conceptoFuncs);
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
            React.createElement(Pickups, null)));
    };
}
