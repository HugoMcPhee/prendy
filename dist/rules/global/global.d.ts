import { MyTypes } from "../../declarations";
export declare function get_startAllGlobalRules<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyStores: T_MyTypes["Stores"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"], prendyAssets: T_MyTypes["Assets"]): () => () => void;
