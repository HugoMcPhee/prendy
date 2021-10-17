import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeStickerStoryHelpers<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
