// @refresh-reset
import React from "react";
export function makeAlarmText(concepFuncs) {
    const { useStore } = concepFuncs;
    return function AlarmText(_props) {
        const { alarmText, alarmTextIsVisible } = useStore(({ story: { main } }) => main, {
            type: "story",
            name: "main",
            prop: ["alarmText", "alarmTextIsVisible"],
        });
        if (!alarmTextIsVisible) {
            return null;
        }
        return (React.createElement("div", { key: `alarm_text_box`, id: `alarm_text_box`, style: styles.container },
            React.createElement("div", { id: `alarm_text`, style: styles.text }, alarmText)));
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
        fontSize: 120,
        zIndex: 1000,
        textAlign: "center",
        maxWidth: 800,
    },
};
