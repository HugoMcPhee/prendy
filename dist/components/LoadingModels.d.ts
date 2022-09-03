import { ReactNode } from "react";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makeTyped_LoadingModels<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): ({ children }: Props) => JSX.Element;
export {};
