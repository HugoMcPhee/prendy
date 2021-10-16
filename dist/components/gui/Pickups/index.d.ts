/// <reference types="react" />
import { GameyConceptoFuncs, PickupsInfoPlaceholder } from "../../../concepts/typedConceptoFuncs";
export declare function makePickups<ConceptoFuncs extends GameyConceptoFuncs, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(conceptoFuncs: ConceptoFuncs, pickupsInfo: PickupsInfo): (_props: {}) => JSX.Element;
