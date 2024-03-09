// @refresh-reset
import { sizeFromRef } from "chootils/dist/elements";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { AllState, getRefs, getState, useStore, useStoreEffect } from "repond";
import { MyTypes } from "../../../declarations";
import { getScreenSize } from "../../../helpers/babylonjs/slate";
import { getCharDollStuff } from "../../../helpers/prendyUtils/characters";
import { meta } from "../../../meta";
import { CharacterName } from "../../../types";
import { BubbleTriangle } from "./BubbleTriangle";
// import "./SpeechBubble.css";

const BUBBLE_WIDTH = 230;
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
const TRIANGLE_SIZE = 25;

type ItemType = keyof AllState;
type AllItemsState<T_ItemType extends ItemType> = AllState[T_ItemType];

type Props = { name: keyof AllItemsState<"speechBubbles"> & string };

const SHARED_THEME = {
  fontSize: "20px",
  lineHeight: "33px",
  padding: "8px",
  borderColor: "rgb(227, 181, 106)",
  backgroundColor: "rgb(249, 235, 146)",
  borderWidth: 2,
  rounding: 12,
};
// when the TRIANGLE_SIZE is 50, the SVG is unscaled, so the border width is correct to pixels
// when the TRIANGLE_SIZE is different the svgs border width (stroke) needs to be scaled accordingly
const TRIANGLE_BORDER_WIDTH_SCALE = 50 / TRIANGLE_SIZE;

