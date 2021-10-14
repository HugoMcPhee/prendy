import { Sound } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";

export function makerGlobalStoreIndexUtils<
  MusicName extends string,
  SoundName extends string
>(musicNames: readonly MusicName[], soundNames: readonly SoundName[]) {
  // Automatically add music refs
  type MusicRefs = {
    [K_MusicName in MusicName]: null | Sound;
  };
  function makeAutomaticMusicStartRefs() {
    const partialMusicRefs = {} as Partial<MusicRefs>;
    forEach(musicNames, (musicName) => {
      partialMusicRefs[musicName] = null as null | Sound;
    });
    return partialMusicRefs as MusicRefs;
    // town: null as null | Sound,
    // club: null as null | Sound,
  }

  // Automatically add sound refs
  type SoundRefs = {
    [K_SoundName in SoundName]: null | Sound;
  };
  function makeAutomaticSoundStartRefs() {
    const partialSoundRefs = {} as Partial<SoundRefs>;
    forEach(soundNames, (soundName) => {
      partialSoundRefs[soundName] = null as null | Sound;
    });
    return partialSoundRefs as SoundRefs;
    // footstep: null as null | Sound,
    // idea: null as null | Sound,
  }

  return { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs };
}
