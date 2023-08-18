import { MyTypes } from "../../declarations";
export declare function get_startAllGlobalRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyStores: T_MyTypes["Stores"], storeHelpers: T_MyTypes["StoreHelpers"]): () => () => void;
