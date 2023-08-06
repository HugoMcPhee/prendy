import { ReactNode } from "react";
import { MakeStartRulesOptions } from "../rules/rules";
import { AnyCameraName, AnySegmentName, AnyTriggerName, CameraNameByPlace, CharacterName, DollName, PlaceInfoByName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SegmentNameByPlace, SpotNameByPlace, WallNameByPlace } from "../declarations";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(options: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>): ({ children, extraScenes }: Props) => JSX.Element;
export {};
