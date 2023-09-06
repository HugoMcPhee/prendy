import { breakableForEach } from "chootils/dist/loops";
import { MyTypes, PrendyStoreHelpers } from "../../declarations";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { clearTimeoutSafe } from "../../helpers/utils";

export function get_globalGeneralRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  const { prendyOptions } = prendyAssets;
  const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
  const { setGlobalState } = get_globalUtils(storeHelpers);

  return makeRules(({ effect, itemEffect }) => ({
    whenAnythingChangesForRendering: effect({
      run(_diffInfo, frameDuration) {
        const globalRefs = getRefs().global.main;
        const scene = globalRefs.scene;
        // Renders the scene manually
        if (scene?.activeCamera) scene?.render(false, false);
        // runs in a callback to set before the new repond frame
        onNextTick(() => setState({ global: { main: { frameTick: getState().global.main.frameTick + 1 } } }));
      },
      check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
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
      check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
      step: "elapsedTimeUpdates",
      atStepEnd: true,
    }),
    whenGamePaused: effect({
      run(_diffInfo) {
        const globalState = getState().global.main;
        const globalRefs = getRefs().global.main;

        if (globalState.isGamePaused) {
          // setGlobalState({ timeMode: "menu", gameTimeSpeed: 0.25 });
          setGlobalState({ timeMode: "menu", gameTimeSpeed: prendyOptions.gameTimeSpeed * 0.1 });
        } else {
          setGlobalState({ timeMode: "game", gameTimeSpeed: prendyOptions.gameTimeSpeed });
        }
      },
      check: { type: ["global"], name: ["main"], prop: ["isGamePaused"] },
      step: "input",
      // atStepEnd: true,
    }),
    whenPauseKeyPressed: itemEffect({
      run() {
        // console.log("pause key pressed");

        setState((state) => ({ global: { main: { isGamePaused: !state.global.main.isGamePaused } } }));
      },
      step: "input",
      check: { type: "keyboards", name: "main", prop: ["KeyP"], becomes: true },
    }),
    whenElapsedGameTimeChanges: effect({
      run(_diffInfo) {
        const globalState = getState().global.main;
        const elapsedGameTime = globalState.elapsedGameTime;
        // log the value
        // console.log("elapsedGameTime", elapsedGameTime);
      },
      check: { type: ["global"], name: ["main"], prop: ["elapsedGameTime"] },
      step: "rendering",
      atStepEnd: true,
    }),
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
  }));
}
