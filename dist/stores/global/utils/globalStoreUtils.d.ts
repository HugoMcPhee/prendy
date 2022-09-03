import { Sound } from "@babylonjs/core";
export declare function makeTyped_globalStoreUtils<MusicName extends string, SoundName extends string>(musicNames: readonly MusicName[], soundNames: readonly SoundName[]): {
    makeAutomaticMusicStartRefs: () => { [K_MusicName in MusicName]: Sound | null; };
    makeAutomaticSoundStartRefs: () => { [K_SoundName in SoundName]: Sound | null; };
};
