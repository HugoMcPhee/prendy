// @refresh-reset
import React, { useState } from "react";
export function get_PickupButton(storeHelpers, pickupsInfo) {
    const { getRefs } = storeHelpers;
    const globalRefs = getRefs().global.main;
    return function PickupButton({ name }) {
        const pickupInfo = pickupsInfo[name];
        const [isPressed, setIsPressed] = useState(false);
        return (React.createElement("button", { onClick: () => { var _a; return (_a = globalRefs.onPickupButtonClick) === null || _a === void 0 ? void 0 : _a.call(globalRefs, name); }, onMouseDown: () => setIsPressed(true), onMouseUp: () => setIsPressed(false), onMouseLeave: () => setIsPressed(false), style: {
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
            } },
            React.createElement("img", { src: pickupInfo.image, alt: name, 
                // width={50}
                // height={50}
                style: {
                    width: "7vmin",
                    height: "7vmin",
                    minWidth: "50px",
                    minHeight: "50px",
                } })));
    };
}
