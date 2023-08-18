// @refresh-reset
import React, { useRef, useState } from "react";
import { MyTypes } from "../../../declarations";

export function get_PickupButton<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type PickupName = T_MyTypes["Main"]["PickupName"];

  const { pickupsInfo } = prendyAssets;
  const { getRefs } = storeHelpers;

  type Props = { name: PickupName };

  const globalRefs = getRefs().global.main;

  return function PickupButton({ name }: Props) {
    const pickupInfo = pickupsInfo[name];

    const [isPressed, setIsPressed] = useState(false);

    const { current: localRefs } = useRef({ canButtonActivate: false });

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => setIsPressed(true);
    const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => setIsPressed(false);

    return (
      <button
        // onPointerUpCapture={() => globalRefs.onPickupButtonClick?.(name)}
        onPointerDown={handlePointerDown}
        onPointerUp={(event) => {
          globalRefs.onPickupButtonClick?.(name);
          handlePointerUp(event);
        }}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerOut={handlePointerUp}
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
          draggable={false}
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
