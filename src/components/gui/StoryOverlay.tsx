// @refresh-reset
import React, { useRef } from "react";
import { animated, useSpring } from "react-spring";
import { GameyConceptoFuncs } from "../../concepts/typedConceptoFuncs";

export function makeStoryOverlay<ConceptoFuncs extends GameyConceptoFuncs>(
  conceptoFuncs: ConceptoFuncs
) {
  const { useStoreItemPropsEffect } = conceptoFuncs;

  type Props = {};

  return function StoryOverlay(_props: Props) {
    const theOverlay = useRef<HTMLDivElement>(null);

    const [overlaySpring, overlaySpringApi] = useSpring(() => ({
      opacity: 0,
      config: { tension: 300 },
    }));

    useStoreItemPropsEffect(
      { type: "story", name: "main" },
      {
        storyOverlayToggled({ newValue: isFadeToggled }) {
          overlaySpringApi.start({
            opacity: isFadeToggled ? 1 : 0,
            config: { tension: 100, precision: 0.1, bounce: 0 },
          });
        },
      }
    );

    return (
      <animated.div
        id="story-overlay"
        key={`story-overlay`}
        ref={theOverlay}
        style={
          {
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgb(10, 10, 10)",
            // backgroundColor: "rgb(167, 231, 236)",
            opacity: overlaySpring.opacity,
          } as any
        }
      />
    );
  };
}
