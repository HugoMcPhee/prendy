import React, { ReactNode } from "react";
import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceholderBackdopConcepts, PlaceInfoByNamePlaceholder } from "../concepts/typedConcepFuncs";
declare type Props = {
    children?: ReactNode;
};
export declare function makeLoadingModels<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, DollName extends string, SoundName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SoundFiles extends Record<SoundName, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[], soundFiles: SoundFiles, extraStuff?: React.ReactNode): ({ children }: Props) => JSX.Element;
export {};
