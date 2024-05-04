import { onNextTick, setState } from "repond";
import { makeEventTypes, setLiveEventState } from "repond-events";

export const basicEvents = makeEventTypes(({ event }) => ({
  wait: event({
    run: ({ duration }, { runMode, liveId, elapsedTime }) => {
      // if (runMode === "add") console.log("wait added");

      if (runMode === "start") setLiveEventState(liveId, { goalEndTime: elapsedTime + duration });
    },
    params: { duration: 1000 },
    isParallel: false,
  }),
  log: event({
    run: ({ text }, { runMode, liveId, elapsedTime }) => {
      console.log("log", { text, runMode, liveId, elapsedTime });

      // if (runMode === "add") console.log("log added");
      if (runMode === "start") console.log(text);
    },
    params: { text: "" },
    isParallel: false,
  }),
  setState: event({
    run: ({ state }, { runMode, isFirstStart }) => {
      if (isFirstStart) onNextTick(() => setState(state));
    },
    params: { state: {} as Parameters<typeof setState>[0] },
    isParallel: false,
  }),
}));
