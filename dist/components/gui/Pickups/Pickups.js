// @refresh-reset
import React from "react";
import { get_PickupButton } from "./PickupButton";
export function get_Pickups(storeHelpers, pickupsInfo) {
    const { getRefs, useStore } = storeHelpers;
    const globalRefs = getRefs().global.main;
    const PickupButton = get_PickupButton(storeHelpers, pickupsInfo);
    return function Pickups(_props) {
        // const buttonsHolderRef = useRef<StackPanel>(null);
        const { heldPickups } = useStore(({ global: { main } }) => main, {
            type: "global",
            name: "main",
            prop: ["heldPickups"],
        });
        return (React.createElement("div", { id: "pickups", style: {
                pointerEvents: "none",
                zIndex: 1000,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                flexDirection: "row",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
            } },
            React.createElement("div", { 
                //thickness={0}
                style: {
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                } }, heldPickups.map((pickupName) => (React.createElement(PickupButton, { name: pickupName, key: pickupName }))))));
    };
}
