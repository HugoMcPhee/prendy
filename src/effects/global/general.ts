import { breakableForEach, forEach } from "chootils/dist/loops";
import { getRefs, getState, makeEffects, onNextTick, setState } from "repond";
import { setGlobalState } from "../../helpers/prendyUtils/global";
import { clearTimeoutSafe } from "../../helpers/utils";
import { meta } from "../../meta";
import { AnyAnimationName } from "../../types";

export const globalGeneralEffects = makeEffects(({ effect, itemEffect }) => ({
  whenAnythingChangesForRendering: effect({
    run(_diffInfo, frameDuration) {
      const globalRefs = getRefs().global.main;
      const scene = globalRefs.scene;
      // Renders the scene manually
      if (scene?.activeCamera) scene?.render(false, false);
      // runs in a callback to set before the new repond frame
      onNextTick(() => setState({ global: { main: { frameTick: getState().global.main.frameTick + 1 } } }));
    },
    check: { type: ["global"], id: ["main"], prop: ["frameTick"] },
    step: "rendering",
    atStepEnd: true,
  }),
  whenFrameTickUpdates: effect({
    run(_diffInfo, frameDuration) {
      const globalRefs = getRefs().global.main;
      const globalState = getState().global.main;
      // update the elapsed time state based on the time mode
      const timeMode = globalState.timeMode;
      const gameTimeSpeed = globalState.gameTimeSpeed;

      if (timeMode === "game" || "menu") {
        // if (globalState.isGamePaused) return;
        if (globalState.gameTimeSpeed === 0) return;
        setState({
          global: {
            main: { elapsedGameTime: globalState.elapsedGameTime + frameDuration * gameTimeSpeed },
          },
        });
      } else if (timeMode === "menu") {
        setState({ global: { main: { menuTimeElapsed: globalState.menuTimeElapsed + frameDuration } } });
      } else if (timeMode === "miniGame") {
        setState({ global: { main: { elapsedMiniGameTime: globalState.elapsedMiniGameTime + frameDuration } } });
      }
    },
    check: { type: ["global"], id: ["main"], prop: ["frameTick"] },
    step: "elapsedTimeUpdates",
    atStepEnd: true,
  }),
  whenGamePaused: effect({
    run(_diffInfo) {
      const { prendyOptions } = meta.assets!;
      const globalState = getState().global.main;

      if (globalState.isGamePaused) {
        // setGlobalState({ timeMode: "menu", gameTimeSpeed: prendyOptions.gameTimeSpeed * 0.1 });
        setGlobalState({ timeMode: "menu", gameTimeSpeed: prendyOptions.gameTimeSpeed * 4 });
      } else {
        setGlobalState({ timeMode: "game", gameTimeSpeed: prendyOptions.gameTimeSpeed });
      }
    },
    check: { type: ["global"], id: ["main"], prop: ["isGamePaused"] },
    step: "input",
    // atStepEnd: true,
  }),
  whenPauseKeyPressed: itemEffect({
    run() {
      setState((state) => ({ global: { main: { isGamePaused: !state.global.main.isGamePaused } } }));
    },
    step: "input",
    check: { type: "keyboards", id: "main", prop: ["KeyP"], becomes: true },
  }),
  // whenElapsedGameTimeChanges: effect({
  //   run(_diffInfo) {
  //     const globalState = getState().global.main;
  //     const elapsedGameTime = globalState.elapsedGameTime;
  //   },
  //   check: { type: ["global"], name: ["main"], prop: ["elapsedGameTime"] },
  //   step: "rendering",
  //   atStepEnd: true,
  // }),
  whenASpeechBubbleShowsOrHides: effect({
    run(_diffInfo) {
      const speechBubblesState = getState().speechBubbles;
      let aBubbleIsShowing = false;

      // possibly ideally cached
      const speechBubbleNames = Object.keys(getState().speechBubbles) as (keyof typeof speechBubblesState)[];

      breakableForEach(speechBubbleNames, (bubbleName) => {
        const speechBubbleState = speechBubblesState[bubbleName];
        if (speechBubbleState.isVisible) {
          aBubbleIsShowing = true;
          return true; // break
        }
      });
      const globalRefs = getRefs().global.main;

      setState({ global: { main: { aSpeechBubbleIsShowing: aBubbleIsShowing } } });

      if (aBubbleIsShowing) {
        clearTimeoutSafe(globalRefs.aConvoIsHappening_timeout);
        setGlobalState({ aConvoIsHappening: true });
      } else {
        clearTimeoutSafe(globalRefs.aConvoIsHappening_timeout);
        globalRefs.aConvoIsHappening_timeout = setTimeout(() => {
          setGlobalState({ aConvoIsHappening: false });
          globalRefs.aConvoIsHappening_timeout = null;
        }, 1000);
      }
    },
    check: { type: "speechBubbles", prop: ["isVisible"] },
    atStepEnd: true,
    step: "positionUi",
  }),
  whenGameTimeSpeedChanges: itemEffect({
    run({ newValue: newGameTimeSpeed }) {
      const { modelInfoByName, dollNames, placeInfoByName } = meta.assets!;

      console.log("whenGameTimeSpeedChanges");

      // loop through all dolls and set the animation speed
      forEach(dollNames, (dollName) => {
        const dollRefs = getRefs().dolls[dollName];
        const { animWeights, modelName } = getState().dolls[dollName];
        const animationNames = modelInfoByName[modelName].animationNames as AnyAnimationName[];

        forEach(animationNames, (aniName) => {
          const aniRef = dollRefs?.aniGroupsRef?.[aniName];
          if (!aniRef) return;
          aniRef.speedRatio = newGameTimeSpeed;
          // aniRef?.setWeightForAllAnimatables(animWeights[aniName]);
        });
      });

      // set the state vid playback speed to gameTimeSpeed
      //  get all the stateVid video refs
      // get the names of all state vids

      // get the current place name
      const { nowPlaceName } = getState().global.main;

      // loop all the camera names for the current place
      const placeInfo = placeInfoByName[nowPlaceName];
      const { cameraNames } = placeInfo;

      // loop all the camera names
      // forEach(cameraNames, (cameraName) => {
      //   const { stateVidName } = getState().cameras[cameraName];
      //   const { videoRef } = getRefs().videos[stateVidName];
      //   if (!videoRef) return;

      //   videoRef.playbackRate = newGameTimeSpeed;
      // }
    },
    check: { type: "global", prop: "gameTimeSpeed" },
    atStepEnd: true,
    step: "dollAnimation2",
  }),

  // whenBackdropFrameChanges: itemEffect({
  //   run({ newValue: newFrameValue }) {
  //     // console.log("whenBackdropFrameChanges", newFrameValue);

  //     const globalRefs = getRefs().global.main;
  //     const postProcess = globalRefs.backdropPostProcessEffect;
  //     console.log("newFrameValue", newFrameValue);

  //     // postProcess?.setFloat("currentFrameIndex", newFrameValue);
  //     // postProcess.setVector2("frameSize", { x: 0.25, y: 0.5 });
  //   },
  //   check: { type: "global", prop: "backdropFrame" },
  //   atStepEnd: true,
  //   step: "default",
  // }),
}));
