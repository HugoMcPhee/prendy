// @refresh-reset
import React, { Fragment } from "react";
import { get_AlarmText } from "./AlarmText";
import { get_LoadingOverlay } from "./LoadingOverlay";
import { get_MiniBubble } from "./MiniBubble";
import { get_Pickups } from "./Pickups/Pickups";
import { get_ScreenSticker } from "./ScreenSticker";
import { get_SpeechBubble } from "./SpeechBubbles/SpeechBubble";
import { get_StoryOverlay } from "./StoryOverlay";
import { get_VirtualButtons } from "./VirtualButtons";
import { get_VirtualStick } from "./VirtualStick";
// import { get_ShowStates } from "./ShowStates";
export function get_ScreenGui(prendyAssets, storeHelpers) {
    const { pickupsInfo, characterNames } = prendyAssets;
    const AlarmText = get_AlarmText(storeHelpers);
    const LoadingOverlay = get_LoadingOverlay(storeHelpers);
    const MiniBubble = get_MiniBubble(storeHelpers);
    const Pickups = get_Pickups(prendyAssets, storeHelpers);
    const ScreenSticker = get_ScreenSticker(storeHelpers);
    const SpeechBubble = get_SpeechBubble(prendyAssets, storeHelpers);
    const StoryOverlay = get_StoryOverlay(storeHelpers);
    const VirtualStick = get_VirtualStick(storeHelpers);
    const VirtualButtons = get_VirtualButtons(prendyAssets, storeHelpers);
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
