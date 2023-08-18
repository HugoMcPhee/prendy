import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { MusicFiles, MusicName, MyTypes, PrendyStoreHelpers, SoundFiles, SoundName } from "../../declarations";
import { get_getSceneOrEngineUtils } from "../babylonjs/getSceneOrEngineUtils";

export function get_soundStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type MusicName = T_MyTypes["Main"]["MusicName"];
  type SoundName = T_MyTypes["Main"]["SoundName"];

  const { musicNames, musicFiles, soundNames, soundFiles } = prendyAssets;
  const { getRefs } = storeHelpers;
  const { getScene } = get_getSceneOrEngineUtils(storeHelpers);

  const globalRefs = getRefs().global.main;

  // NOTE sounds only support one sound per sound name at the moment, not multiple (with id's)

  // Auto load music and play it, and stop other music if it's already playing
  function playSound(soundName: SoundName, options?: { loop?: boolean }) {
    const scene = getScene();
    if (!scene) return;

    // note could have currentlyPlayingMusic state? and update that

    const existingSound = globalRefs.sounds[soundName];

    if (existingSound) {
      existingSound.loop = options?.loop ?? false;
      existingSound.play();
      return;
    }

    globalRefs.sounds[soundName] = new Sound(soundName, soundFiles[soundName], scene, null, {
      loop: options?.loop ?? false,
      autoplay: true,
      spatialSound: false,
    });
  }

  function stopSound(soundName: SoundName) {
    const foundSound = globalRefs.sounds[soundName];

    foundSound?.stop();
  }

  function stopAllSounds() {
    forEach(soundNames, (soundName) => globalRefs.sounds[soundName]?.stop());
  }

  // Auto load music and play it, and stop other music if it's already playing
  function playNewMusic(newMusicName: MusicName) {
    const scene = getScene();
    if (!scene) return;

    // note could have currentlyPlayingMusic state? and update that

    forEach(musicNames, (musicName) => {
      const foundMusic = globalRefs.music[musicName];
      // const foundMusic = globalRefs.music[musicName];
      if (musicName !== newMusicName) foundMusic?.stop();
    });

    const existingMusic = globalRefs.music[newMusicName];

    if (existingMusic) {
      existingMusic.play();
      return;
    }

    globalRefs.music[newMusicName] = new Sound(newMusicName, musicFiles[newMusicName], scene, null, {
      loop: true,
      autoplay: true,
      spatialSound: false,
    });
  }
  function stopAllMusic() {
    forEach(musicNames, (musicName) => globalRefs.music[musicName]?.stop());
  }

  return { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds };
}
