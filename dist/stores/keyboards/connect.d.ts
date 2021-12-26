import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeKeyboardConnectRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    startAll: () => void;
    stopAll: () => void;
};
