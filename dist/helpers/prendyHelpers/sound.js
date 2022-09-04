import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { makeTyped_getSceneOrEngineUtils } from "../babylonjs/getSceneOrEngineUtils";
export function makeTyped_soundStoryHelpers(storeHelpers, musicNames, musicFiles, soundNames, soundFiles) {
    const { getRefs } = storeHelpers;
    const { getScene } = makeTyped_getSceneOrEngineUtils(storeHelpers);
    const globalRefs = getRefs().global.main;
    // NOTE sounds only support one sound per sound name at the moment, not multiple (with id's)
    // Auto load music and play it, and stop other music if it's already playing
    function playSound(soundName, options) {
        var _a, _b;
        const scene = getScene();
        if (!scene)
            return;
        // note could have currentlyPlayingMusic state? and update that
        const existingSound = globalRefs.sounds[soundName];
        if (existingSound) {
            existingSound.loop = (_a = options === null || options === void 0 ? void 0 : options.loop) !== null && _a !== void 0 ? _a : false;
            existingSound.play();
            return;
        }
        globalRefs.sounds[soundName] = new Sound(soundName, soundFiles[soundName], scene, null, {
            loop: (_b = options === null || options === void 0 ? void 0 : options.loop) !== null && _b !== void 0 ? _b : false,
            autoplay: true,
            spatialSound: false,
        });
    }
    function stopSound(soundName) {
        const foundSound = globalRefs.sounds[soundName];
        foundSound === null || foundSound === void 0 ? void 0 : foundSound.stop();
    }
    function stopAllSounds() {
        forEach(soundNames, (soundName) => { var _a; return (_a = globalRefs.sounds[soundName]) === null || _a === void 0 ? void 0 : _a.stop(); });
    }
    // Auto load music and play it, and stop other music if it's already playing
    function playNewMusic(newMusicName) {
        const scene = getScene();
        if (!scene)
            return;
        // note could have currentlyPlayingMusic state? and update that
        forEach(musicNames, (musicName) => {
            const foundMusic = globalRefs.music[musicName];
            // const foundMusic = globalRefs.music[musicName];
            if (musicName !== newMusicName)
                foundMusic === null || foundMusic === void 0 ? void 0 : foundMusic.stop();
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
        forEach(musicNames, (musicName) => { var _a; return (_a = globalRefs.music[musicName]) === null || _a === void 0 ? void 0 : _a.stop(); });
    }
    return { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds };
}
