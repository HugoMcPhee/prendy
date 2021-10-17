/// <reference types="react" />
import { BackdopConcepFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makePickups<ConcepFuncs extends BackdopConcepFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(concepFuncs: ConcepFuncs, pickupsInfo: PickupsInfo): (_props: {}) => JSX.Element;
