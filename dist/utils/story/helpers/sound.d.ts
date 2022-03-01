import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { MusicFiles, MusicName, SoundFiles, SoundName } from "../../../declarations";
export declare function makeSoundStoryHelpers<StoreHelpers extends PrendyStoreHelpers, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName, A_SoundFiles extends SoundFiles = SoundFiles, A_SoundName extends SoundName = SoundName>(storeHelpers: StoreHelpers, musicNames: readonly A_MusicName[], musicFiles: A_MusicFiles, soundNames: readonly A_SoundName[], soundFiles: A_SoundFiles): {
    playNewMusic: (newMusicName: A_MusicName) => void;
    stopAllMusic: () => void;
    playSound: (soundName: A_SoundName, options?: {
        loop?: boolean | undefined;
    } | undefined) => void;
    stopSound: (soundName: A_SoundName) => void;
    stopAllSounds: () => void;
};
