import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import { MyTypes } from "../declarations";
import { get_usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { get_Player } from "./Player";

type Props = { children?: ReactNode };

export function get_LoadingModels<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { useStore } = storeHelpers;
  const Player = get_Player<T_MyTypes>(prendyAssets, storeHelpers);
  const usePlace = get_usePlace(prendyAssets, storeHelpers);

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
  };
}
