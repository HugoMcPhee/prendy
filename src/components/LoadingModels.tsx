import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import { useStore } from "repond";
import { usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { PlaceName } from "../types";
import { Player } from "./Player";

type Props = { children?: ReactNode };

function Place({ name }: { name: PlaceName }) {
  usePlace(name);
  return null;
}

export function LoadingModels({ children }: Props) {
  const { nowPlaceName } = useStore(({ global: { main } }) => main, {
    type: "global",
    name: "main",
    prop: ["nowPlaceName"],
  });

  return (
    <Suspense fallback={<sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />}>
      <Player />
      <Place name={nowPlaceName} key={nowPlaceName} />
      {/* 
        Adds custom parts here, like minigames or particles
        <AllSmellPaticles />
        <TakeKeyMinigame />
         */}
      {children}
    </Suspense>
  );
}
