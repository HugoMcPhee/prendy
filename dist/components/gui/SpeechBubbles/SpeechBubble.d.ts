import React from "react";
import { MyTypes } from "../../../declarations";
type PrendyStoreHelpers = MyTypes["Repond"];
type GetState = PrendyStoreHelpers["getState"];
type ItemType = keyof ReturnType<GetState>;
type AllItemsState<T_ItemType extends ItemType> = ReturnType<GetState>[T_ItemType];
type Props = {
    name: keyof AllItemsState<"speechBubbles"> & string;
};
export declare function SpeechBubble({ name }: Props): React.JSX.Element;
export {};
