/// <reference types="react" />
import { GameyConceptoFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConceptoFuncs";
export declare function makePickupButton<ConceptoFuncs extends GameyConceptoFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(conceptoFuncs: ConceptoFuncs, pickupsInfo: PickupsInfo): ({ name }: {
    name: PickupName;
}) => JSX.Element;
