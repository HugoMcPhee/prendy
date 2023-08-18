import { ReactNode } from "react";
import { MyTypes } from "../declarations";
import { MakeStartRulesOptions } from "../rules/rules";
type Props = {
    children?: ReactNode;
    extraScenes?: ReactNode;
};
export declare function makePrendyApp<T_MyTypes extends MyTypes = MyTypes>(options: MakeStartRulesOptions<T_MyTypes>): ({ children, extraScenes }: Props) => JSX.Element;
export {};
