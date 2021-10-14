// @refresh-reset
import React from "react";
import { GameyConceptoFuncs } from "../../concepts/typedConceptoFuncs";

export function makeAlarmText<ConceptoFuncs extends GameyConceptoFuncs>(
  conceptoFuncs: ConceptoFuncs
) {
  const { useStore } = conceptoFuncs;

  type Props = {};

  return function AlarmText(_props: Props) {
    const { alarmText, alarmTextIsVisible } = useStore(
      ({ story: { main } }) => main,
      {
        type: "story",
        name: "main",
        prop: ["alarmText", "alarmTextIsVisible"],
      }
    );

    if (!alarmTextIsVisible) {
      return null;
    }

    return (
      <div
        key={`alarm_text_box`}
        id={`alarm_text_box`}
        style={styles.container}
      >
        <div id={`alarm_text`} style={styles.text}>
          {alarmText}
        </div>
      </div>
    );
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
    },
    text: {
      color: "rgb(233, 233, 233)",
      fontFamily: "Jua",
      fontSize: 120,
      zIndex: 1000,
      textAlign: "center",
      maxWidth: 800,
    },
  } as const;
}
