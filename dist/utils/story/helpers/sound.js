import { Sound } from "@babylonjs/core";
import { makeGetSceneOrEngineUtils } from "../../../utils/babylonjs/getSceneOrEngine";
import { forEach } from "shutils/dist/loops";
export function makeSoundStoryHelpers(concepFuncs, musicNames, musicFiles) {
    const { getRefs } = concepFuncs;
    const { getScene } = makeGetSceneOrEngineUtils(concepFuncs);
    const globalRefs = getRefs().global.main;
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
    return { playNewMusic, stopAllMusic };
}
