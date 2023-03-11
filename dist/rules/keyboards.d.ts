import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function get_keyboardConnectRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    startAll: () => void;
    stopAll: () => void;
};
