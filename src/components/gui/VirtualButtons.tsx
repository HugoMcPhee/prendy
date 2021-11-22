import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
} from "../../concepts/typedConcepFuncs";
import {
  getSpeedAndAngleFromVector,
  getVectorFromSpeedAndAngle,
  getVectorSpeed,
} from "chootils/dist/speedAngleDistance2d";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { animated, useSpring } from "react-spring";

type VirtualButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  disabled: boolean;
};

export function makeVirtualButtons<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped
>(concepFuncs: ConcepFuncs, BACKDOP_OPTIONS: BackdopOptions) {
  const { getRefs, getState, setState, useStore } = concepFuncs;
  const { hasInteracting, hasJumping } = BACKDOP_OPTIONS;

  const globalRefs = getRefs().global.main;

  type Props = {};

  const SIZES = {
    leftThumbContainer: 110,
  };

  function VirtualButton({
    children,
    onPress,
    onPointerDown,
    onPointerUp,
    disabled,
  }: VirtualButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    // console.log("disabled", disabled);

    const styles = useMemo(
      () => ({
        container: {
          width: "100px",
          height: "100px",
          borderRadius: "100px",
          backgroundColor: "rgba(210, 210, 210, 0.3)",
          fontSize: "50px",
          pointerEvents: disabled ? ("none" as const) : ("all" as const),
          border: "none",
          marginTop: "10px",
        },
        text: {
          filter: "grayscale(100%) contrast(0%) brightness(1.5)",
        },
      }),
      [disabled]
    );

    const spring = useSpring({
      opacity: isPressed ? 0.3 : 0.4,
      scale: isPressed ? 1.1 : 1,
      config: { tension: 300 },
    });

    return (
      <animated.button
        onClick={disabled ? undefined : onPress}
        onPointerDown={() => {
          if (disabled) return;
          setIsPressed(true);
          onPointerDown?.();
          setState({
            players: { main: { virtualControlsPressTime: Date.now() } },
          });
        }}
        onPointerUp={() => {
          if (disabled) return;
          setIsPressed(false);
          onPointerUp?.();
          setState({
            players: { main: { virtualControlsReleaseTime: Date.now() } },
          });
        }}
        style={{
          ...styles.container,
          transform: spring.scale.to((scale) => `scale(${scale} )`),
          opacity: spring.opacity,
        }}
      >
        <div style={styles.text}>{children}</div>
      </animated.button>
    );
  }

  return function VirtualButtons(_: Props) {
    const { canShowVirtualButtons } = useStore(
      ({ players: { main } }) => main,
      {
        type: "players",
        name: "main",
        prop: ["canShowVirtualButtons"],
      }
    );

    // 🔺➰🐸
    // ❔👋❓💭⏩🗣️💡

    const spring = useSpring({
      opacity: canShowVirtualButtons ? 1 : 0,
      // config: { tension: 300 },
    });

    return (
      <animated.div
        id="virtual-buttons"
        style={{
          // pointerEvents: canShowVirtualButtons ? "auto" : "none",
          // pointerEvents: "none",
          opacity: spring.opacity,
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex" as const,
          justifyContent: "flex-end" as const,
          alignItems: "flex-end" as const,
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
        }}
      >
        {hasJumping && (
          <VirtualButton
            onPointerDown={() =>
              setState({
                players: { main: { jumpButtonPressTime: Date.now() } },
              })
            }
            onPointerUp={() =>
              setState({
                players: { main: { jumpButtonReleaseTime: Date.now() } },
              })
            }
            disabled={!canShowVirtualButtons}
          >
            {/* making rounded triangles - Knod -
            https://codepen.io/knod/pen/KzRYye */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="svg-triangle"
              viewBox="0 0 100 100"
            >
              <path
                d="M 50,35 70,70 30,70 z"
                style={{
                  strokeWidth: 20,
                  stroke: "black",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                }}
              />
            </svg>
          </VirtualButton>
        )}
        {hasInteracting && (
          <VirtualButton
            onPress={() =>
              setState({
                players: { main: { interactButtonPressTime: Date.now() } },
              })
            }
            disabled={!canShowVirtualButtons}
          >
            👆
          </VirtualButton>
        )}
      </animated.div>
    );
  };
}
