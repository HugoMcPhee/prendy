import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import { MyTypes } from "../declarations";
import { usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { Player } from "./Player";
import { meta } from "../meta";

type Props = { children?: ReactNode };

type PlaceName = MyTypes["Types"]["PlaceName"];

function Place({ name }: { name: PlaceName }) {
  usePlace(name);
  return null;
}

export function LoadingModels({ children }: Props) {
  const { useStore } = meta.repond!;

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
