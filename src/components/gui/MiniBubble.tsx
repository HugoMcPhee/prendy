// @refresh-reset
import { sizeFromRef } from "chootils/dist/elements";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { AllState, getState, useStore, useStoreEffect } from "repond";
import { MyTypes } from "../../declarations";
import { getScreenSize } from "../../helpers/babylonjs/slate";
import { getCharDollStuff } from "../../helpers/prendyUtils/characters";

// NOTE the whole positionMiniBubbleToCharacter function is copied from SpeechBubble.tsx
// So some of it could be shared code

const BUBBLE_WIDTH = 30; // NOTE not used
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
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

type CharacterName = MyTypes["Types"]["CharacterName"];
type ItemType = keyof AllState;
type AllItemsState<T_ItemType extends ItemType> = AllState[T_ItemType] & Record<any, any>;

type Props = { name: keyof AllItemsState<"miniBubbles"> };

export function MiniBubble({ name }: Props) {
  const theRectangle = useRef<HTMLDivElement>(null);
  const theTextRectangle = useRef<HTMLDivElement>(null);
  const theTriangle = useRef<HTMLDivElement>(null);
  const theText = useRef<HTMLDivElement>(null);
  const theGoalText = useRef<HTMLDivElement>(null);

  const forCharacter = getState().miniBubbles[name].forCharacter ?? "walker";

  const [measuredHeight, setMeasuredHeight] = useState(0);

  const refs = {
    theRectangle,
    theTextRectangle,
    theTriangle,
    theText,
    theGoalText,
  };

  const { text, isVisible } = useStore((state) => state.miniBubbles[name], {
    name: name as string,
    type: ["miniBubbles"],
    prop: ["text", "isVisible"],
  });

  const { nowPlaceName, aConvoIsHappening } = useStore((state) => state.global.main, {
    type: "global",
    prop: ["nowPlaceName", "aConvoIsHappening"],
  });

  const randomRotation = useMemo(() => {
    return Math.random() * 10 - 5;
  }, [text, isVisible]);

  const editedIsVisible = isVisible && !aConvoIsHappening;

  const [theSpring, theSpringApi] = useSpring(
    () => ({
      height: editedIsVisible ? measuredHeight : 0,
      position: [0, 0],
      opacity: editedIsVisible ? 1 : 0,
      scale: editedIsVisible ? 1 : 0.1,
      rotation: randomRotation,
      config: { tension: 400, friction: 50 },
      onChange() {
        positionMiniBubbleToCharacter();
      },
    }),
    [editedIsVisible]
  );

  useEffect(() => {
    // in an interval of 750ms, make the spring scale (bubble size) increase and decrease slightly, (starting and clearing when editedIsVisible changes)
    if (!editedIsVisible) return;

    theSpringApi.start({ scale: 1.05, config: { damping: 100 } });
    let timeout = setTimeout(() => {
      theSpringApi.start({ scale: 1, config: { damping: 100 } });
    }, 350);
    const interval = setInterval(() => {
      if (!editedIsVisible) return;
      theSpringApi.start({ scale: 1.05, config: { damping: 100 } });
      timeout = setTimeout(() => {
        theSpringApi.start({ scale: 1, config: { damping: 100 } });
      }, 350);
    }, 750);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [editedIsVisible, theSpringApi]);

  useEffect(() => {
    const newMeasuredHeight = sizeFromRef(refs.theGoalText.current).height;
    if (newMeasuredHeight !== 0) {
      setMeasuredHeight(newMeasuredHeight);
    }
  }, [text, refs.theGoalText]);

  useEffect(() => {
    theSpringApi.start({ height: measuredHeight });
  }, [measuredHeight, theSpringApi]);

  const positionMiniBubbleToCharacter = useCallback(() => {
    const { forCharacter } = getState().speechBubbles[name];
    if (!forCharacter) return;
    const { dollState, dollName } = getCharDollStuff(forCharacter as CharacterName) ?? {};

    if (!dollState || !dollName) return;
    const { focusedDoll, focusedDollIsInView } = getState().global.main;
    const positionOnScreen = dollState.positionOnScreen;

    // if (dollName === focusedDoll && !focusedDollIsInView) {}

    const viewSize = getScreenSize();

    const farLeft = -viewSize.x / 2;
    const farRight = viewSize.x / 2;
    const farTop = -viewSize.y / 2;
    const farBottom = viewSize.y / 2;

    const bubbleHeight = refs.theTextRectangle.current?.offsetHeight ?? 190;
    const halfBubbleHeight = bubbleHeight / 2;
    const halfBubbleWidth = BUBBLE_WIDTH / 2;
    const halfTriangleSize = TRIANGLE_SIZE / 2;

    const screenSize = getScreenSize();

    // need function to get position on screen

    let newPositionX = positionOnScreen.x - screenSize.x / 2;

    let yOffset = bubbleHeight / 2;

    let newPositionY = positionOnScreen.y - yOffset - screenSize.y / 2;

    // Keep the focused dolls speech bubble inside the view
    if (dollName === focusedDoll) {
      if (newPositionX - halfBubbleWidth < farLeft) {
        newPositionX = farLeft + halfBubbleWidth;
      }
      if (newPositionX + halfBubbleWidth > farRight) {
        newPositionX = farRight - halfBubbleWidth;
      }

      if (newPositionY - halfBubbleHeight - halfTriangleSize < farTop) {
        newPositionY = farTop + halfBubbleHeight + halfTriangleSize;
      }
      if (newPositionY + halfBubbleHeight + halfTriangleSize > farBottom) {
        newPositionY = farBottom - halfBubbleHeight - halfTriangleSize;
      }
    }

    // console.log("newPositionX", newPositionX);

    theSpringApi.start({
      position: [newPositionX, newPositionY],
      immediate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useStoreEffect(
    positionMiniBubbleToCharacter,
    [
      { type: ["dolls"], name: forCharacter, prop: ["positionOnScreen"] },
      { type: ["global"], name: "main", prop: ["slatePos"] },
      { type: ["global"], name: "main", prop: ["slateZoom"] },
      { type: ["global"], name: "main", prop: ["nowCamName"] },
      { type: ["story"], name: "main", prop: ["storyPart"] },
    ],
    [nowPlaceName]
  );

  const styles = useMemo(
    () =>
      ({
        container: {
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        visibleText: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // color: "rgb(61, 61, 61)",
          color: "rgb(232, 146, 146)",
          fontSize: "14px",
          padding: "1px",
          fontFamily: "Jua",
          textAlign: "center",
          verticalAlign: "middle", // to center emojis with text?
          zIndex: 100,
        },
        triangle: {
          width: "25px",
          height: "25px",
          opacity: 1,
          borderBottomRightRadius: 6,
          transform: `translate(0px, -20px) rotate(45deg) scale(0.3) `,
          // backgroundColor: "#fafafa",
          backgroundColor: SHARED_THEME.backgroundColor,
          // borderWidth: 1,
          borderWidth: SHARED_THEME.borderWidth * (1 / 0.3),
          borderColor: SHARED_THEME.borderColor,
          borderStyle: "solid",
        },
        triangleAbove: {
          width: "25px",
          height: "25px",
          opacity: 1,
          borderRadius: 0,
          borderBottomRightRadius: 4,
          transform: `translate(0px, -9px) rotate(45deg) scale(0.4) `,
          // backgroundColor: "#fafafa",
          backgroundColor: SHARED_THEME.backgroundColor,
          // borderWidth: 1,
          position: "absolute",
          // bottom: 3,
          // left: 10.5,
          zIndex: 1010,
        },
      } as const),
    []
  );

  return (
    <animated.div id="mini-bubble" style={styles.container}>
      <animated.div
        ref={refs.theRectangle}
        key={`theRectangle`}
        id={`theRectangle`}
        style={{
          // width: "70px",
          zIndex: 90,
          opacity: theSpring.opacity,
          transform: interpolate(
            [
              theSpring.position.to((x, y) => `translate(${x}px , ${y}px)`),
              theSpring.scale.to((scale) => `scale(${scale})`),
              theSpring.rotation.to((rotation) => `rotate(${rotation}deg)`),
            ],
            (translate, scale, rotate) => `${translate} ${scale} ${rotate}`
          ),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          willChange: "transform, opacity",
        }}
      >
        <animated.div
          ref={refs.theTextRectangle}
          key={`textRectangle`}
          id={`textRectangle`}
          style={{
            backgroundColor: SHARED_THEME.backgroundColor,
            width: "35px",
            minHeight: "20px",
            borderRadius: "6px",
            paddingBottom: "0px",
            zIndex: 1000,
            height: theSpring.height,
            overflow: "hidden",
            willChange: "height",
            position: "relative", // fixes overflow not working,
            borderWidth: SHARED_THEME.borderWidth,
            borderColor: SHARED_THEME.borderColor,
            borderStyle: "solid",
          }}
        >
          {/* visible typed text */}
          <div ref={theGoalText} id={`visibleText`} style={styles.visibleText}>
            {text}
          </div>
        </animated.div>
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
      </animated.div>
    </animated.div>
  );
}
// }
