import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function makeGetSceneOrEngineUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    getScene: (sceneType?: "main" | "backdrop" | undefined) => Scene | null;
    getEngine: () => Engine | null;
};
