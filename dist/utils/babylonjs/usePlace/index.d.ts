import { PrendyArt, PrendyOptions, ModelInfoByName } from "../../..//declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../concepts/typedStoreHelpers";
export declare function makeUsePlace<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName>(storeHelpers: StoreHelpers, prendyStartOptions: A_PrendyOptions, prendyArt: PrendyArt): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
