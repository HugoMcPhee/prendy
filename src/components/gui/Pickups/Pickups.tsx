// @refresh-reset
import React, { useEffect } from "react";
import { PrendyStoreHelpers, PickupsInfoPlaceholder } from "../../../stores/typedStoreHelpers";
import { get_PickupButton } from "./PickupButton";

export function get_Pickups<
  StoreHelpers extends PrendyStoreHelpers,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(storeHelpers: StoreHelpers, pickupsInfo: PickupsInfo) {
  const { getRefs, useStore } = storeHelpers;

  const globalRefs = getRefs().global.main;

  type Props = {};

  const PickupButton = get_PickupButton<StoreHelpers, PickupName, PickupsInfo>(storeHelpers, pickupsInfo);

  return function Pickups(_props: Props) {
    // const buttonsHolderRef = useRef<StackPanel>(null);

    // On hover could disablejoystick event from working>

    const { heldPickups } = useStore(({ global: { main } }) => main, {
      type: "global",
      name: "main",
      prop: ["heldPickups"],
    });

    useEffect(() => {
      if (heldPickups.length === 0) {
        globalRefs.isHoveringPickupButton = false;
        // the hover out never happened when removing a last pickup
      }
    }, [heldPickups.length]);

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
          onMouseEnter={() => {
            globalRefs.isHoveringPickupButton = true;
          }}
          onMouseLeave={() => {
            globalRefs.isHoveringPickupButton = false;
          }}
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
