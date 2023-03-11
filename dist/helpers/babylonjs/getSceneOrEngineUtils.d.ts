import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function get_getSceneOrEngineUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    getScene: () => Scene | null;
    getEngine: () => Engine | null;
};
