// @refresh-reset
import React, { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { sizeFromRef } from "shutils/dist/elements";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
// import "./SpeechBubble.css";
export function makeSpeechBubble(conceptoFuncs) {
    const { getState, useStore, useStoreEffect } = conceptoFuncs;
    const getCharDollStuff = makeGetCharDollStuff(conceptoFuncs);
    return function SpeechBubble({ name }) {
        var _a;
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
        const { goalText, isVisible, font, zIndex, visibleLetterAmount, _goalTextWordLetterArrays, _specialTextByLetterIndex, stylesBySpecialText, } = useStore((state) => state.speechBubbles[name], {
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
        const [theSpring, theSpringApi] = useSpring(() => ({
            height: isVisible ? measuredHeight : 0,
            position: [0, 0],
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.1,
            config: { tension: 400, friction: 50 },
            onChange() {
                positionSpeechBubbleToCharacter();
            },
        }), [isVisible]);
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
            var _a, _b, _c;
            const { forCharacter } = getState().speechBubbles[name];
            if (!forCharacter)
                return;
            const { dollState, dollName } = (_a = getCharDollStuff(forCharacter)) !== null && _a !== void 0 ? _a : {};
            if (!dollState || !dollName)
                return;
            const { positionOnPlaneScene } = dollState;
            const newPositionX = positionOnPlaneScene.x;
            let yOffset = ((_c = (_b = refs.theTextRectangle.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) !== null && _c !== void 0 ? _c : 190) / 2;
            const newPositionY = positionOnPlaneScene.y - yOffset;
            theSpringApi.start({
                position: [newPositionX, newPositionY],
                immediate: true,
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        useStoreEffect(() => {
            positionSpeechBubbleToCharacter();
        }, [
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
        }), [font]);
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
                    width: "230px",
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
                        width: "230px",
                        borderRadius: "40px",
                        borderWidth: "1px",
                        paddingBottom: "5px",
                        zIndex: 100,
                        height: theSpring.height,
                        overflow: "hidden",
                        willChange: "height",
                        position: "relative", // fixes overflow not working
                    } },
                    React.createElement("div", { ref: theTextHolder, style: styles.hiddenGoalText }, _goalTextWordLetterArrays.map((wordLetters, wordIndex) => {
                        let letterAmountFromPreviousWords = wordIndex > 0
                            ? _goalTextWordLetterArrays.slice(0, wordIndex - 1).flat()
                                .length
                            : 0;
                        return (React.createElement("span", { className: "SpeechBubble-wordLettersHolder" }, wordLetters.map((letter, wordLetterIndex) => {
                            const textLetterIndex = (letterAmountFromPreviousWords || -1) + wordLetterIndex;
                            const isVisible = textLetterIndex < visibleLetterAmount;
                            // NOTE this is maybe undefiend, but typescript rules dont treat it like that atm
                            const customStyle = stylesBySpecialText[_specialTextByLetterIndex[textLetterIndex + 1]];
                            return (React.createElement("div", { className: isVisible
                                    ? "SpeechBubble-visibleLetter"
                                    : "SpeechBubble-hiddenLetter", style: customStyle }, `${letter}`));
                        })));
                    }))),
                React.createElement("div", { ref: refs.theTriangle, key: `theTriangle`, id: `theTriangle`, style: styles.triangle }))));
    };
}
