// @refresh-reset
import {
  GameyConceptoFuncs,
  PickupsInfoPlaceholder,
} from "../../concepts/typedConceptoFuncs";
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
  ConceptoFuncs extends GameyConceptoFuncs,
  CharacterName extends string,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(
  conceptoFuncs: ConceptoFuncs,
  characterNames: readonly CharacterName[],
  pickupsInfo: PickupsInfo
) {
  const AlarmText = makeAlarmText(conceptoFuncs);
  const LoadingOverlay = makeLoadingOverlay(conceptoFuncs);
  const MiniBubble = makeMiniBubble(conceptoFuncs);
  const Pickups = makePickups<ConceptoFuncs, PickupName, PickupsInfo>(
    conceptoFuncs,
    pickupsInfo
  );
  const ScreenSticker = makeScreenSticker(conceptoFuncs);
  const SpeechBubble = makeSpeechBubble(conceptoFuncs);
  const StoryOverlay = makeStoryOverlay(conceptoFuncs);
  const VirtualStick = makeVirtualStick(conceptoFuncs);
  // const ShowStates = makeShowStates(conceptoFuncs);

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
