import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConcepFuncs";
import { makeUsePlace } from "../utils/babylonjs/usePlace";
import { makePlayer } from "./Player";

type Props = { children?: ReactNode };

export function makeLoadingModels<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  CharacterName extends string,
  DollName extends string,
  SoundName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  WallNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>,
  SoundFiles extends Record<SoundName, string>
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[],
  soundFiles: SoundFiles,
  extraStuff?: React.ReactNode
) {
  const { useStore } = concepFuncs;

  const Player = makePlayer<
    ConcepFuncs,
    BackdopOptions,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace
  >(concepFuncs, backdopStartOptions, placeInfoByName, characterNames);

  const usePlace = makeUsePlace<
    ConcepFuncs,
    BackdopOptions,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CharacterName,
    SoundName,
    SoundFiles,
    CameraNameByPlace,
    SegmentNameByPlace
  >(concepFuncs, backdopStartOptions, placeInfoByName, dollNames, soundFiles);

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
        {/* TODO extraStuff */}
      </Suspense>
    );
  };
}
