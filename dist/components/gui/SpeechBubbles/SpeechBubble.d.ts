/// <reference types="react" />
import { MyTypes } from "../../../declarations";
export declare function get_SpeechBubble<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): ({ name }: {
    name: keyof ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
