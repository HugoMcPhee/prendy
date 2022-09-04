import { ReactNode } from "react";
import { PrendyAssets, PrendyOptions } from "../declarations";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
declare type Props = {
    children?: ReactNode;
};
export declare function makeTyped_LoadingModels<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): ({ children }: Props) => JSX.Element;
export {};
