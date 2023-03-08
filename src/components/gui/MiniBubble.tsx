// @refresh-reset
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { sizeFromRef } from "chootils/dist/elements";
import { get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function get_MiniBubble<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { useStoreEffect, useStore, getState } = storeHelpers;

  const getCharDollStuff = get_getCharDollStuff(storeHelpers);

  type GetState = StoreHelpers["getState"];
  type ItemType = keyof ReturnType<GetState>;
  type AllItemsState<T_ItemType extends ItemType> = ReturnType<GetState>[T_ItemType] & Record<any, any>;

  type Props = { name: keyof AllItemsState<"miniBubbles"> };

  return function MiniBubble({ name }: Props) {
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

    const editedIsVisible = isVisible && !aConvoIsHappening;

    const [theSpring, theSpringApi] = useSpring(
      () => ({
        height: editedIsVisible ? measuredHeight : 0,
        position: [0, 0],
        opacity: editedIsVisible ? 1 : 0,
        scale: editedIsVisible ? 1 : 0.1,
        config: { tension: 400, friction: 50 },
        onChange() {
          positionMiniBubbleToCharacter();
        },
      }),
      [editedIsVisible]
    );

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
      // TODO use the same code from SpeechBubble

      const { forCharacter } = getState().miniBubbles[name];

      if (!forCharacter) return;
      const { dollState, dollName } = getCharDollStuff(forCharacter) ?? {};
      if (!dollState || !dollName) return;
      const { positionOnScreen } = dollState;

      // const playerCameraDistance =
      //   meshRef && camera
      //     ? Vector3.Distance(meshRef?.position, camera?.position)
      //     : 4;

      const newPositionX = positionOnScreen.x;
      let yOffset = (refs.theTextRectangle.current?.offsetHeight ?? 190) / 2;

      const newPositionY = positionOnScreen.y - yOffset;

      theSpringApi.start({
        position: [newPositionX, newPositionY],
        immediate: true,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useStoreEffect(
      () => {
        positionMiniBubbleToCharacter();
      },
      [
        { type: ["dolls"], name: forCharacter, prop: ["positionOnScreen"] },
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
            color: "rgb(61, 61, 61)",
            fontSize: "30px",
            padding: "5px",
            fontFamily: "Jua",
            textAlign: "center",
            verticalAlign: "middle", // to center emojis with text?
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
      []
    );

    return (
      <animated.div id="mini-bubble" style={styles.container}>
        <animated.div
          ref={refs.theRectangle}
          key={`theRectangle`}
          id={`theRectangle`}
          style={{
            width: "70px",
            zIndex: 90,
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
              // backgroundColor: "rgb(245, 142, 198)",
              width: "70px",
              borderRadius: "15px",
              borderWidth: "1px",
              paddingBottom: "5px",
              zIndex: 100,
              height: theSpring.height,
              overflow: "hidden",
              willChange: "height",
              position: "relative", // fixes overflow not working
            }}
          >
            {/* visible typed text */}
            <div ref={theGoalText} id={`visibleText`} style={styles.visibleText}>
              {text}
            </div>
          </animated.div>
          <div ref={refs.theTriangle} key={`theTriangle`} id={`theTriangle`} style={styles.triangle}></div>
        </animated.div>
      </animated.div>
    );
  };
}
