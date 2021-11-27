// @refresh-reset
import React from "react";
import { PrendyConcepFuncs } from "../../concepts/typedConcepFuncs";
import {
  PrendyArt,
  PrendyOptions,
  PickupName,
  PickupsInfo,
} from "../../declarations";
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

export function makeScreenGui<ConcepFuncs extends PrendyConcepFuncs>(
  concepFuncs: ConcepFuncs,
  PRENDY_OPTIONS: PrendyOptions,
  prendyArt: PrendyArt
) {
  const { pickupsInfo, speechVidFiles, characterNames } = prendyArt;

  const AlarmText = makeAlarmText(concepFuncs);
  const LoadingOverlay = makeLoadingOverlay(concepFuncs);
  const MiniBubble = makeMiniBubble(concepFuncs);
  const Pickups = makePickups<ConcepFuncs, PickupName, PickupsInfo>(
    concepFuncs,
    pickupsInfo
  );
  const ScreenSticker = makeScreenSticker(concepFuncs);
  const SpeechBubble = makeSpeechBubble(
    concepFuncs,
    PRENDY_OPTIONS,
    speechVidFiles
  );
  const StoryOverlay = makeStoryOverlay(concepFuncs);
  const VirtualStick = makeVirtualStick(concepFuncs);
  const VirtualButtons = makeVirtualButtons(concepFuncs, PRENDY_OPTIONS);
  // const ShowStates = makeShowStates(concepFuncs);

  type Props = {};

  return function ScreenGui(_: Props) {
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
          <SpeechBubble name={characterName} key={characterName} />
        ))}
        <MiniBubble name="walkerMiniBubble" />
        <ScreenSticker />
        <VirtualStick />
        <VirtualButtons />
        <Pickups />
        {/* <ShowStates /> */}
      </div>
    );
  };
}
