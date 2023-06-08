import React, { useEffect, useRef } from "react";
import { addLayout } from "../helpers/styles";
export function get_AllTestVideoStuff(storeHelpers, placeNames) {
    const { useStore, useStoreItemPropsEffect } = storeHelpers;
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
        useStoreItemPropsEffect({ type: "sliceVids", name: placeName }, {
            stateVidId_playing() {
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
            sliceVidState({ newValue }) {
                const isLoaded = newValue !== "unloaded";
                if (mainRef.current) {
                    mainRef.current.style.display = isLoaded ? "block" : "none";
                }
            },
        });
        return (React.createElement("div", { ref: mainRef },
            React.createElement("div", { ref: vidContainerRefA, style: { ...addLayout("center") }, id: `${placeName}_a` },
                "A",
                React.createElement("div", { style: { ...addLayout("center") }, id: `${placeName}_a_color` }),
                React.createElement("div", { style: { ...addLayout("center") }, id: `${placeName}_a_depth` })),
            React.createElement("div", { ref: vidContainerRefB, style: { ...addLayout("center") }, id: `${placeName}_b` },
                "B",
                React.createElement("div", { style: { ...addLayout("center") }, id: `${placeName}_b_color` }),
                React.createElement("div", { style: { ...addLayout("center") }, id: `${placeName}_b_depth` }))));
    }
    function TestVideoState({ placeName }) {
        const sliceVidState = useStore((state) => state.sliceVids[placeName].sliceVidState, {
            type: "sliceVids",
            prop: ["sliceVidState"],
            name: placeName,
        });
        const { stateVidId_waiting, stateVidId_playing } = useStore((state) => state.sliceVids[placeName], {
            type: "sliceVids",
            prop: ["stateVidId_waiting", "stateVidId_playing"],
            name: placeName,
        });
        return (React.createElement("div", { style: {
                display: sliceVidState === "unloaded" ? "none" : "block",
                width: 100,
            } },
            React.createElement("div", null, sliceVidState),
            React.createElement("div", null, `▶ ${stateVidId_playing}`),
            React.createElement("div", null, `➰ ${stateVidId_waiting}`)));
    }
    return function AllTestVideoStuff() {
        return (React.createElement(React.Fragment, null,
            placeNames.map((placeName) => (React.createElement("div", { style: { ...addLayout({ x: "center", y: "center", way: "right" }) } },
                React.createElement(TestVideos, { placeName: placeName }),
                React.createElement(TestVideoState, { placeName: placeName })))),
            " "));
    };
}
// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
