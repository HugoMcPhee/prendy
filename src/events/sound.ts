import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs } from "repond";
import { makeEventTypes } from "repond-events";
import { getScene } from "../helpers/babylonjs/getSceneOrEngineUtils";
import { meta } from "../meta";
import { AnyAnimationName } from "../types";

type PlayerAnimationNames = {
  walking: AnyAnimationName;
  idle: AnyAnimationName;
};

export const soundEvents = makeEventTypes(({ event }) => ({
  playSound: event({
    run: ({ soundName, loop }, { runMode }) => {
      if (runMode !== "start") return;
      const { soundFiles } = meta.assets!;
      const globalRefs = getRefs().global.main;

      const scene = getScene();
      if (!scene) return;

      // note could have currentlyPlayingMusic state? and update that

      const existingSound = globalRefs.sounds[soundName];

      if (existingSound) {
        existingSound.loop = loop ?? false;
        existingSound.play();
        return;
      }

      globalRefs.sounds[soundName] = new Sound(soundName, soundFiles[soundName], scene, null, {
        loop: loop ?? false,
        autoplay: true,
        spatialSound: false,
      });
    },
    params: { soundName: "", loop: false },
  }),
  stopSound: event({
    run: ({ soundName }, { runMode }) => {
      if (runMode !== "start") return;
      const globalRefs = getRefs().global.main;

      const foundSound = globalRefs.sounds[soundName];

      foundSound?.stop();
    },
    params: { soundName: "" },
  }),
  stopAllSounds: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      const { soundNames } = meta.assets!;
      const globalRefs = getRefs().global.main;
      soundNames.forEach((soundName) => globalRefs.sounds[soundName]?.stop());
    },
    params: {},
  }),
  playNewMusic: event({
    run: ({ newMusicName }, { runMode }) => {
      if (runMode !== "start") return;
      const { musicNames, musicFiles } = meta.assets!;
      const globalRefs = getRefs().global.main;

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
    },
    params: { newMusicName: "" },
  }),
  stopAllMusic: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      const { musicNames } = meta.assets!;
      const globalRefs = getRefs().global.main;

      forEach(musicNames, (musicName) => globalRefs.music[musicName]?.stop());
    },
    params: {},
  }),
}));
