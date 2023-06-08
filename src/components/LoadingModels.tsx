import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import { PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../declarations";
import { get_usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { get_Player } from "./Player";

type Props = { children?: ReactNode };

export function get_LoadingModels(
  storeHelpers: PrendyStoreHelpers,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { useStore } = storeHelpers;
  const Player = get_Player(storeHelpers, prendyStartOptions, prendyAssets);
  const usePlace = get_usePlace(storeHelpers, prendyStartOptions, prendyAssets);

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
        {/* <AllSmells /> */}
        {children}
      </Suspense>
    );
  };
}
