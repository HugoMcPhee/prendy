import { ReactNode } from "react";
import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../declarations";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): ({ children, extraScenes }: Props) => JSX.Element;
export {};
