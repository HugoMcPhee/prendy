import { Sound } from "@babylonjs/core";
export declare function makerGlobalStoreIndexUtils<MusicName extends string, SoundName extends string>(musicNames: readonly MusicName[], soundNames: readonly SoundName[]): {
    makeAutomaticMusicStartRefs: () => { [K_MusicName in MusicName]: Sound; };
    makeAutomaticSoundStartRefs: () => { [K_SoundName in SoundName]: Sound; };
};
