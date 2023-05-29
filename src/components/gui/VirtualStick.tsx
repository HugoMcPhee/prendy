import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import {
  getSpeedAndAngleFromVector,
  getVectorFromSpeedAndAngle,
  getVectorSpeed,
} from "chootils/dist/speedAngleDistance2d";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { animated, useSpring } from "react-spring";

export function get_VirtualStick<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { getRefs, getState, setState } = storeHelpers;

  const globalRefs = getRefs().global.main;

  type Props = {};

  const SIZES = {
    leftThumbContainer: 110,
  };

  return function VirtualStick(_: Props) {
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
      //
      pointerId: 0,
    });

    const leftPuck = useRef<HTMLDivElement>(null);
    const leftThumbContainer = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      const pointerMoveEvent = (event: PointerEvent) => {
        // if the pointerId doesnt match, return
        if (event.pointerId !== local.pointerId) return;

        const { leftPuck, leftThumbContainer } = refs;

        if (!leftPuck || !leftThumbContainer) return;

        if (!local.isDown) return;

        const coordinates = {
          x: event.clientX,
          y: event.clientY,
        };

        local.xAddPos = coordinates.x - SIZES.leftThumbContainer * 0.5 - local.leftJoystickOffset;

        local.yAddPos = coordinates.y - SIZES.leftThumbContainer * 0.5 - local.topJoystickOffset;

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

      const pointerUpEvent = (event: PointerEvent) => {
        console.log("event.type", event.type, event.pointerId);

        // if the pointerId doesnt match, return
        if (event.pointerId !== local.pointerId) return;

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
        } else {
          // set the input velocity to 0 if the virtual stick wasn't pressed
          setState({ players: { main: { inputVelocity: { x: 0, y: 0 } } } });
        }
        setState({
          players: { main: { virtualControlsReleaseTime: Date.now() } },
        });
      };

      const pointerDownEvent = (event: PointerEvent) => {
        requestAnimationFrame(() => {
          // if (!globalRefs.isHoveringVirtualStickArea) return;

          // if the stick is already being held down, don't do anything
          if (local.isDown) return;

          local.pointerId = event.pointerId;

          // const { virtualControlsPressTime, virtualControlsReleaseTime } = getState().players.main;
          // const virtualStickIsHeld = virtualControlsPressTime > virtualControlsReleaseTime;
          // if (virtualStickIsHeld) return;

          local.pointerDownTime = Date.now();
          const { leftPuck, leftThumbContainer } = refs;
          if (!leftPuck || !leftThumbContainer) return;

          const coordinates = {
            x: event.clientX,
            y: event.clientY,
          };

          // leftPuck.isVisible = true;
          local.leftJoystickOffset = coordinates.x - SIZES.leftThumbContainer * 0.5;
          local.topJoystickOffset = coordinates.y - SIZES.leftThumbContainer * 0.5;
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
        });
      };

      window.addEventListener("pointerup", pointerUpEvent);
      window.addEventListener("pointercancel", pointerUpEvent);
      window.addEventListener("pointerdown", pointerDownEvent);
      window.addEventListener("pointermove", pointerMoveEvent);
      return () => {
        window.removeEventListener("pointerup", pointerUpEvent);
        window.removeEventListener("pointercancel", pointerUpEvent);
        window.removeEventListener("pointerdown", pointerDownEvent);
        window.removeEventListener("pointermove", pointerMoveEvent);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        id="virtual-stick"
        // onPointerDown={pointerDownEvent}
        // onPointerUp={pointerUpEvent}
        style={{
          // pointerEvents: "auto" as const,
          pointerEvents: "none" as const,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <animated.div
          ref={refs.leftThumbContainer}
          style={
            {
              position: "relative",
              backgroundColor: "rgba(232, 232, 232, 0.5)",
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
              willChange: "transform, opacity",
            } as any
          }
          id="leftThumb"
          // isPointerBlocker={true}
        >
          <animated.div
            ref={refs.leftPuck}
            style={
              {
                position: "relative",
                backgroundColor: "rgba(232, 232, 232, 0.75)",
                padding: 0,
                height: "60px",
                width: "60px",
                borderRadius: "500px",
                // transform: `translate(${local.leftJoystickOffset}px , ${local.topJoystickOffset}px )`,
                transform: spring.position.to((x, y) => `translate(${x}px , ${y}px )`),
                opacity: opacitySpring.circleOpacity,
                willChange: "transform, opacity",
              } as any
            }
            id="leftPuck"
            // isPointerBlocker={true}
          />
        </animated.div>
      </div>
    );
  };
}
