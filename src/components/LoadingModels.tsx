import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import {
  PrendyStoreHelpers,
  PlaceholderPrendyStores,
} from "../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions, PlaceName } from "../declarations";
import { makeUsePlace } from "../utils/babylonjs/usePlace";
import { makePlayer } from "./Player";

type Props = { children?: ReactNode };

export function makeLoadingModels<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { useStore } = storeHelpers;
  const Player = makePlayer(storeHelpers, prendyStartOptions, prendyAssets);
  const usePlace = makeUsePlace(storeHelpers, prendyStartOptions, prendyAssets);

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