export function SpeechBubble({ name }: Props) {
  const { speechVidFiles } = meta.assets!;

  const theRectangle = useRef<HTMLDivElement>(null);
  const theTextRectangle = useRef<HTMLDivElement>(null);
  const theTriangle = useRef<HTMLDivElement>(null);
  const theText = useRef<HTMLDivElement>(null);
  const theTextHolder = useRef<HTMLDivElement>(null);

  const forCharacter = getState().speechBubbles[name].forCharacter ?? "walker";

  const [measuredHeight, setMeasuredHeight] = useState(0);

  const refs = {
    theRectangle,
    theTextRectangle,
    theTriangle,
    theText,
    theTextHolder,
  };

  const {
    goalText,
    isVisible,
    font,
    zIndex,
    visibleLetterAmount,
    _goalTextWordLetterArrays,
    _specialTextByLetterIndex,
    stylesBySpecialText,
    nowVideoName,
  } = useStore((state) => state.speechBubbles[name], {
    id: name,
    type: ["speechBubbles"],
    prop: [
      // TODO fix types?
      "goalText",
      "isVisible",
      "font",
      "zIndex",
      "visibleLetterAmount",
      "_goalTextWordLetterArrays",
      "_specialTextByLetterIndex",
      "stylesBySpecialText",
      "nowVideoName",
    ],
  });

  const { nowPlaceName } = useStore((state) => state.global.main, {
    type: "global",
    prop: ["nowPlaceName"],
  });

  const videoIsPlaying = !!nowVideoName;

  const randomRotation = useMemo(() => {
    return Math.random() * 6 - 3;
  }, [goalText, isVisible]);

  const [theSpring, theSpringApi] = useSpring(() => {
    let height = 0;
    if (videoIsPlaying) {
      height = 240;
    } else {
      if (isVisible) height = measuredHeight;
    }

    return {
      height: isVisible ? measuredHeight : 0,
      position: [0, 0],
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.1,
      rotation: randomRotation,
      config: { tension: 400, friction: 50 },
      onChange() {
        positionSpeechBubbleToCharacter();
      },
    };
  }, [isVisible, videoIsPlaying, randomRotation]);

  useEffect(() => {
    const newMeasuredHeight = sizeFromRef(refs.theTextHolder.current).height;
    if (newMeasuredHeight !== 0) {
      setMeasuredHeight(newMeasuredHeight);
    }
  }, [goalText, refs.theTextHolder, nowVideoName]);

  useEffect(() => {
    theSpringApi.start({ height: measuredHeight });
  }, [measuredHeight, theSpringApi]);

  const positionSpeechBubbleToCharacter = useCallback(() => {
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

    theSpringApi.start({
      position: [newPositionX, newPositionY],
      immediate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useStoreEffect(
    positionSpeechBubbleToCharacter,
    [
      { type: ["dolls"], id: forCharacter, prop: ["positionOnScreen"] },
      { type: ["global"], id: "main", prop: ["slatePos"] },
      { type: ["global"], id: "main", prop: ["slateZoom"] },
      { type: ["story"], id: "main", prop: ["storyPart"] },
      { type: ["global"], id: "main", prop: ["nowCamName"] },
    ],
    [nowPlaceName]
  );

  // const textIsVeryShort = goalText.length < 10;

  const styles = useMemo(
    () =>
      ({
        hiddenGoalText: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // color: "rgb(197, 217, 61)",
          // opacity: 0,
          fontSize: SHARED_THEME.fontSize,
          lineHeight: SHARED_THEME.lineHeight,
          padding: videoIsPlaying ? SHARED_THEME.padding : SHARED_THEME.padding,
          fontFamily: font,
          // textAlign: "center",
          // verticalAlign: "middle", // to center emojis with text?
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // justifyContent: textIsVeryShort ? "center" : "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
        },
      } as const),
    [font, videoIsPlaying]
  );

  const containerStyle = useMemo(
    () =>
      ({
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
        zIndex: zIndex,
        fontFamily: font,
        textAlign: "center",
        verticalAlign: "middle", // to center emojis with text?
        fontSize: SHARED_THEME.fontSize,
        lineHeight: SHARED_THEME.lineHeight,
        color: "rgb(68, 68, 68)",
      } as const),
    [zIndex]
  );

  return (
    <div id={`speech-bubble-${name}`} style={containerStyle}>
      <animated.div
        ref={refs.theRectangle}
        key={`theRectangle`}
        id={`theRectangle`}
        style={{
          width: `${BUBBLE_WIDTH}px`,
          //   zIndex: 100,
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
            backgroundColor: "#fafafa",
            width: `${BUBBLE_WIDTH}px`,
            paddingBottom: "5px",
            zIndex: 100,
            height: theSpring.height,
            overflow: "hidden",
            willChange: "height",
            position: "relative", // fixes overflow not working
            // borderRadius: "20px",
            // borderWidth: "1px",
            borderRadius: SHARED_THEME.rounding + "px",
            borderWidth: SHARED_THEME.borderWidth,
            borderColor: SHARED_THEME.borderColor,
            borderStyle: "solid",
          }}
        >
          {/* hidden goal text */}
          {/* visible typed text */}
          <div ref={theTextHolder} style={styles.hiddenGoalText}>
            {videoIsPlaying && (
              <video
                // width="100%"
                width={`${BUBBLE_WIDTH}px`}
                height={`${BUBBLE_HEIGHT}px`}
                autoPlay
                loop
                src={speechVidFiles[nowVideoName ?? ""] ?? ""}
              ></video>
            )}
            {_goalTextWordLetterArrays.map((wordLetters, wordIndex) => {
              let letterAmountFromPreviousWords =
                wordIndex > 0 ? _goalTextWordLetterArrays.slice(0, wordIndex - 1).flat().length : 0;

              return (
                <span className="SpeechBubble-wordLettersHolder" key={"" + wordLetters + wordIndex}>
                  {wordLetters.map((letter, wordLetterIndex) => {
                    const textLetterIndex = (letterAmountFromPreviousWords || -1) + wordLetterIndex;
                    const isVisible = textLetterIndex < visibleLetterAmount;

                    // NOTE this is maybe undefiend, but typescript rules dont treat it like that atm
                    const customStyle = stylesBySpecialText[_specialTextByLetterIndex[textLetterIndex + 1]];

                    return (
                      <div
                        key={"" + letter + wordLetterIndex}
                        className={isVisible ? "SpeechBubble-visibleLetter" : "SpeechBubble-hiddenLetter"}
                        style={customStyle}
                      >
                        {`${letter}`}
                      </div>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </animated.div>
        <BubbleTriangle />
      </animated.div>
    </div>
  );
}
