import { Vector3 } from "@babylonjs/core";
import React, { ReactNode, Suspense } from "react";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConceptoFuncs";
import { makeUsePlace } from "../utils/babylonjs/usePlace";
import { makePlayer } from "./Player";

type Props = { children?: ReactNode };

export function makeLoadingModels<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
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
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[],
  soundFiles: SoundFiles,
  extraStuff?: React.ReactNode
) {
  const { useStore } = conceptoFuncs;

  const Player = makePlayer<
    ConceptoFuncs,
    GameyStartOptions,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace
  >(conceptoFuncs, gameyStartOptions, placeInfoByName, characterNames);

  const usePlace = makeUsePlace<
    ConceptoFuncs,
    GameyStartOptions,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CharacterName,
    SoundName,
    SoundFiles,
    CameraNameByPlace,
    SegmentNameByPlace
  >(conceptoFuncs, gameyStartOptions, placeInfoByName, dollNames, soundFiles);

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
