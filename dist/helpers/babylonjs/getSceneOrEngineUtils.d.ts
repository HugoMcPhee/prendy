import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../declarations";
export declare function get_getSceneOrEngineUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): {
    getScene: () => Scene | null;
    getEngine: () => Engine | null;
};
