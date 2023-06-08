// @refresh-reset
import React from "react";
import { PickupName, PickupsInfo, PrendyStoreHelpers } from "../../../declarations";
import { get_PickupButton } from "./PickupButton";

export function get_Pickups(storeHelpers: PrendyStoreHelpers, pickupsInfo: PickupsInfo) {
  const { getRefs, useStore } = storeHelpers;

  const globalRefs = getRefs().global.main;

  type Props = {};

  const PickupButton = get_PickupButton(storeHelpers, pickupsInfo);

  return function Pickups(_props: Props) {
    // const buttonsHolderRef = useRef<StackPanel>(null);

    const { heldPickups } = useStore(({ global: { main } }) => main, {
      type: "global",
      name: "main",
      prop: ["heldPickups"],
    });

    return (
      <div
        id="pickups"
        style={{
          pointerEvents: "none",
          zIndex: 1000,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          flexDirection: "row",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          //thickness={0}
          style={{
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          {(heldPickups as PickupName[]).map((pickupName) => (
            <PickupButton name={pickupName} key={pickupName} />
          ))}
        </div>
      </div>
    );
  };
}
