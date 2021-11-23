import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import {
  PrendyConcepFuncs,
  PlaceholderPrendyConcepts,
} from "../concepts/typedConcepFuncs";
import { PrendyArt, PrendyOptions, PlaceName } from "../declarations";
import { makeUsePlace } from "../utils/babylonjs/usePlace";
import { makePlayer } from "./Player";

type Props = { children?: ReactNode };

export function makeLoadingModels<ConcepFuncs extends PrendyConcepFuncs>(
  concepFuncs: ConcepFuncs,
  prendyStartOptions: PrendyOptions,
  prendyArt: PrendyArt
) {
  const { useStore } = concepFuncs;
  const Player = makePlayer(concepFuncs, prendyStartOptions, prendyArt);
  const usePlace = makeUsePlace(concepFuncs, prendyStartOptions, prendyArt);

  function Place({ name }: { name: PlaceName }) {
    usePlace(name);
    return null;
  }

  return function LoadingModels({ children }: Props) {
    const { nowPlaceName } = useStore(({ global: { main } }) => main, {
      type: "global",
      name: "main",
      prop: ["nowPlaceName"],
    });

    return (
      <Suspense
        fallback={
          <sphere
            name="sphere1"
            diameter={2}
            segments={16}
            position={new Vector3(0, 1, 0)}
          />
        }
      >
        <Player />
        <Place name={nowPlaceName} key={nowPlaceName} />
        {/* <AllSmells /> */}
        {children}
      </Suspense>
    );
  };
}
