// @refresh-reset
import React from "react";
import { getRefs, useStore } from "repond";
import { MyTypes } from "../../../declarations";
import { PickupButton } from "./PickupButton";

type PickupName = MyTypes["Types"]["PickupName"];

type Props = { children: React.ReactNode };

export function Pickups(_props: Props) {
  const globalRefs = getRefs().global.main;

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
}
