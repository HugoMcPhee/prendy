/// <reference types="react" />
import { MyTypes } from "../../../declarations";
export declare function get_PickupButton<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): ({ name }: {
    name: T_MyTypes["Main"]["PickupName"];
}) => JSX.Element;
