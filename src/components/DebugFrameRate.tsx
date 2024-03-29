import React, { useEffect, useRef } from "react";
import { startNewItemEffect, stopNewEffect } from "repond";

export function DebugFrameRate() {
  const { current: canvasRefs } = useRef({
    ctx: null as CanvasRenderingContext2D | null | undefined,
    frameCounter: 0,
  });

  useEffect(() => {
    const effectId = startNewItemEffect({
      run({ frameDuration }) {
        if (!canvasRefs.ctx) return;
        canvasRefs.ctx.fillStyle = "#e0fcd3cc";
        canvasRefs.ctx?.fillRect(canvasRefs.frameCounter, frameDuration, 1, 1); // fill in the pixel at (10,10)

        canvasRefs.frameCounter += 1;
        if (canvasRefs.frameCounter > 200) {
          canvasRefs.ctx?.clearRect(0, 0, 200, 100);
          canvasRefs.frameCounter = 0;
        }
      },
      check: { type: "global", id: "main", prop: ["frameTick"] },
      step: "default",
    });

    return () => stopNewEffect(effectId);
  });

  return (
    <canvas
      ref={(ref) => {
        canvasRefs.ctx = ref?.getContext("2d");
      }}
      id="fpscanvas"
      width="200px"
      height="100px"
      style={{ position: "absolute", bottom: 0, right: 0, width: "200px", height: "100px", zIndex: 10000 }}
    ></canvas>
  );
}
