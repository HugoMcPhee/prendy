// @refresh-reset
import React, { Fragment } from "react";
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
export function makeScreenGui(storeHelpers, PRENDY_OPTIONS, prendyArt) {
    const { pickupsInfo, speechVidFiles, characterNames } = prendyArt;
    const AlarmText = makeAlarmText(storeHelpers);
    const LoadingOverlay = makeLoadingOverlay(storeHelpers);
    const MiniBubble = makeMiniBubble(storeHelpers);
    const Pickups = makePickups(storeHelpers, pickupsInfo);
    const ScreenSticker = makeScreenSticker(storeHelpers);
    const SpeechBubble = makeSpeechBubble(storeHelpers, PRENDY_OPTIONS, speechVidFiles);
    const StoryOverlay = makeStoryOverlay(storeHelpers);
    const VirtualStick = makeVirtualStick(storeHelpers);
    const VirtualButtons = makeVirtualButtons(storeHelpers, PRENDY_OPTIONS);
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
            characterNames.map((characterName) => (React.createElement(Fragment, { key: characterName },
                React.createElement(SpeechBubble, { name: characterName, key: characterName + "_speechBubble" }),
                React.createElement(MiniBubble, { name: characterName, key: characterName + "_miniBubble" })))),
            React.createElement(ScreenSticker, null),
            React.createElement(VirtualStick, null),
            React.createElement(VirtualButtons, null),
            React.createElement(Pickups, null)));
    };
}
