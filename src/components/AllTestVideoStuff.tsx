import React, { ReactNode, useEffect, useRef } from "react";
import { MyTypes } from "../declarations";
import { addLayout } from "../helpers/styles";
import { meta } from "../meta";
import { useStore, useStoreItemPropsEffect } from "repond";

type PlaceName = MyTypes["Types"]["PlaceName"];

function TestVideos({ placeName }: { placeName: PlaceName }): ReactNode {
  const mainRef = useRef<HTMLDivElement>(null);

  const vidContainerRefA = useRef<HTMLDivElement>(null);
  const vidContainerRefB = useRef<HTMLDivElement>(null);

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
  useStoreItemPropsEffect(
    { type: "sliceVids", name: placeName },
    {
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
    }
  );

  return (
    <div ref={mainRef}>
      <div ref={vidContainerRefA} style={{ ...addLayout("center") }} id={`${placeName}_a`}>
        A
        <div style={{ ...addLayout("center") }} id={`${placeName}_a_color`} />
        <div style={{ ...addLayout("center") }} id={`${placeName}_a_depth`} />
      </div>
      <div ref={vidContainerRefB} style={{ ...addLayout("center") }} id={`${placeName}_b`}>
        B
        <div style={{ ...addLayout("center") }} id={`${placeName}_b_color`} />
        <div style={{ ...addLayout("center") }} id={`${placeName}_b_depth`} />
      </div>
    </div>
  );
}

function TestVideoState({ placeName }: { placeName: PlaceName }) {
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

  return (
    <div
      style={{
        display: sliceVidState === "unloaded" ? "none" : "block",
        width: 100,
      }}
    >
      <div>{sliceVidState}</div>
      <div>{`▶ ${stateVidId_playing}`}</div>
      <div>{`➰ ${stateVidId_waiting}`}</div>
      {/* <div>{`⏭ ${vidLetter_goalSlice}`}</div> */}
    </div>
  );
}

export function AllTestVideoStuff() {
  const { placeNames } = meta.assets!;

  return (
    <>
      {placeNames.map((placeName) => (
        <div style={{ ...addLayout({ x: "center", y: "center", way: "right" }) }}>
          <TestVideos placeName={placeName} />
          <TestVideoState placeName={placeName} />
        </div>
      ))}
    </>
  );
}

// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
