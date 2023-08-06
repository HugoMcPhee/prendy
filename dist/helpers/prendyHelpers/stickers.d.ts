import { PrendyStoreHelpers } from "../../declarations";
export declare function get_stickerStoryHelpers<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
