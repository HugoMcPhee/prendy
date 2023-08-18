import { ReactNode } from "react";
import { MyTypes } from "../declarations";
type Props = {
    children?: ReactNode;
};
export declare function get_LoadingModels<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"], prendyAssets: T_MyTypes["Assets"]): ({ children }: Props) => JSX.Element;
export {};
