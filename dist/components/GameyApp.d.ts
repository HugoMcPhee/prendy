import { ReactNode } from "react";
import { GameyConceptoFuncs, GameyStartOptionsUntyped, PickupsInfoPlaceholder, PlaceholderGameyConcepts, PlaceInfoByNamePlaceholder } from "../concepts/typedConceptoFuncs";
declare type Props = {
    children?: ReactNode;
};
export declare function makeGameyApp<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, DollName extends string, SoundName extends string, PickupName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SoundFiles extends Record<SoundName, string>, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[], soundFiles: SoundFiles, pickupsInfo: PickupsInfo): ({ children }: Props) => JSX.Element;
export {};
