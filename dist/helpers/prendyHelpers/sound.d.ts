import { MusicFiles, MusicName, PrendyStoreHelpers, SoundFiles, SoundName } from "../../declarations";
export declare function get_soundStoryHelpers<A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_SoundFiles extends SoundFiles = SoundFiles, A_SoundName extends SoundName = SoundName>(storeHelpers: A_PrendyStoreHelpers, musicNames: readonly A_MusicName[], musicFiles: A_MusicFiles, soundNames: readonly A_SoundName[], soundFiles: A_SoundFiles): {
    playNewMusic: (newMusicName: A_MusicName) => void;
    stopAllMusic: () => void;
    playSound: (soundName: A_SoundName, options?: {
        loop?: boolean;
    }) => void;
    stopSound: (soundName: A_SoundName) => void;
    stopAllSounds: () => void;
};
