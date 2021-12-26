import { ReactNode } from "react";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import { PrendyArt, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makeLoadingModels<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): ({ children }: Props) => JSX.Element;
export {};
