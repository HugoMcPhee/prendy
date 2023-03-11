import { ReactNode } from "react";
import { PrendyAssets, PrendyOptions } from "../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../stores/typedStoreHelpers";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): ({ children, extraScenes }: Props) => JSX.Element;
export {};
