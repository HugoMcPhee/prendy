/// <reference types="react" />
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions } from "../../declarations";
export declare function makeScreenGui<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): (_: {}) => JSX.Element;
