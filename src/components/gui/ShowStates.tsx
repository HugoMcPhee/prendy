// @refresh-reset
import React from "react";
import { meta } from "../../meta";
import { useStore } from "repond";

type Props = {};

export function ShowStates(_props: Props) {
  const { slateZoom, slateZoomGoal, slatePos, slatePosGoal, slateZoomIsMoving, debugMessage } = useStore(
    (state) => state.global.main,
    {
      type: "global",
      prop: ["slateZoom", "slateZoomGoal", "slatePos", "slatePosGoal", "slateZoomIsMoving", "debugMessage"],
    }
  );

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
      <div style={{ color: "rgb(81, 164, 123)" }}>{`${slateZoomIsMoving}`}</div>
      <div style={{ color: "rgb(81, 164, 123)" }}>{slateZoom}</div>
      <div style={{ color: "rgb(81, 164, 123)" }}>{slateZoomGoal}</div>
      <div style={{ color: "rgb(81, 164, 123)" }}>_</div>
      <div style={{ color: "rgb(81, 164, 123)" }}>
        {slatePos.x} {slatePos.y}
      </div>
      <div style={{ color: "rgb(81, 164, 123)" }}>
        {slatePosGoal.x} {slatePosGoal.y}
      </div>
    </div>
  );
}
