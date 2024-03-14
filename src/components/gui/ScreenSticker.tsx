// @refresh-reset
import { getRandomInt } from "chootils/dist/numbers";
import React, { CSSProperties } from "react";
import { animated, useSpring } from "react-spring";
import { useStore } from "repond";

type Props = {};

const EDGE_PADDING = 65;

export function ScreenSticker(_props: Props) {
  const { screenStickerText, screenStickerIsVisible, screenStickerPosition } = useStore(({ story: { main } }) => main, {
    type: "story",
    id: "main",
    prop: ["screenStickerText", "screenStickerIsVisible", "screenStickerPosition"],
  });

  const [theSpring, theSpringApi] = useSpring(
    () => ({
      // height: screenStickerIsVisible ? measuredHeight : 0,
      // position: [0, 0],
      // opacity: screenStickerIsVisible ? 1 : 0,
      // scale: screenStickerIsVisible ? 1 : 0.1,
      config: { tension: 400, friction: 50 },
      loop: screenStickerIsVisible,
      from: { scale: 0.9 },
      to: { scale: 1.2 },
      // onChange() {
      //   positionMiniBubbleToCharacter();
      // },
    }),
    [screenStickerIsVisible]
  );

  if (!screenStickerIsVisible) {
    return null;
  }

  return (
    <div key={`alarm_text_box`} id={`alarm_text_box`} style={styles.container}>
      <animated.div
        id={`alarm_text`}
        style={{
          ...styles.sticker,
          transform: `translate(${EDGE_PADDING + screenStickerPosition.x * (window.innerWidth - EDGE_PADDING * 2)}px ,${
            EDGE_PADDING + screenStickerPosition.y * (window.innerHeight - EDGE_PADDING * 2)
          }px)`,
          rotateZ: getRandomInt(-45, 45),
          ...theSpring,
        }}
      >
        {screenStickerText}
      </animated.div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    overflow: "hidden",
  } as CSSProperties,
  sticker: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "rgb(233, 233, 233)",
    fontFamily: "Jua",
    fontSize: 120,
    zIndex: 1000,
    textAlign: "center",
    transformOrigin: "center",
  } as CSSProperties,
} as const;
