/// <reference types="react" />
import { PrendyConcepFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makePickupButton<ConcepFuncs extends PrendyConcepFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(concepFuncs: ConcepFuncs, pickupsInfo: PickupsInfo): ({ name }: {
    name: PickupName;
}) => JSX.Element;
