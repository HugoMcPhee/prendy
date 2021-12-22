// @refresh-reset
import React from "react";
import { PrendyStoreHelpers } from "../../concepts/typedStoreHelpers";

export function makeShowStates<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers
) {
  const { useStore } = storeHelpers;

  type Props = {};

  return function ShowStates(_props: Props) {
    const {
      planeZoom,
      planeZoomGoal,
      planePos,
      planePosGoal,
      planeZoomIsMoving,
      debugMessage,
    } = useStore((state) => state.global.main, {
      type: "global",
      prop: [
        "planeZoom",
        "planeZoomGoal",
        "planePos",
        "planePosGoal",
        "planeZoomIsMoving",
        "debugMessage",
      ],
    });

    return (
      <div
        id="show-states"
        style={
          {
            pointerEvents: "none",
            position: "absolute",
            top: "5vh",
            left: "5vw",
            width: "90vw",
            height: "90vh",
            backgroundColor: "transparent",
            // backgroundColor: "rgb(167, 231, 236)",
            opacity: 1,
          } as any
        }
      >
        <div style={{ color: "rgb(81, 164, 123)" }}>{`${debugMessage}`}</div>
        <div style={{ color: "rgb(81, 164, 123)" }}>_</div>
        <div
          style={{ color: "rgb(81, 164, 123)" }}
        >{`${planeZoomIsMoving}`}</div>
        <div style={{ color: "rgb(81, 164, 123)" }}>{planeZoom}</div>
        <div style={{ color: "rgb(81, 164, 123)" }}>{planeZoomGoal}</div>
        <div style={{ color: "rgb(81, 164, 123)" }}>_</div>
        <div style={{ color: "rgb(81, 164, 123)" }}>
          {planePos.x} {planePos.y}
        </div>
        <div style={{ color: "rgb(81, 164, 123)" }}>
          {planePosGoal.x} {planePosGoal.y}
        </div>
      </div>
    );
  };
}
