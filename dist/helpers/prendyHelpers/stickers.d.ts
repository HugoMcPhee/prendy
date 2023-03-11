import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function get_stickerStoryHelpers<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
