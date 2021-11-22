// @refresh-reset
import React from "react";
import { animated, useSpring } from "react-spring";
import { getRandomInt } from "chootils/dist/numbers";
export function makeScreenSticker(concepFuncs) {
    const { useStore } = concepFuncs;
    const EDGE_PADDING = 65;
    return function ScreenSticker(_props) {
        const { screenStickerText, screenStickerIsVisible, screenStickerPosition, } = useStore(({ story: { main } }) => main, {
            type: "story",
            name: "main",
            prop: [
                "screenStickerText",
                "screenStickerIsVisible",
                "screenStickerPosition",
            ],
        });
        const [theSpring, theSpringApi] = useSpring(() => ({
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
        }), [screenStickerIsVisible]);
        if (!screenStickerIsVisible) {
            return null;
        }
        return (React.createElement("div", { key: `alarm_text_box`, id: `alarm_text_box`, style: styles.container },
            React.createElement(animated.div, { id: `alarm_text`, style: {
                    ...styles.sticker,
                    transform: `translate(${EDGE_PADDING +
                        screenStickerPosition.x * (window.innerWidth - EDGE_PADDING * 2)}px ,${EDGE_PADDING +
                        screenStickerPosition.y * (window.innerHeight - EDGE_PADDING * 2)}px)`,
                    rotateZ: getRandomInt(-45, 45),
                    ...theSpring,
                } }, screenStickerText)));
    };
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
        },
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
        },
    };
}
