// @refresh-reset
import React, { useRef } from "react";
import { animated, useSpring } from "react-spring";
import { BackdopConcepFuncs } from "../../concepts/typedConcepFuncs";

export function makeLoadingOverlay<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { useStoreItemPropsEffect, setState } = concepFuncs;

  type Props = {};

  return function LoadingOverlay(_props: Props) {
    const theOverlay = useRef<HTMLDivElement>(null);

    const [overlaySpring, overlaySpringApi] = useSpring(() => ({
      opacity: 1,
      config: { tension: 300 },
    }));

    useStoreItemPropsEffect(
      { type: "global", name: "main", flow: "default" },
      {
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
      }
    );

    return (
      <animated.div
        ref={theOverlay}
        style={
          {
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
          } as any
        }
        key={`loading_overlay`}
        id={`loading_overlay`}
      />
    );
  };
}
