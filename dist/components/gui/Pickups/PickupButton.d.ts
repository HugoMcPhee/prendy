/// <reference types="react" />
import { BackdopConcepFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makePickupButton<ConcepFuncs extends BackdopConcepFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(concepFuncs: ConcepFuncs, pickupsInfo: PickupsInfo): ({ name }: {
    name: PickupName;
}) => JSX.Element;
