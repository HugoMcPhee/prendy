// @refresh-reset
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
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
import { makeVirtualButtons } from "./VirtualButtons";

export function makeScreenGui<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped,
  CharacterName extends string,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>,
  SpeechVidFiles extends Record<string, string>
>(
  concepFuncs: ConcepFuncs,
  BACKDOP_OPTIONS: BackdopOptions,
  characterNames: readonly CharacterName[],
  pickupsInfo: PickupsInfo,
  speechVidFiles: SpeechVidFiles
) {
  const AlarmText = makeAlarmText(concepFuncs);
  const LoadingOverlay = makeLoadingOverlay(concepFuncs);
  const MiniBubble = makeMiniBubble(concepFuncs);
  const Pickups = makePickups<ConcepFuncs, PickupName, PickupsInfo>(
    concepFuncs,
    pickupsInfo
  );
  const ScreenSticker = makeScreenSticker(concepFuncs);
  const SpeechBubble = makeSpeechBubble<
    ConcepFuncs,
    CharacterName,
    SpeechVidFiles
  >(concepFuncs, speechVidFiles);
  const StoryOverlay = makeStoryOverlay(concepFuncs);
  const VirtualStick = makeVirtualStick(concepFuncs);
  const VirtualButtons = makeVirtualButtons(concepFuncs, BACKDOP_OPTIONS);
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
