import { MyTypes } from "../../declarations";
export declare function get_stickerStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
    hideSticker: () => void;
};
