import { MyTypes } from "../../declarations";
export declare function get_soundStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], musicNames: readonly T_MyTypes["Main"]["MusicName"][], musicFiles: T_MyTypes["Main"]["MusicFiles"], soundNames: readonly T_MyTypes["Main"]["SoundName"][], soundFiles: T_MyTypes["Main"]["SoundFiles"]): {
    playNewMusic: (newMusicName: T_MyTypes["Main"]["MusicName"]) => void;
    stopAllMusic: () => void;
    playSound: (soundName: T_MyTypes["Main"]["SoundName"], options?: {
        loop?: boolean;
    }) => void;
    stopSound: (soundName: T_MyTypes["Main"]["SoundName"]) => void;
    stopAllSounds: () => void;
};
