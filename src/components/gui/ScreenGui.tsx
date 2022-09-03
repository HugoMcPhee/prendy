// @refresh-reset
import React, { Fragment } from "react";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions, PickupName, PickupsInfo } from "../../declarations";
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

export function makeTyped_ScreenGui<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers,
  PRENDY_OPTIONS: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { pickupsInfo, speechVidFiles, characterNames } = prendyAssets;

  const AlarmText = makeTyped_AlarmText(storeHelpers);
  const LoadingOverlay = makeTyped_LoadingOverlay(storeHelpers);
  const MiniBubble = makeTyped_MiniBubble(storeHelpers);
  const Pickups = makeTyped_Pickups<StoreHelpers, PickupName, PickupsInfo>(storeHelpers, pickupsInfo);
  const ScreenSticker = makeTyped_ScreenSticker(storeHelpers);
  const SpeechBubble = makeTyped_SpeechBubble(storeHelpers, PRENDY_OPTIONS, speechVidFiles);
  const StoryOverlay = makeTyped_StoryOverlay(storeHelpers);
  const VirtualStick = makeTyped_VirtualStick(storeHelpers);
  const VirtualButtons = makeTyped_VirtualButtons(storeHelpers, PRENDY_OPTIONS);
  // const ShowStates = makeTyped_ShowStates(storeHelpers);

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
