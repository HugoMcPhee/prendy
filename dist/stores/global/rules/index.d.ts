import { PrendyAssets, PrendyOptions } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../typedStoreHelpers";
export declare function makeStartAllGlobalRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): () => () => void;
