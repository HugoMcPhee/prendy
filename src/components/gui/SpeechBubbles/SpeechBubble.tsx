// @refresh-reset
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { sizeFromRef } from "shutils/dist/elements";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
// import "./SpeechBubble.css";

export function makeSpeechBubble<
  ConcepFuncs extends BackdopConcepFuncs,
  CharacterName extends string
>(concepFuncs: ConcepFuncs) {
  const { getState, useStore, useStoreEffect } = concepFuncs;

  type GetState = ConcepFuncs["getState"];
  type ItemType = keyof ReturnType<GetState>;
  type AllItemsState<T_ItemType extends ItemType> = ReturnType<
    GetState
  >[T_ItemType];

  const getCharDollStuff = makeGetCharDollStuff<ConcepFuncs, CharacterName>(
    concepFuncs
  );

  type Props = { name: keyof AllItemsState<"speechBubbles"> & string };

  return function SpeechBubble({ name }: Props) {
    const theRectangle = useRef<HTMLDivElement>(null);
    const theTextRectangle = useRef<HTMLDivElement>(null);
    const theTriangle = useRef<HTMLDivElement>(null);
    const theText = useRef<HTMLDivElement>(null);
    const theTextHolder = useRef<HTMLDivElement>(null);

    const forCharacter =
      getState().speechBubbles[name].forCharacter ?? "walker";

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
    } = useStore((state) => state.speechBubbles[name], {
      name,
      type: ["speechBubbles"],
      prop: [
        "goalText",
        "isVisible",
        "font",
        "zIndex",
        "visibleLetterAmount",
        "_goalTextWordLetterArrays",
        "_specialTextByLetterIndex",
        "stylesBySpecialText",
      ],
    });

    const { nowPlaceName } = useStore((state) => state.global.main, {
      type: "global",
      prop: ["nowPlaceName"],
    });

    const [theSpring, theSpringApi] = useSpring(
      () => ({
        height: isVisible ? measuredHeight : 0,
        position: [0, 0],
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.1,
        config: { tension: 400, friction: 50 },
        onChange() {
          positionSpeechBubbleToCharacter();
        },
      }),
      [isVisible]
    );

    useEffect(() => {
      const newMeasuredHeight = sizeFromRef(refs.theTextHolder.current).height;
      if (newMeasuredHeight !== 0) {
        setMeasuredHeight(newMeasuredHeight);
      }
    }, [goalText, refs.theTextHolder]);

    useEffect(() => {
      theSpringApi.start({ height: measuredHeight });
    }, [measuredHeight, theSpringApi]);

    const positionSpeechBubbleToCharacter = useCallback(() => {
      const { forCharacter } = getState().speechBubbles[name];
      if (!forCharacter) return;
      const { dollState, dollName } =
        getCharDollStuff(forCharacter as CharacterName) ?? {};

      if (!dollState || !dollName) return;
      const { positionOnPlaneScene } = dollState;

      const newPositionX = positionOnPlaneScene.x;
      let yOffset = (refs.theTextRectangle.current?.offsetHeight ?? 190) / 2;

      const newPositionY = positionOnPlaneScene.y - yOffset;

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
          prop: ["positionOnPlaneScene"],
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
            padding: "15px",
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
            width: "25px",
            height: "25px",
            opacity: 1,
            borderRadius: 5,
            borderWidth: 1,
            transform: `translate(0px, -15px) rotate(45deg) scale(0.8) `,
            backgroundColor: "white",
          },
        } as const),
      [font]
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
            width: "230px",
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
              width: "230px",
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
              {_goalTextWordLetterArrays.map((wordLetters, wordIndex) => {
                let letterAmountFromPreviousWords =
                  wordIndex > 0
                    ? _goalTextWordLetterArrays.slice(0, wordIndex - 1).flat()
                        .length
                    : 0;

                return (
                  <span className="SpeechBubble-wordLettersHolder">
                    {wordLetters.map((letter, wordLetterIndex) => {
                      const textLetterIndex =
                        (letterAmountFromPreviousWords || -1) + wordLetterIndex;
                      const isVisible = textLetterIndex < visibleLetterAmount;

                      // NOTE this is maybe undefiend, but typescript rules dont treat it like that atm
                      const customStyle =
                        stylesBySpecialText[
                          _specialTextByLetterIndex[textLetterIndex + 1]
                        ];

                      return (
                        <div
                          className={
                            isVisible
                              ? "SpeechBubble-visibleLetter"
                              : "SpeechBubble-hiddenLetter"
                          }
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
          <div
            ref={refs.theTriangle}
            key={`theTriangle`}
            id={`theTriangle`}
            style={styles.triangle}
          ></div>
        </animated.div>
      </div>
    );
  };
}
