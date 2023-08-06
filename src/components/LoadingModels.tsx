import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import {
  AnyCameraName,
  AnySegmentName,
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceInfoByName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../declarations";
import { get_usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { get_Player } from "./Player";

type Props = { children?: ReactNode };

export function get_LoadingModels<
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(storeHelpers: A_PrendyStoreHelpers, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets) {
  const { useStore } = storeHelpers;
  const Player = get_Player<
    A_AnyCameraName,
    A_AnySegmentName,
    A_AnyTriggerName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_DollName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SegmentNameByPlace,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(storeHelpers, prendyStartOptions, prendyAssets);
  const usePlace = get_usePlace(storeHelpers, prendyStartOptions, prendyAssets);

  function Place({ name }: { name: A_PlaceName }) {
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
