import { MyTypes } from "../../declarations";
export declare function get_soundStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    playNewMusic: (newMusicName: T_MyTypes["Main"]["MusicName"]) => void;
    stopAllMusic: () => void;
    playSound: (soundName: T_MyTypes["Main"]["SoundName"], options?: {
        loop?: boolean;
    }) => void;
    stopSound: (soundName: T_MyTypes["Main"]["SoundName"]) => void;
    stopAllSounds: () => void;
};
