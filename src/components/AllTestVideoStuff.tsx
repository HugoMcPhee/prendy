import React, { useEffect, useRef } from "react";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import { andLayout } from "../utils/styles";

export function makeTyped_AllTestVideoStuff<StoreHelpers extends PrendyStoreHelpers, PlaceName extends string>(
  storeHelpers: StoreHelpers,
  placeNames: readonly PlaceName[]
) {
  const { useStore, useStoreItemPropsEffect } = storeHelpers;

  function TestVideos({ placeName }: { placeName: PlaceName }) {
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
      { type: "sectionVids", name: placeName },
      {
        safeVidId_playing() {
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
      }
    );

    return (
      <div ref={mainRef}>
        <div ref={vidContainerRefA} style={{ ...andLayout("center") }} id={`${placeName}_a`}>
          A
          <div style={{ ...andLayout("center") }} id={`${placeName}_a_color`} />
          <div style={{ ...andLayout("center") }} id={`${placeName}_a_depth`} />
        </div>
        <div ref={vidContainerRefB} style={{ ...andLayout("center") }} id={`${placeName}_b`}>
          B
          <div style={{ ...andLayout("center") }} id={`${placeName}_b_color`} />
          <div style={{ ...andLayout("center") }} id={`${placeName}_b_depth`} />
        </div>
      </div>
    );
  }

  function TestVideoState({ placeName }: { placeName: PlaceName }) {
    const sectionVidState = useStore((state) => state.sectionVids[placeName].sectionVidState, {
      type: "sectionVids",
      prop: ["sectionVidState"],
      name: placeName,
    });
    const { safeVidId_waiting, safeVidId_playing } = useStore((state) => state.sectionVids[placeName], {
      type: "sectionVids",
      prop: ["safeVidId_waiting", "safeVidId_playing"],
      name: placeName,
    });

    return (
      <div
        style={{
          display: sectionVidState === "unloaded" ? "none" : "block",
          width: 100,
        }}
      >
        <div>{sectionVidState}</div>
        <div>{`▶ ${safeVidId_playing}`}</div>
        <div>{`➰ ${safeVidId_waiting}`}</div>
        {/* <div>{`⏭ ${vidLetter_nextSection}`}</div> */}
      </div>
    );
  }

  return function AllTestVideoStuff() {
    return (
      <>
        {placeNames.map((placeName) => (
          <div style={{ ...andLayout({ x: "center", y: "center", way: "right" }) }}>
            <TestVideos placeName={placeName} />
            <TestVideoState placeName={placeName} />
          </div>
        ))}{" "}
      </>
    );
  };
}

// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
