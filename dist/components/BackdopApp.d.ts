import { ReactNode } from "react";
import { BackdopConcepFuncs, BackdopOptionsUntyped, PickupsInfoPlaceholder, PlaceholderBackdopConcepts, PlaceInfoByNamePlaceholder } from "../concepts/typedConcepFuncs";
declare type Props = {
    children?: ReactNode;
};
export declare function makeBackdopApp<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, DollName extends string, SoundName extends string, PickupName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, SpotNameByPlace extends Record<PlaceName, string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SoundFiles extends Record<SoundName, string>, PickupsInfo extends PickupsInfoPlaceholder<PickupName>, SpeechVidFiles extends Record<string, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[], soundFiles: SoundFiles, pickupsInfo: PickupsInfo, speechVidFiles: SpeechVidFiles): ({ children }: Props) => JSX.Element;
export {};
