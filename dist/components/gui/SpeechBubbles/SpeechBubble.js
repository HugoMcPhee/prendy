// @refresh-reset
import { sizeFromRef } from "chootils/dist/elements";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { getScreenSize } from "../../../helpers/babylonjs/slate";
import { get_getCharDollStuff } from "../../../helpers/prendyUtils/characters";
// import "./SpeechBubble.css";
const BUBBLE_WIDTH = 230;
const BUBBLE_HEIGHT_RATIO = 0.74814;
const BUBBLE_HEIGHT = BUBBLE_WIDTH * BUBBLE_HEIGHT_RATIO;
const TRIANGLE_SIZE = 25;
export function get_SpeechBubble(storeHelpers, prendyStartOptions, speechVidFiles) {
    const { getState, useStore, useStoreEffect, getRefs } = storeHelpers;
    const globalRefs = getRefs().global.main;
    const getCharDollStuff = get_getCharDollStuff(storeHelpers);
    return function SpeechBubble({ name }) {
        var _a, _b;
        const theRectangle = useRef(null);
        const theTextRectangle = useRef(null);
        const theTriangle = useRef(null);
        const theText = useRef(null);
        const theTextHolder = useRef(null);
        const forCharacter = (_a = getState().speechBubbles[name].forCharacter) !== null && _a !== void 0 ? _a : "walker";
        const [measuredHeight, setMeasuredHeight] = useState(0);
        const refs = {
            theRectangle,
            theTextRectangle,
            theTriangle,
            theText,
            theTextHolder,
        };
        const { goalText, isVisible, font, zIndex, visibleLetterAmount, _goalTextWordLetterArrays, _specialTextByLetterIndex, stylesBySpecialText, nowVideoName, } = useStore((state) => state.speechBubbles[name], {
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
            }
            else {
                if (isVisible)
                    height = measuredHeight;
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
        useStoreEffect(positionSpeechBubbleToCharacter, [
            { type: ["dolls"], name: forCharacter, prop: ["positionOnScreen"] },
            { type: ["global"], name: "main", prop: ["slatePos"] },
            { type: ["global"], name: "main", prop: ["slateZoom"] },
            { type: ["story"], name: "main", prop: ["storyPart"] },
            { type: ["global"], name: "main", prop: ["nowCamName"] },
        ], [nowPlaceName]);
        const styles = useMemo(() => ({
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
        }), [font, videoIsPlaying]);
        const containerStyle = useMemo(() => ({
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
            verticalAlign: "middle",
            fontSize: "30px",
            color: "rgb(68, 68, 68)",
        }), [zIndex]);
        return (React.createElement("div", { id: `speech-bubble-${name}`, style: containerStyle },
            React.createElement(animated.div, { ref: refs.theRectangle, key: `theRectangle`, id: `theRectangle`, style: {
                    width: `${BUBBLE_WIDTH}px`,
                    //   zIndex: 100,
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
                        width: `${BUBBLE_WIDTH}px`,
                        borderRadius: "40px",
                        borderWidth: "1px",
                        paddingBottom: "5px",
                        zIndex: 100,
                        height: theSpring.height,
                        overflow: "hidden",
                        willChange: "height",
                        position: "relative", // fixes overflow not working
                    } },
                    React.createElement("div", { ref: theTextHolder, style: styles.hiddenGoalText },
                        videoIsPlaying && (React.createElement("video", { 
                            // width="100%"
                            width: `${BUBBLE_WIDTH}px`, height: `${BUBBLE_HEIGHT}px`, autoPlay: true, loop: true, src: (_b = speechVidFiles[nowVideoName !== null && nowVideoName !== void 0 ? nowVideoName : ""]) !== null && _b !== void 0 ? _b : "" })),
                        _goalTextWordLetterArrays.map((wordLetters, wordIndex) => {
                            let letterAmountFromPreviousWords = wordIndex > 0 ? _goalTextWordLetterArrays.slice(0, wordIndex - 1).flat().length : 0;
                            return (React.createElement("span", { className: "SpeechBubble-wordLettersHolder", key: "" + wordLetters + wordIndex }, wordLetters.map((letter, wordLetterIndex) => {
                                const textLetterIndex = (letterAmountFromPreviousWords || -1) + wordLetterIndex;
                                const isVisible = textLetterIndex < visibleLetterAmount;
                                // NOTE this is maybe undefiend, but typescript rules dont treat it like that atm
                                const customStyle = stylesBySpecialText[_specialTextByLetterIndex[textLetterIndex + 1]];
                                return (React.createElement("div", { key: "" + letter + wordLetterIndex, className: isVisible ? "SpeechBubble-visibleLetter" : "SpeechBubble-hiddenLetter", style: customStyle }, `${letter}`));
                            })));
                        }))),
                React.createElement("div", { ref: refs.theTriangle, key: `theTriangle`, id: `theTriangle`, style: styles.triangle }))));
    };
}
