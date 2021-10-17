// @refresh-reset
import React, { useEffect } from "react";
import { makePickupButton } from "./PickupButton";
export function makePickups(concepFuncs, pickupsInfo) {
    const { getRefs, useStore } = concepFuncs;
    const globalRefs = getRefs().global.main;
    const PickupButton = makePickupButton(concepFuncs, pickupsInfo);
    return function Pickups(_props) {
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
            React.createElement("div", { onMouseEnter: () => {
                    globalRefs.isHoveringPickupButton = true;
                }, onMouseLeave: () => {
                    globalRefs.isHoveringPickupButton = false;
                }, 
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
