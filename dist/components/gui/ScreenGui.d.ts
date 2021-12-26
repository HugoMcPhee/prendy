/// <reference types="react" />
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { PrendyArt, PrendyOptions } from "../../declarations";
export declare function makeScreenGui<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, PRENDY_OPTIONS: PrendyOptions, prendyArt: PrendyArt): (_: {}) => JSX.Element;
