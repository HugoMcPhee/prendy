/// <reference types="react" />
import { MyTypes } from "../../../declarations";
type PickupName = MyTypes["Types"]["PickupName"];
type Props = {
    name: PickupName;
};
export declare function PickupButton({ name }: Props): JSX.Element;
export {};
