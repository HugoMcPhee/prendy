import React, { useEffect, useRef } from "react";
import { andLayout } from "../utils/styles";
export function makeAllTestVideoStuff(conceptoFuncs, placeNames) {
    const { useStore, useStoreItemPropsEffect } = conceptoFuncs;
    function TestVideos({ placeName }) {
        const mainRef = useRef(null);
        const vidContainerRefA = useRef(null);
        const vidContainerRefB = useRef(null);
        // const vidRefsByLetter = {
        //   a: vidContainerRefA,
        //   b: vidContainerRefB,
        // };
        useEffect(() => {
            if (mainRef.current) {
                mainRef.current.style.display = "none";
            }
        }, []);
        // show one vid at a time
        useStoreItemPropsEffect({ type: "sectionVids", name: placeName }, {
            stackVidId_playing() {
                // vidLetter_play({ newValue }) {
                // if (!newValue) return;
                // const playingVidId = getLetterVidId("house", newValue);
                //
                // if (vidRefsByLetter.a.current) {
                //   vidRefsByLetter.a.current.style.display =
                //     newValue === "a" ? "block" : "none";
                // }
                // if (vidRefsByLetter.b.current) {
                //   vidRefsByLetter.b.current.style.display =
                //     newValue === "b" ? "block" : "none";
                // }
            },
            sectionVidState({ newValue }) {
                const isLoaded = newValue !== "unloaded";
                if (mainRef.current) {
                    mainRef.current.style.display = isLoaded ? "block" : "none";
                }
            },
        });
        return (React.createElement("div", { ref: mainRef },
            React.createElement("div", { ref: vidContainerRefA, style: { ...andLayout("center") }, id: `${placeName}_a` },
                "A",
                React.createElement("div", { style: { ...andLayout("center") }, id: `${placeName}_a_color` }),
                React.createElement("div", { style: { ...andLayout("center") }, id: `${placeName}_a_depth` })),
            React.createElement("div", { ref: vidContainerRefB, style: { ...andLayout("center") }, id: `${placeName}_b` },
                "B",
                React.createElement("div", { style: { ...andLayout("center") }, id: `${placeName}_b_color` }),
                React.createElement("div", { style: { ...andLayout("center") }, id: `${placeName}_b_depth` }))));
    }
    function TestVideoState({ placeName }) {
        const sectionVidState = useStore((state) => state.sectionVids[placeName].sectionVidState, { type: "sectionVids", prop: ["sectionVidState"], name: placeName });
        const { stackVidId_waiting, stackVidId_playing } = useStore((state) => state.sectionVids[placeName], {
            type: "sectionVids",
            prop: ["stackVidId_waiting", "stackVidId_playing"],
            name: placeName,
        });
        return (React.createElement("div", { style: {
                display: sectionVidState === "unloaded" ? "none" : "block",
                width: 100,
            } },
            React.createElement("div", null, sectionVidState),
            React.createElement("div", null, `▶ ${stackVidId_waiting}`),
            React.createElement("div", null, `➰ ${stackVidId_playing}`)));
    }
    return function AllTestVideoStuff() {
        return (React.createElement(React.Fragment, null,
            placeNames.map((placeName) => (React.createElement("div", { style: { ...andLayout({ x: "center", y: "center", way: "right" }) } },
                React.createElement(TestVideos, { placeName: placeName }),
                React.createElement(TestVideoState, { placeName: placeName })))),
            " "));
    };
}
// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
