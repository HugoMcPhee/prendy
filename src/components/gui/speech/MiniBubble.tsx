import { sizeFromRef } from "chootils/dist/elements";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { AllState, getState, useStore, useStoreEffect } from "repond";
import { getScreenSize } from "../../../helpers/babylonjs/slate";
import { getCharDollStuff } from "../../../helpers/prendyUtils/characters";
import { CharacterName } from "../../../types";
import { BubbleTriangle } from "./BubbleTriangle";

// NOTE the whole positionMiniBubbleToCharacter function is copied from SpeechBubble.tsx
// So some of it could be shared code

const BUBBLE_WIDTH = 30; // NOTE not used
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
const TRIANGLE_SIZE = 15;

const SHARED_THEME = {
  borderColor: "rgb(227, 181, 106)",
  backgroundColor: "rgb(249, 235, 146)",
  borderWidth: 2,
  rounding: 6,
};

type Props = { name: keyof AllState["miniBubbles"] };

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
    id: name as string,
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
    const { focusedDoll } = getState().global.main;
    const positionOnScreen = dollState.positionOnScreen;

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

    theSpringApi.start({
      position: [newPositionX, newPositionY],
      immediate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useStoreEffect(
    positionMiniBubbleToCharacter,
    [
      { type: ["dolls"], id: forCharacter, prop: ["positionOnScreen"] },
      { type: ["global"], id: "main", prop: ["slatePos"] },
      { type: ["global"], id: "main", prop: ["slateZoom"] },
      { type: ["global"], id: "main", prop: ["nowCamName"] },
      { type: ["story"], id: "main", prop: ["storyPart"] },
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
            paddingBottom: "0px",
            zIndex: 1000,
            height: theSpring.height,
            overflow: "hidden",
            willChange: "height",
            position: "relative", // fixes overflow not working,
            borderRadius: SHARED_THEME.rounding + "px",
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
        <BubbleTriangle />
      </animated.div>
    </animated.div>
  );
}
