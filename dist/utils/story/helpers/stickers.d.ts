import { PrendyConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeStickerStoryHelpers<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
