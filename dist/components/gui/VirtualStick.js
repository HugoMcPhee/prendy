import { getSpeedAndAngleFromVector, getVectorFromSpeedAndAngle, getVectorSpeed, } from "chootils/dist/speedAngleDistance2d";
import React, { useCallback, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
export function makeVirtualStick(concepFuncs) {
    const { getRefs, getState, setState } = concepFuncs;
    const globalRefs = getRefs().global.main;
    const SIZES = {
        leftThumbContainer: 110,
    };
    return function VirtualStick(_) {
        const { current: local } = useRef({
            springAllowed: true,
            cameraJustChanged: false,
            // circleRef: null as null | Ellipse
            xAddPos: 0,
            yAddPos: 0,
            xAddRot: 0,
            yAddRot: 0,
            leftJoystickOffset: 10,
            topJoystickOffset: 10,
            //
            isDown: false,
            floatLeft: 0,
            floatTop: 0,
            //
            pointerDownTime: 0, // timestamp
        });
        const leftPuck = useRef(null);
        const leftThumbContainer = useRef(null);
        const refs = {
            leftPuck,
            leftThumbContainer,
        };
        const [spring, springApi] = useSpring(() => ({
            position: [0, 0],
            config: { tension: 300 },
        }));
        const [outerPositionSpring, outerPositionSpringApi] = useSpring(() => ({
            position: [0, 0],
            config: { tension: 300 },
        }));
        const [opacitySpring, opacitySpringApi] = useSpring(() => ({
            circleOpacity: 1,
            outerOpacity: 0,
            config: { tension: 300, bounce: 0 },
        }));
        const pointerDownEvent = useCallback((event) => {
            local.pointerDownTime = Date.now();
            const { leftPuck, leftThumbContainer } = refs;
            if (!leftPuck || !leftThumbContainer)
                return;
            const coordinates = {
                x: event.clientX,
                y: event.clientY,
            };
            // leftPuck.isVisible = true;
            local.leftJoystickOffset =
                coordinates.x - SIZES.leftThumbContainer * 0.5;
            local.topJoystickOffset =
                coordinates.y - SIZES.leftThumbContainer * 0.5;
            local.isDown = true;
            outerPositionSpringApi.start({
                position: [local.leftJoystickOffset, local.topJoystickOffset],
                immediate: true,
            });
            opacitySpringApi.start({
                circleOpacity: 1.0,
                outerOpacity: 0.9,
            });
            setState({
                players: { main: { virtualControlsPressTime: Date.now() } },
            });
        }, []);
        const pointerUpEvent = useCallback((_event) => {
            local.isDown = false;
            const { inputVelocity } = getState().players.main;
            opacitySpringApi.start({ circleOpacity: 0.5, outerOpacity: 0 });
            springApi.start({ position: [0, 0], immediate: false });
            // check if its been a short time since pressing down,
            // and if the stick hasnt moved much?
            const timeSincePointerDown = Date.now() - local.pointerDownTime;
            const wasAShortTime = timeSincePointerDown < 250;
            const didntMoveJoystickFar = getVectorSpeed(inputVelocity) < 0.1;
            if (wasAShortTime && didntMoveJoystickFar) {
                if (!globalRefs.isHoveringPickupButton) {
                    setState({
                        players: { main: { interactButtonPressTime: Date.now() } },
                    });
                }
            }
            else {
                // set the input velocity to 0 if the virtual stick wasn't pressed
                setState({ players: { main: { inputVelocity: { x: 0, y: 0 } } } });
            }
            setState({
                players: { main: { virtualControlsReleaseTime: Date.now() } },
            });
        }, []);
        useEffect(() => {
            // leftThumbContainer.onPointerUpObservable.add((coordinates) => {});
            const pointerMoveEvent = (event) => {
                // const { playerMovingPaused } = getGlobalState();
                // if (playerMovingPaused) {
                //   if (local.isDown) {
                //     pointerUpEvent();
                //     setState({ players: { main: { inputVelocity: { x: 0, y: 0 } } } });
                //     onNextTick(() =>
                //       setState({
                //         players: { main: { inputVelocity: { x: 0.01, y: 0.01 } } }, // hacky fix for now, its not seeing when the input velocity is 0, maybe if its check pointIsZero ?
                //       })
                //     );
                //   }
                //   return;
                // }
                const { leftPuck, leftThumbContainer } = refs;
                if (!leftPuck || !leftThumbContainer)
                    return;
                if (!local.isDown)
                    return;
                const coordinates = {
                    x: event.clientX,
                    y: event.clientY,
                };
                if (!local.isDown)
                    return;
                local.xAddPos =
                    coordinates.x -
                        SIZES.leftThumbContainer * 0.5 -
                        local.leftJoystickOffset;
                local.yAddPos =
                    coordinates.y -
                        SIZES.leftThumbContainer * 0.5 -
                        local.topJoystickOffset;
                const limitedOffset = 35;
                const { angle, speed } = getSpeedAndAngleFromVector({
                    x: local.xAddPos,
                    y: local.yAddPos,
                });
                let editedSpeed = speed > limitedOffset ? limitedOffset : speed;
                const clampedPosition = getVectorFromSpeedAndAngle(editedSpeed, angle);
                const normalizedPosition = getVectorFromSpeedAndAngle(editedSpeed / limitedOffset, angle);
                local.floatLeft = clampedPosition.x;
                local.floatTop = clampedPosition.y;
                springApi.start({
                    position: [local.floatLeft, local.floatTop],
                    immediate: true,
                });
                setState({
                    players: {
                        main: { inputVelocity: normalizedPosition },
                    },
                });
            };
            // window.addEventListener("pointerup", pointerUpEvent);
            // window.addEventListener("pointercancel", pointerUpEvent);
            // window.addEventListener("pointerdown", pointerDownEvent);
            window.addEventListener("pointermove", pointerMoveEvent);
            return () => {
                // window.removeEventListener("pointerup", pointerUpEvent);
                // window.removeEventListener("pointercancel", pointerUpEvent);
                // window.removeEventListener("pointerdown", pointerDownEvent);
                window.removeEventListener("pointermove", pointerMoveEvent);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (React.createElement("div", { id: "virtual-stick", onPointerDown: pointerDownEvent, onPointerUp: pointerUpEvent, style: {
                pointerEvents: "auto",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 100,
                overflow: "hidden",
            } },
            React.createElement(animated.div, { ref: refs.leftThumbContainer, style: {
                    position: "relative",
                    backgroundColor: "rgba(232, 232, 232, 0.1)",
                    padding: 0,
                    height: SIZES.leftThumbContainer + "px",
                    width: SIZES.leftThumbContainer + "px",
                    borderRadius: "500px",
                    transform: outerPositionSpring.position.to((x, y) => `translate(${x}px , ${y}px )`),
                    opacity: opacitySpring.outerOpacity,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    direction: "row",
                }, id: "leftThumb" },
                React.createElement(animated.div, { ref: refs.leftPuck, style: {
                        position: "relative",
                        backgroundColor: "rgba(232, 232, 232, 0.25)",
                        padding: 0,
                        height: "60px",
                        width: "60px",
                        borderRadius: "500px",
                        // transform: `translate(${local.leftJoystickOffset}px , ${local.topJoystickOffset}px )`,
                        transform: spring.position.to((x, y) => `translate(${x}px , ${y}px )`),
                        opacity: opacitySpring.circleOpacity,
                    }, id: "leftPuck" }))));
    };
}
