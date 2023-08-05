import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../declarations";
export declare function get_getSceneOrEngineUtils(storeHelpers: PrendyStoreHelpers): {
    getScene: () => Scene | null;
    getEngine: () => Engine | null;
};
