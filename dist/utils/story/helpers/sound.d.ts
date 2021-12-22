import { PrendyStoreHelpers } from "../../../concepts/typedStoreHelpers";
import { MusicFiles, MusicName } from "../../../declarations";
export declare function makeSoundStoryHelpers<StoreHelpers extends PrendyStoreHelpers, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName>(storeHelpers: StoreHelpers, musicNames: readonly A_MusicName[], musicFiles: A_MusicFiles): {
    playNewMusic: (newMusicName: A_MusicName) => void;
    stopAllMusic: () => void;
};
