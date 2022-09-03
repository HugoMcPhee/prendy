// @refresh-reset
import React, { Fragment } from "react";
import { makeTyped_AlarmText } from "./AlarmText";
import { makeTyped_LoadingOverlay } from "./LoadingOverlay";
import { makeTyped_MiniBubble } from "./MiniBubble";
import { makeTyped_Pickups } from "./Pickups/Pickups";
import { makeTyped_ScreenSticker } from "./ScreenSticker";
import { makeTyped_SpeechBubble } from "./SpeechBubbles/SpeechBubble";
import { makeTyped_StoryOverlay } from "./StoryOverlay";
import { makeTyped_VirtualButtons } from "./VirtualButtons";
import { makeTyped_VirtualStick } from "./VirtualStick";
// import { makeTyped_ShowStates } from "./ShowStates";
export function makeTyped_ScreenGui(storeHelpers, PRENDY_OPTIONS, prendyAssets) {
    const { pickupsInfo, speechVidFiles, characterNames } = prendyAssets;
    const AlarmText = makeTyped_AlarmText(storeHelpers);
    const LoadingOverlay = makeTyped_LoadingOverlay(storeHelpers);
    const MiniBubble = makeTyped_MiniBubble(storeHelpers);
    const Pickups = makeTyped_Pickups(storeHelpers, pickupsInfo);
    const ScreenSticker = makeTyped_ScreenSticker(storeHelpers);
    const SpeechBubble = makeTyped_SpeechBubble(storeHelpers, PRENDY_OPTIONS, speechVidFiles);
    const StoryOverlay = makeTyped_StoryOverlay(storeHelpers);
    const VirtualStick = makeTyped_VirtualStick(storeHelpers);
    const VirtualButtons = makeTyped_VirtualButtons(storeHelpers, PRENDY_OPTIONS);
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
