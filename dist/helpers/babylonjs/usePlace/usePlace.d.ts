import { Mesh } from "@babylonjs/core";
import { PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../../../declarations";
export declare function get_usePlace(storeHelpers: PrendyStoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
