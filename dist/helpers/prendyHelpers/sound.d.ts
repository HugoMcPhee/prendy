import { MyTypes } from "../../declarations";
type MusicName = MyTypes["Types"]["MusicName"];
type SoundName = MyTypes["Types"]["SoundName"];
export declare function playSound(soundName: SoundName, options?: {
    loop?: boolean;
}): void;
export declare function stopSound(soundName: SoundName): void;
export declare function stopAllSounds(): void;
export declare function playNewMusic(newMusicName: MusicName): void;
export declare function stopAllMusic(): void;
export {};
