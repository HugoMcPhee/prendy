import React from "react";
import { MyTypes } from "../../../declarations";
type PickupName = MyTypes["Types"]["PickupName"];
type Props = {
    name: PickupName;
    children?: React.ReactNode;
};
export declare function PickupButton({ name }: Props): React.JSX.Element;
export {};
