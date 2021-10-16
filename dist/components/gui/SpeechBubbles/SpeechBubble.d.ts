/// <reference types="react" />
import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeSpeechBubble<ConceptoFuncs extends GameyConceptoFuncs, CharacterName extends string>(conceptoFuncs: ConceptoFuncs): ({ name }: {
    name: any;
}) => JSX.Element;
