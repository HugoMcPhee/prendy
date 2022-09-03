// @refresh-reset
import React, { useRef } from "react";
import { animated, useSpring } from "react-spring";
export function makeTyped_LoadingOverlay(storeHelpers) {
    const { useStoreItemPropsEffect, setState } = storeHelpers;
    return function LoadingOverlay(_props) {
        const theOverlay = useRef(null);
        const [overlaySpring, overlaySpringApi] = useSpring(() => ({
            opacity: 1,
            config: { tension: 300 },
        }));
        useStoreItemPropsEffect({ type: "global", name: "main", step: "default" }, {
            loadingOverlayToggled({ newValue: isFadeToggled }) {
                overlaySpringApi.start({
                    opacity: isFadeToggled ? 1 : 0,
                    config: { tension: 100, precision: 0.1, bounce: 0 },
                    onRest({ value: { opacity } }) {
                        if (opacity > 0.5) {
                            // console.log("about to sey loadingOverlayFullyShowing");
                            setState({
                                global: { main: { loadingOverlayFullyShowing: true } },
                            });
                        }
                    },
                });
            },
        });
        return (React.createElement(animated.div, { ref: theOverlay, style: {
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb(0, 0, 0)",
                zIndex: 100000,
                opacity: overlaySpring.opacity,
                // opacity: 0,
            }, key: `loading_overlay`, id: `loading_overlay` }));
    };
}
