import { Sound } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs } from "repond";
import { makeEventTypes } from "repond-events";
import { getScene } from "../helpers/babylonjs/getSceneOrEngineUtils";
import { meta } from "../meta";
import { AnyAnimationName, MusicName, SoundName } from "../types";

type PlayerAnimationNames = {
  walking: AnyAnimationName;
  idle: AnyAnimationName;
};

export const soundEvents = makeEventTypes(({ event }) => ({
  playSound: event({
    run: ({ which: sound, loop }, { runMode }) => {
      if (runMode !== "start") return;
      const { soundFiles } = meta.assets!;
      const globalRefs = getRefs().global.main;

      const scene = getScene();
      if (!scene) return;

      // note could have currentlyPlayingMusic state? and update that

      const existingSound = globalRefs.sounds[sound];

      if (existingSound) {
        existingSound.loop = loop ?? false;
        existingSound.play();
        return;
      }

      globalRefs.sounds[sound] = new Sound(sound, soundFiles[sound], scene, null, {
        loop: loop ?? false,
        autoplay: true,
        spatialSound: false,
      });
    },
    params: { which: "" as SoundName, loop: undefined as boolean | undefined },
  }),
  stopSound: event({
    run: ({ which: sound }, { runMode }) => {
      if (runMode !== "start") return;
      const globalRefs = getRefs().global.main;
      const foundSound = globalRefs.sounds[sound];
      foundSound?.stop();
    },
    params: { which: "" as SoundName },
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
    run: ({ which }, { runMode }) => {
      if (runMode !== "start") return;
      const { musicNames, musicFiles } = meta.assets!;
      const globalRefs = getRefs().global.main;

      const scene = getScene();
      if (!scene) return;

      // note could have currentlyPlayingMusic state? and update that

      forEach(musicNames, (musicName) => {
        const foundMusic = globalRefs.music[musicName];
        // const foundMusic = globalRefs.music[musicName];
        if (musicName !== which) foundMusic?.stop();
      });

      const existingMusic = globalRefs.music[which];

      if (existingMusic) {
        existingMusic.play();
        return;
      }

      globalRefs.music[which] = new Sound(which, musicFiles[which], scene, null, {
        loop: true,
        autoplay: true,
        spatialSound: false,
      });
    },
    params: { which: "" as MusicName },
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
