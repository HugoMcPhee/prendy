import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeStickerStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
