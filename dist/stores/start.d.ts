import { PrendyArt, PrendyOptions } from "../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "./typedStoreHelpers";
export declare function makeStartPrendyRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts, PRENDY_OPTIONS: PrendyOptions, prendyArt: PrendyArt): (fontNames: readonly string[]) => () => void;
