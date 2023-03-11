import React, { useState, useMemo } from "react";
import { animated, useSpring } from "react-spring";
export function get_VirtualButtons(storeHelpers, PRENDY_OPTIONS) {
    const { getRefs, getState, setState, useStore } = storeHelpers;
    const { hasInteracting, hasJumping } = PRENDY_OPTIONS;
    const globalRefs = getRefs().global.main;
    const SIZES = {
        leftThumbContainer: 110,
    };
    function VirtualButton({ children, onPress, onPointerDown, onPointerUp, disabled }) {
        const [isPressed, setIsPressed] = useState(false);
        // console.log("disabled", disabled);
        const styles = useMemo(() => ({
            container: {
                width: "100px",
                height: "100px",
                borderRadius: "100px",
                backgroundColor: "rgba(210, 210, 210, 0.3)",
                fontSize: "50px",
                pointerEvents: disabled ? "none" : "all",
                border: "none",
                marginTop: "10px",
            },
            text: {
                filter: "grayscale(100%) contrast(0%) brightness(1.5)",
            },
        }), [disabled]);
        const spring = useSpring({
            opacity: isPressed ? 0.3 : 0.4,
            scale: isPressed ? 1.1 : 1,
            config: { tension: 300 },
        });
        return (React.createElement(animated.button, { onClick: disabled ? undefined : onPress, onPointerDown: () => {
                if (disabled)
                    return;
                setIsPressed(true);
                onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown();
                setState({
                    players: { main: { virtualControlsPressTime: Date.now() } },
                });
            }, onPointerUp: () => {
                if (disabled)
                    return;
                setIsPressed(false);
                onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp();
                setState({
                    players: { main: { virtualControlsReleaseTime: Date.now() } },
                });
            }, style: {
                ...styles.container,
                transform: spring.scale.to((scale) => `scale(${scale} )`),
                opacity: spring.opacity,
            } },
            React.createElement("div", { style: styles.text }, children)));
    }
    return function VirtualButtons(_) {
        const { canShowVirtualButtons } = useStore(({ players: { main } }) => main, {
            type: "players",
            name: "main",
            prop: ["canShowVirtualButtons"],
        });
        // 🔺➰🐸
        // ❔👋❓💭⏩🗣️💡
        const spring = useSpring({
            opacity: canShowVirtualButtons ? 1 : 0,
            // config: { tension: 300 },
        });
        return (React.createElement(animated.div, { id: "virtual-buttons", style: {
                // pointerEvents: canShowVirtualButtons ? "auto" : "none",
                // pointerEvents: "none",
                opacity: spring.opacity,
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "column",
                boxSizing: "border-box",
                // backgroundColor: "blue",
                flexShrink: 1,
                zIndex: 10000,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                paddingBottom: "15px",
                paddingRight: "15px",
            } },
            hasJumping && (React.createElement(VirtualButton, { onPointerDown: () => setState({
                    players: { main: { jumpButtonPressTime: Date.now() } },
                }), onPointerUp: () => setState({
                    players: { main: { jumpButtonReleaseTime: Date.now() } },
                }), disabled: !canShowVirtualButtons },
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", className: "svg-triangle", viewBox: "0 0 100 100" },
                    React.createElement("path", { d: "M 50,35 70,70 30,70 z", style: {
                            strokeWidth: 20,
                            stroke: "black",
                            strokeLinejoin: "round",
                            strokeLinecap: "round",
                        } })))),
            hasInteracting && (React.createElement(VirtualButton, { onPress: () => setState({
                    players: { main: { interactButtonPressTime: Date.now() } },
                }), disabled: !canShowVirtualButtons }, "\uD83D\uDC46"))));
    };
}
