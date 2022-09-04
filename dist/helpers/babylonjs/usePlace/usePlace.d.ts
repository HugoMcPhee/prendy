import { PrendyAssets, PrendyOptions, ModelInfoByName } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
export declare function makeTyped_usePlace<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName>(storeHelpers: StoreHelpers, prendyStartOptions: A_PrendyOptions, prendyAssets: PrendyAssets): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
