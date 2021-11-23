/// <reference types="react" />
import { PrendyConcepFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makePickups<ConcepFuncs extends PrendyConcepFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(concepFuncs: ConcepFuncs, pickupsInfo: PickupsInfo): (_props: {}) => JSX.Element;
