// @refresh-reset
import {
  BackdopConcepFuncs,
  PickupsInfoPlaceholder,
} from "../../concepts/typedConcepFuncs";
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

export function makeScreenGui<
  ConcepFuncs extends BackdopConcepFuncs,
  CharacterName extends string,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(
  concepFuncs: ConcepFuncs,
  characterNames: readonly CharacterName[],
  pickupsInfo: PickupsInfo
) {
  const AlarmText = makeAlarmText(concepFuncs);
  const LoadingOverlay = makeLoadingOverlay(concepFuncs);
  const MiniBubble = makeMiniBubble(concepFuncs);
  const Pickups = makePickups<ConcepFuncs, PickupName, PickupsInfo>(
    concepFuncs,
    pickupsInfo
  );
  const ScreenSticker = makeScreenSticker(concepFuncs);
  const SpeechBubble = makeSpeechBubble(concepFuncs);
  const StoryOverlay = makeStoryOverlay(concepFuncs);
  const VirtualStick = makeVirtualStick(concepFuncs);
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
        <Pickups />
        {/* <ShowStates /> */}
      </div>
    );
  };
}
