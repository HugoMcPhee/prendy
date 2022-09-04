import { PrendyAssets, PrendyOptions } from "../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function makeStartPrendyRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): (fontNames: readonly string[]) => () => void;
