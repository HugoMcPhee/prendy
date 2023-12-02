import { Mesh } from "@babylonjs/core";
import { MyTypes } from "../../../declarations";
type PlaceName = MyTypes["Types"]["PlaceName"];
export declare function usePlace<T_PlaceName extends PlaceName>(placeName: T_PlaceName): {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
export {};
