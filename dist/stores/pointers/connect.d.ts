import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makePointersConnectRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    startAll: () => void;
    stopAll: () => void;
};
