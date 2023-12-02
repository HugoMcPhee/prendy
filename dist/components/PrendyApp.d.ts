import React, { ReactNode } from "react";
import { SubscribableRules } from "../rules/rules";
import { MyTypes } from "../declarations";
type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<T_MyTypes extends MyTypes = MyTypes>(assets: T_MyTypes["Assets"], customRules: SubscribableRules[]): ({ children, extraScenes }: Props) => React.JSX.Element;
export {};
