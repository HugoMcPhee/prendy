import React from "react";
import { AllState } from "repond";

const BUBBLE_HEIGHT_RATIO = 0.74814;
const TRIANGLE_SIZE = 15;

// when TRIANGLE_SIZE is 50, the svg stroke width is 4

const SHARED_THEME = {
  borderColor: "rgb(227, 181, 106)",
  backgroundColor: "rgb(249, 235, 146)",
  borderWidth: 2,
};

// when the TRIANGLE_SIZE is 50, the SVG is unscaled, so the border width is correct to pixels
// when the TRIANGLE_SIZE is different the svgs border width (stroke) needs to be scaled accordingly
const TRIANGLE_BORDER_WIDTH_SCALE = 50 / TRIANGLE_SIZE;

type Props = {};

export function BubbleTriangle({}: Props) {
  return (
    <div
      style={{
        width: TRIANGLE_SIZE,
        height: TRIANGLE_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: -SHARED_THEME.borderWidth,
        transform: `translate(0px, ${-SHARED_THEME.borderWidth - 0.085 * TRIANGLE_SIZE}px)`,
        zIndex: 1010,
      }}
    >
      <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9402.434 6308.434q2.656-5.652 5.41 0l22.305 45.786q2.753 5.652-2.656 5.652h-43.822q-5.409 0-2.753-5.652Z"
          style={{
            fill: SHARED_THEME.backgroundColor,
            stroke: SHARED_THEME.borderColor,
            strokeWidth: SHARED_THEME.borderWidth * TRIANGLE_BORDER_WIDTH_SCALE + "px",
            transformOrigin: "4715.28px 3172.16px",
          }}
          transform="matrix(-1 0 0 -1 -.0007 .0007)"
        />
        <path
          style={{ fill: SHARED_THEME.backgroundColor, stroke: SHARED_THEME.borderColor, strokeWidth: "0" }}
          d="M-.272-6.862h50.544V4.239H-.272z"
        />
      </svg>
    </div>
  );
}
