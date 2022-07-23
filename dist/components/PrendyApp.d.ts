import { ReactNode } from "react";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): ({ children, extraScenes }: Props) => JSX.Element;
export {};
