import { Mesh } from "@babylonjs/core";
import { MyTypes } from "../../../declarations";
export declare function get_usePlace<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): <T_PlaceName extends T_MyTypes["Main"]["PlaceName"]>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
