import React from "react";
import { AllState } from "repond";
type ItemType = keyof AllState;
type AllItemsState<T_ItemType extends ItemType> = AllState[T_ItemType] & Record<any, any>;
type Props = {
    name: keyof AllItemsState<"miniBubbles">;
};
export declare function MiniBubble({ name }: Props): React.JSX.Element;
export {};
