import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function get_pointersConnectRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    startAll: () => void;
    stopAll: () => void;
};
