// @refresh-reset
import React from "react";
export function get_ShowStates(storeHelpers) {
    const { useStore } = storeHelpers;
    return function ShowStates(_props) {
        const { slateZoom, slateZoomGoal, slatePos, slatePosGoal, slateZoomIsMoving, debugMessage } = useStore((state) => state.global.main, {
            type: "global",
            prop: ["slateZoom", "slateZoomGoal", "slatePos", "slatePosGoal", "slateZoomIsMoving", "debugMessage"],
        });
        return (React.createElement("div", { id: "show-states", style: {
                pointerEvents: "none",
                position: "absolute",
                top: "5vh",
                left: "5vw",
                width: "90vw",
                height: "90vh",
                backgroundColor: "transparent",
                // backgroundColor: "rgb(167, 231, 236)",
                opacity: 1,
            } },
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, `${debugMessage}`),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, "_"),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, `${slateZoomIsMoving}`),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, slateZoom),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, slateZoomGoal),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, "_"),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } },
                slatePos.x,
                " ",
                slatePos.y),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } },
                slatePosGoal.x,
                " ",
                slatePosGoal.y)));
    };
}
