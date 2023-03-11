// @refresh-reset
import React from "react";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function get_AlarmText<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { useStore } = storeHelpers;

  type Props = {};

  return function AlarmText(_props: Props) {
    const { alarmText, alarmTextIsVisible } = useStore(({ global: { main } }) => main, {
      type: "global",
      name: "main",
      prop: ["alarmText", "alarmTextIsVisible"],
    });

    if (!alarmTextIsVisible) {
      return null;
    }

    return (
      <div key={`alarm_text_box`} id={`alarm_text_box`} style={styles.container}>
        <div id={`alarm_text`} style={styles.text}>
          {alarmText}
        </div>
      </div>
    );
  };
}

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
    // fontFamily: "Fleur De Leah", // TODO support alarm text font option, and state or refs, Temporary push for a project
    fontSize: 90,
    zIndex: 1000,
    textAlign: "center",
    maxWidth: 800,
    textShadow: "1px 1px 2px rgb(115, 115, 115)",
  },
} as const;
