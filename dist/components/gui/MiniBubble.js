// @refresh-reset
import { sizeFromRef } from "chootils/dist/elements";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { getScreenSize } from "../../helpers/babylonjs/slate";
import { get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
// NOTE the whole positionMiniBubbleToCharacter function is copied from SpeechBubble.tsx
// So some of it could be shared code
const BUBBLE_WIDTH = 70;
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
const TRIANGLE_SIZE = 25;
export function get_MiniBubble(storeHelpers) {
    const { useStoreEffect, useStore, getState } = storeHelpers;
    const getCharDollStuff = get_getCharDollStuff(storeHelpers);
    return function MiniBubble({ name }) {
        var _a;
        const theRectangle = useRef(null);
        const theTextRectangle = useRef(null);
        const theTriangle = useRef(null);
        const theText = useRef(null);
        const theGoalText = useRef(null);
        const forCharacter = (_a = getState().miniBubbles[name].forCharacter) !== null && _a !== void 0 ? _a : "walker";
        const [measuredHeight, setMeasuredHeight] = useState(0);
        const refs = {
            theRectangle,
            theTextRectangle,
            theTriangle,
            theText,
            theGoalText,
        };
        const { text, isVisible } = useStore((state) => state.miniBubbles[name], {
            name: name,
            type: ["miniBubbles"],
            prop: ["text", "isVisible"],
        });
        const { nowPlaceName, aConvoIsHappening } = useStore((state) => state.global.main, {
            type: "global",
            prop: ["nowPlaceName", "aConvoIsHappening"],
        });
        const editedIsVisible = isVisible && !aConvoIsHappening;
        const [theSpring, theSpringApi] = useSpring(() => ({
            height: editedIsVisible ? measuredHeight : 0,
            position: [0, 0],
            opacity: editedIsVisible ? 1 : 0,
            scale: editedIsVisible ? 1 : 0.1,
            config: { tension: 400, friction: 50 },
            onChange() {
                positionMiniBubbleToCharacter();
            },
        }), [editedIsVisible]);
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
            var _a, _b, _c;
            const { forCharacter } = getState().speechBubbles[name];
            if (!forCharacter)
                return;
            const { dollState, dollName } = (_a = getCharDollStuff(forCharacter)) !== null && _a !== void 0 ? _a : {};
            if (!dollState || !dollName)
                return;
            const { focusedDoll, focusedDollIsInView } = getState().global.main;
            const positionOnScreen = dollState.positionOnScreen;
            // if (dollName === focusedDoll && !focusedDollIsInView) {}
            const viewSize = getScreenSize();
            const farLeft = -viewSize.x / 2;
            const farRight = viewSize.x / 2;
            const farTop = -viewSize.y / 2;
            const farBottom = viewSize.y / 2;
            const bubbleHeight = (_c = (_b = refs.theTextRectangle.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) !== null && _c !== void 0 ? _c : 190;
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
        useStoreEffect(positionMiniBubbleToCharacter, [
            { type: ["dolls"], name: forCharacter, prop: ["positionOnScreen"] },
            { type: ["global"], name: "main", prop: ["slatePos"] },
            { type: ["global"], name: "main", prop: ["slateZoom"] },
            { type: ["global"], name: "main", prop: ["nowCamName"] },
            { type: ["story"], name: "main", prop: ["storyPart"] },
        ], [nowPlaceName]);
        const styles = useMemo(() => ({
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
        }), []);
        return (React.createElement(animated.div, { id: "mini-bubble", style: styles.container },
            React.createElement(animated.div, { ref: refs.theRectangle, key: `theRectangle`, id: `theRectangle`, style: {
                    width: "70px",
                    zIndex: 90,
                    opacity: theSpring.opacity,
                    transform: interpolate([
                        theSpring.position.to((x, y) => `translate(${x}px , ${y}px)`),
                        theSpring.scale.to((scale) => `scale(${scale})`),
                    ], (translate, scale) => `${translate} ${scale}`),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    willChange: "transform, opacity",
                } },
                React.createElement(animated.div, { ref: refs.theTextRectangle, key: `textRectangle`, id: `textRectangle`, style: {
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
                    } },
                    React.createElement("div", { ref: theGoalText, id: `visibleText`, style: styles.visibleText }, text)),
                React.createElement("div", { ref: refs.theTriangle, key: `theTriangle`, id: `theTriangle`, style: styles.triangle }))));
    };
}
