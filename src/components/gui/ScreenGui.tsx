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
// import { ShowStates } from "./ShowStates";

type Props = {};

export function ScreenGui(_: Props) {
  const { characterNames } = meta.assets!;

  return (
    <div
      style={{
        pointerEvents: "none",
        touchAction: "none",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <StoryOverlay />
      <LoadingOverlay />
      <AlarmText />
      {characterNames.map((characterName) => (
        <Fragment key={characterName}>
          <SpeechBubble name={characterName} key={characterName + "_speechBubble"} />
          <MiniBubble name={characterName} key={characterName + "_miniBubble"} />
        </Fragment>
      ))}
      {/*<MiniBubble name="walkerMiniBubble" />*/}
      <ScreenSticker />
      <VirtualStick />
      <VirtualButtons />
      <Pickups />
      {/* <ShowStates /> */}
    </div>
  );
}
