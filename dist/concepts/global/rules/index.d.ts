import { PrendyArt, PrendyOptions } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../typedStoreHelpers";
export declare function makeStartAllGlobalRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): () => () => void;
