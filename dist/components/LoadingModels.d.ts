import React, { ReactNode } from "react";
import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceholderGameyConcepts, PlaceInfoByNamePlaceholder } from "../concepts/typedConceptoFuncs";
declare type Props = {
    children?: ReactNode;
};
export declare function makeLoadingModels<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, DollName extends string, SoundName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SoundFiles extends Record<SoundName, string>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[], soundFiles: SoundFiles, extraStuff?: React.ReactNode): ({ children }: Props) => JSX.Element;
export {};
