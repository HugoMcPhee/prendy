import { forEach } from "chootils/dist/loops";
export function makerGlobalStoreIndexUtils(musicNames, soundNames) {
    function makeAutomaticMusicStartRefs() {
        const partialMusicRefs = {};
        forEach(musicNames, (musicName) => {
            partialMusicRefs[musicName] = null;
        });
        return partialMusicRefs;
        // town: null as null | Sound,
        // club: null as null | Sound,
    }
    function makeAutomaticSoundStartRefs() {
        const partialSoundRefs = {};
        forEach(soundNames, (soundName) => {
            partialSoundRefs[soundName] = null;
        });
        return partialSoundRefs;
        // footstep: null as null | Sound,
        // idea: null as null | Sound,
    }
    return { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs };
}
