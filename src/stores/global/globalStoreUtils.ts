import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { MusicName, SoundName } from "../../types";
import { meta } from "../../meta";

// Automatically add music refs
type MusicRefs = { [K_MusicName in MusicName]: null | Sound };

export function makeAutomaticMusicStartRefs(musicNames: readonly MusicName[]) {
  const partialMusicRefs = {} as Partial<MusicRefs>;
  forEach(musicNames, (musicName) => {
    partialMusicRefs[musicName] = null as null | Sound;
  });
  return partialMusicRefs as MusicRefs;
}

// Automatically add sound refs
type SoundRefs = { [K_SoundName in SoundName]: null | Sound };

export function makeAutomaticSoundStartRefs(soundNames: readonly SoundName[]) {
  const partialSoundRefs = {} as Partial<SoundRefs>;
  forEach(soundNames, (soundName) => {
    partialSoundRefs[soundName] = null as null | Sound;
  });
  return partialSoundRefs as SoundRefs;
}

// export function runWhenStartingPrendyEffects(callback: () => void) {
//   meta.whatToRunWhenStartingEffects.push(callback);
// }
