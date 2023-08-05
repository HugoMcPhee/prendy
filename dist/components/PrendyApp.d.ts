import { ReactNode } from "react";
import { MakeStartRulesOptions } from "../rules/rules";
declare type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp(options: MakeStartRulesOptions): ({ children, extraScenes }: Props) => JSX.Element;
export {};
