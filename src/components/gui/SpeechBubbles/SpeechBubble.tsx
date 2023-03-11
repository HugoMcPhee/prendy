// @refresh-reset
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { sizeFromRef } from "chootils/dist/elements";
import { get_getCharDollStuff } from "../../../helpers/prendyUtils/characters";
import { getScreenSize, get_scenePlaneUtils } from "../../../helpers/babylonjs/scenePlane";
import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { CharacterName, PrendyOptions, SpeechVidFiles } from "../../../declarations";
// import "./SpeechBubble.css";

const BUBBLE_WIDTH = 230;
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
const TRIANGLE_SIZE = 25;

export function get_SpeechBubble<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers,
  prendyStartOptions: PrendyOptions,
  speechVidFiles: SpeechVidFiles
) {
  const { getState, useStore, useStoreEffect, getRefs } = storeHelpers;

  const globalRefs = getRefs().global.main;

  type GetState = StoreHelpers["getState"];
  type ItemType = keyof ReturnType<GetState>;
  type AllItemsState<T_ItemType extends ItemType> = ReturnType<GetState>[T_ItemType];

  const getCharDollStuff = get_getCharDollStuff(storeHelpers);

  type Props = { name: keyof AllItemsState<"speechBubbles"> & string };

  return function SpeechBubble({ name }: Props) {
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
      name,
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
        config: { tension: 400, friction: 50 },
        onChange() {
          positionSpeechBubbleToCharacter();
        },
      };
    }, [isVisible, videoIsPlaying]);

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

      // console.log("newPositionX", newPositionX);

      theSpringApi.start({
        position: [newPositionX, newPositionY],
        immediate: true,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useStoreEffect(
      () => {
        positionSpeechBubbleToCharacter();
      },
      [
        {
          type: ["dolls"],
          name: forCharacter,
          prop: ["positionOnScreen"],
        },
        { type: ["global"], name: "main", prop: ["planePos"] },
        { type: ["global"], name: "main", prop: ["planeZoom"] },
        { type: ["story"], name: "main", prop: ["storyPart"] },
        { type: ["places"], name: nowPlaceName, prop: ["nowCamName"] },
        { type: ["places"], prop: ["nowCamName"] },
      ],
      [nowPlaceName]
    );

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
            fontSize: "30px",
            padding: videoIsPlaying ? "0" : "15px",
            fontFamily: font,
            // textAlign: "center",
            // verticalAlign: "middle", // to center emojis with text?
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
          },
          triangle: {
            width: TRIANGLE_SIZE + "px",
            height: TRIANGLE_SIZE + "px",
            opacity: 1,
            borderRadius: 5,
            borderWidth: 1,
            transform: `translate(0px, -15px) rotate(45deg) scale(0.8) `,
            backgroundColor: "white",
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
          fontSize: "30px",
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
              ],
              (translate, scale) => `${translate} ${scale}`
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
              backgroundColor: "white",
              width: `${BUBBLE_WIDTH}px`,
              borderRadius: "40px",
              borderWidth: "1px",
              paddingBottom: "5px",
              zIndex: 100,
              height: theSpring.height,
              overflow: "hidden",
              willChange: "height",
              position: "relative", // fixes overflow not working
            }}
          >
            {/* hidden goal text */}
            {/* <div ref={theTextHolder} id={`goalText`} style={styles.hiddenGoalText}>
      {goalText}
      </div> */}
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
            {/* <SpeechBubbleVisibleText name={name} /> */}
          </animated.div>
          <div ref={refs.theTriangle} key={`theTriangle`} id={`theTriangle`} style={styles.triangle}></div>
        </animated.div>
      </div>
    );
  };
}
