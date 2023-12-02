// @refresh-reset
import React, { Fragment } from "react";
import { meta } from "../../meta";
import { AlarmText } from "./AlarmText";
import { LoadingOverlay } from "./LoadingOverlay";
import { MiniBubble } from "./MiniBubble";
import { Pickups } from "./Pickups/Pickups";
import { ScreenSticker } from "./ScreenSticker";
import { SpeechBubble } from "./SpeechBubbles/SpeechBubble";
import { StoryOverlay } from "./StoryOverlay";
import { VirtualButtons } from "./VirtualButtons";
import { VirtualStick } from "./VirtualStick";
export function ScreenGui(_) {
    const { characterNames } = meta.assets;
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
}
