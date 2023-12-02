import React from "react";
import { AllState } from "repond";
type ItemType = keyof AllState;
type AllItemsState<T_ItemType extends ItemType> = AllState[T_ItemType];
type Props = {
    name: keyof AllItemsState<"speechBubbles"> & string;
};
export declare function SpeechBubble({ name }: Props): React.JSX.Element;
export {};
