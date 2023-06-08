import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../declarations";
export declare function makeStartPrendyRules(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): (fontNames: readonly string[]) => () => void;
