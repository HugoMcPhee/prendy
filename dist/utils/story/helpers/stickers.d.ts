import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
export declare function makeStickerStoryHelpers<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
