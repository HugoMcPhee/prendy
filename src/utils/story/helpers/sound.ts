import { Sound } from "@babylonjs/core";
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { makeGetSceneOrEngineUtils } from "../../../utils/babylonjs/getSceneOrEngine";
import { forEach } from "shutils/dist/loops";

export function makeSoundStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  MusicName extends string,
  MusicFiles extends Record<MusicName, string>
>(
  concepFuncs: ConcepFuncs,
  musicNames: readonly MusicName[],
  musicFiles: MusicFiles
) {
  const { getRefs } = concepFuncs;

  const { getScene } = makeGetSceneOrEngineUtils(concepFuncs);

  const globalRefs = getRefs().global.main;

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

    globalRefs.music[newMusicName] = new Sound(
      newMusicName,
      musicFiles[newMusicName],
      scene,
      null,
      {
        loop: true,
        autoplay: true,
        spatialSound: false,
      }
    );
  }
  function stopAllMusic() {
    forEach(musicNames, (musicName) => globalRefs.music[musicName]?.stop());
  }

  return { playNewMusic, stopAllMusic };
}
