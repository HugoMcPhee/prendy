import { PrendyStoreHelpers } from "../../../concepts/typedStoreHelpers";
export declare function makeStickerStoryHelpers<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
