import React, { useEffect, useRef } from "react";
import { GameyConceptoFuncs } from "../concepts/typedConceptoFuncs";
import { andLayout } from "../utils/styles";

export function makeAllTestVideoStuff<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceName extends string
>(conceptoFuncs: ConceptoFuncs, placeNames: readonly PlaceName[]) {
  const { useStore, useStoreItemPropsEffect } = conceptoFuncs;

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
      }
    );

    return (
      <div ref={mainRef}>
        <div
          ref={vidContainerRefA}
          style={{ ...andLayout("center") }}
          id={`${placeName}_a`}
        >
          A
          <div style={{ ...andLayout("center") }} id={`${placeName}_a_color`} />
          <div style={{ ...andLayout("center") }} id={`${placeName}_a_depth`} />
        </div>
        <div
          ref={vidContainerRefB}
          style={{ ...andLayout("center") }}
          id={`${placeName}_b`}
        >
          B
          <div style={{ ...andLayout("center") }} id={`${placeName}_b_color`} />
          <div style={{ ...andLayout("center") }} id={`${placeName}_b_depth`} />
        </div>
      </div>
    );
  }

  function TestVideoState({ placeName }: { placeName: PlaceName }) {
    const sectionVidState = useStore(
      (state) => state.sectionVids[placeName].sectionVidState,
      { type: "sectionVids", prop: ["sectionVidState"], name: placeName }
    );
    const { stackVidId_waiting, stackVidId_playing } = useStore(
      (state) => state.sectionVids[placeName],
      {
        type: "sectionVids",
        prop: ["stackVidId_waiting", "stackVidId_playing"],
        name: placeName,
      }
    );

    return (
      <div
        style={{
          display: sectionVidState === "unloaded" ? "none" : "block",
          width: 100,
        }}
      >
        <div>{sectionVidState}</div>
        <div>{`▶ ${stackVidId_waiting}`}</div>
        <div>{`➰ ${stackVidId_playing}`}</div>
        {/* <div>{`⏭ ${vidLetter_nextSection}`}</div> */}
      </div>
    );
  }

  return function AllTestVideoStuff() {
    return (
      <>
        {placeNames.map((placeName) => (
          <div
            style={{ ...andLayout({ x: "center", y: "center", way: "right" }) }}
          >
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