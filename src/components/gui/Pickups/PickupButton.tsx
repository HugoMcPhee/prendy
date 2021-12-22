// @refresh-reset
import React, { useState } from "react";
import {
  PrendyStoreHelpers,
  PickupsInfoPlaceholder,
} from "../../../concepts/typedStoreHelpers";

export function makePickupButton<
  StoreHelpers extends PrendyStoreHelpers,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(storeHelpers: StoreHelpers, pickupsInfo: PickupsInfo) {
  const { getRefs } = storeHelpers;

  type Props = { name: PickupName };

  const globalRefs = getRefs().global.main;

  return function PickupButton({ name }: Props) {
    const pickupInfo = pickupsInfo[name];

    const [isPressed, setIsPressed] = useState(false);

    return (
      <button
        onClick={() => globalRefs.onPickupButtonClick?.(name)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={{
          pointerEvents: "auto",
          zIndex: 10000,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          flexDirection: "row",
          backgroundColor: "transparent",
          // opacity: isPressed ? 0.5 : 1,
          border: "none",
          transition: "transform 0.15s ease-out",
          transform: `scale(${isPressed ? 1.5 : 1})`,
        }}
      >
        <img
          src={pickupInfo.image}
          alt={name}
          // width={50}
          // height={50}
          style={{
            width: "7vmin",
            height: "7vmin",
            minWidth: "50px",
            minHeight: "50px",
          }}
        />
      </button>
    );
  };
}
