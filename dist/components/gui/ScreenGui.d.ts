/// <reference types="react" />
import { GameyConceptoFuncs, PickupsInfoPlaceholder } from "../../concepts/typedConceptoFuncs";
export declare function makeScreenGui<ConceptoFuncs extends GameyConceptoFuncs, CharacterName extends string, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(conceptoFuncs: ConceptoFuncs, characterNames: readonly CharacterName[], pickupsInfo: PickupsInfo): (_: {}) => JSX.Element;
