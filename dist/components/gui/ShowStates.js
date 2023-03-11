// @refresh-reset
import React from "react";
export function get_ShowStates(storeHelpers) {
    const { useStore } = storeHelpers;
    return function ShowStates(_props) {
        const { planeZoom, planeZoomGoal, planePos, planePosGoal, planeZoomIsMoving, debugMessage } = useStore((state) => state.global.main, {
            type: "global",
            prop: ["planeZoom", "planeZoomGoal", "planePos", "planePosGoal", "planeZoomIsMoving", "debugMessage"],
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
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, `${planeZoomIsMoving}`),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, planeZoom),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, planeZoomGoal),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } }, "_"),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } },
                planePos.x,
                " ",
                planePos.y),
            React.createElement("div", { style: { color: "rgb(81, 164, 123)" } },
                planePosGoal.x,
                " ",
                planePosGoal.y)));
    };
}
