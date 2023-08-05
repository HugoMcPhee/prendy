import { MusicFiles, MusicName, PrendyStoreHelpers, SoundFiles, SoundName } from "../../declarations";
export declare function get_soundStoryHelpers(storeHelpers: PrendyStoreHelpers, musicNames: readonly MusicName[], musicFiles: MusicFiles, soundNames: readonly SoundName[], soundFiles: SoundFiles): {
    playNewMusic: (newMusicName: MusicName) => void;
    stopAllMusic: () => void;
    playSound: (soundName: SoundName, options?: {
        loop?: boolean;
    }) => void;
    stopSound: (soundName: SoundName) => void;
    stopAllSounds: () => void;
};
