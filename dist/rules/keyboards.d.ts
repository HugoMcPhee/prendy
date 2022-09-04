import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function makeTyped_keyboardConnectRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    startAll: () => void;
    stopAll: () => void;
};
