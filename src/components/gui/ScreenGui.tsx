// @refresh-reset
import React from "react";
import { PrendyStoreHelpers } from "../../concepts/typedStoreHelpers";
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

export function makeScreenGui<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers,
  PRENDY_OPTIONS: PrendyOptions,
  prendyArt: PrendyArt
) {
  const { pickupsInfo, speechVidFiles, characterNames } = prendyArt;

  const AlarmText = makeAlarmText(storeHelpers);
  const LoadingOverlay = makeLoadingOverlay(storeHelpers);
  const MiniBubble = makeMiniBubble(storeHelpers);
  const Pickups = makePickups<StoreHelpers, PickupName, PickupsInfo>(
    storeHelpers,
    pickupsInfo
  );
  const ScreenSticker = makeScreenSticker(storeHelpers);
  const SpeechBubble = makeSpeechBubble(
    storeHelpers,
    PRENDY_OPTIONS,
    speechVidFiles
  );
  const StoryOverlay = makeStoryOverlay(storeHelpers);
  const VirtualStick = makeVirtualStick(storeHelpers);
  const VirtualButtons = makeVirtualButtons(storeHelpers, PRENDY_OPTIONS);
  // const ShowStates = makeShowStates(storeHelpers);

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
