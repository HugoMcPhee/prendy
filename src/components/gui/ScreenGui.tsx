// @refresh-reset
import React, { Fragment } from "react";
import { PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../../declarations";
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

export function get_ScreenGui(
  storeHelpers: PrendyStoreHelpers,
  PRENDY_OPTIONS: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { pickupsInfo, speechVidFiles, characterNames } = prendyAssets;

  const AlarmText = get_AlarmText(storeHelpers);
  const LoadingOverlay = get_LoadingOverlay(storeHelpers);
  const MiniBubble = get_MiniBubble(storeHelpers);
  const Pickups = get_Pickups(storeHelpers, pickupsInfo);
  const ScreenSticker = get_ScreenSticker(storeHelpers);
  const SpeechBubble = get_SpeechBubble(storeHelpers, PRENDY_OPTIONS, speechVidFiles);
  const StoryOverlay = get_StoryOverlay(storeHelpers);
  const VirtualStick = get_VirtualStick(storeHelpers);
  const VirtualButtons = get_VirtualButtons(storeHelpers, PRENDY_OPTIONS);
  // const ShowStates = get_ShowStates(storeHelpers);

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
  };
}
