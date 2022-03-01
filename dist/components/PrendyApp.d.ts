import { ReactNode } from "react";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../stores/typedStoreHelpers";
import { PrendyArt, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): ({ children, extraScenes }: Props) => JSX.Element;
export {};
