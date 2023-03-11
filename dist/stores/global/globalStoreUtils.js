import { forEach } from "chootils/dist/loops";
export default function get_globalStoreUtils(musicNames, soundNames) {
    function makeAutomaticMusicStartRefs() {
        const partialMusicRefs = {};
        forEach(musicNames, (musicName) => {
            partialMusicRefs[musicName] = null;
        });
        return partialMusicRefs;
    }
    function makeAutomaticSoundStartRefs() {
        const partialSoundRefs = {};
        forEach(soundNames, (soundName) => {
            partialSoundRefs[soundName] = null;
        });
        return partialSoundRefs;
    }
    return { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs };
}
