import { ReactNode } from "react";
import { MyTypes } from "../declarations";
type Props = {
    children?: ReactNode;
};
export declare function get_LoadingModels<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): ({ children }: Props) => JSX.Element;
export {};
