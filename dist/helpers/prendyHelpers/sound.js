import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs } from "repond";
import { meta } from "../../meta";
import { getScene } from "../babylonjs/getSceneOrEngineUtils";
// NOTE sounds only support one sound per sound name at the moment, not multiple (with id's)
// Auto load music and play it, and stop other music if it's already playing
export function playSound(soundName, options) {
    const { soundFiles } = meta.assets;
    const globalRefs = getRefs().global.main;
    const scene = getScene();
    if (!scene)
        return;
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
export function stopSound(soundName) {
    const globalRefs = getRefs().global.main;
    const foundSound = globalRefs.sounds[soundName];
    foundSound?.stop();
}
export function stopAllSounds() {
    const { soundNames } = meta.assets;
    const globalRefs = getRefs().global.main;
    forEach(soundNames, (soundName) => globalRefs.sounds[soundName]?.stop());
}
// Auto load music and play it, and stop other music if it's already playing
export function playNewMusic(newMusicName) {
    const { musicNames, musicFiles } = meta.assets;
    const globalRefs = getRefs().global.main;
    const scene = getScene();
    if (!scene)
        return;
    // note could have currentlyPlayingMusic state? and update that
    forEach(musicNames, (musicName) => {
        const foundMusic = globalRefs.music[musicName];
        // const foundMusic = globalRefs.music[musicName];
        if (musicName !== newMusicName)
            foundMusic?.stop();
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
export function stopAllMusic() {
    const { musicNames } = meta.assets;
    const globalRefs = getRefs().global.main;
    forEach(musicNames, (musicName) => globalRefs.music[musicName]?.stop());
}
// }
