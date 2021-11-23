// @refresh-reset
import React, { useEffect } from "react";
import {
  PrendyConcepFuncs,
  PickupsInfoPlaceholder,
} from "../../../concepts/typedConcepFuncs";
import { makePickupButton } from "./PickupButton";

export function makePickups<
  ConcepFuncs extends PrendyConcepFuncs,
  PickupName extends string,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(concepFuncs: ConcepFuncs, pickupsInfo: PickupsInfo) {
  const { getRefs, useStore } = concepFuncs;

  const globalRefs = getRefs().global.main;

  type Props = {};

  const PickupButton = makePickupButton<ConcepFuncs, PickupName, PickupsInfo>(
    concepFuncs,
    pickupsInfo
  );

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
