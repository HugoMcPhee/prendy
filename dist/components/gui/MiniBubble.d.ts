/// <reference types="react" />
import { MyTypes } from "../../declarations";
type PrendyStoreHelpers = MyTypes["Repond"];
type GetState = PrendyStoreHelpers["getState"];
type ItemType = keyof ReturnType<GetState>;
type AllItemsState<T_ItemType extends ItemType> = ReturnType<GetState>[T_ItemType] & Record<any, any>;
type Props = {
    name: keyof AllItemsState<"miniBubbles">;
};
export declare function MiniBubble({ name }: Props): JSX.Element;
export {};
