import { ItemType, StatePath, onNextTick, setState } from "repond";
import { EventInstance, EventTuple, addSubEvents, makeEventTypes, setLiveEventState } from "repond-events";
import { getStateAtPath } from "repond";

export const basicEvents = makeEventTypes(({ event }) => ({
  wait: event({
    run: ({ time }, { runMode, liveId, elapsedTime }) => {
      if (runMode === "start") setLiveEventState(liveId, { goalEndTime: elapsedTime + time * 1000 });
    },
    params: { time: 1 },
    isParallel: false,
  }),
  log: event({
    run: ({ text }, { runMode, liveId, elapsedTime }) => {
      console.log("log", { text });

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
  runEventsIf: event({
    run: async ({ events, elseEvents, state: statePath }, { runMode, liveId }) => {
      if (runMode !== "start") return;
      if (!statePath[0]) return console.error("runEventsIf: statePath[0] is empty");
      let shouldRunEvents = getStateAtPath(statePath);
      // if (shouldRunEvents ===)
      if (shouldRunEvents) {
        if (events) addSubEvents(liveId, events as any[]);
      } else {
        if (elseEvents) addSubEvents(liveId, elseEvents as any[]);
      }
    },
    params: {
      state: ["", "", ""] as StatePath<any>,
      events: undefined as UntypedEventTuple[] | undefined, // NOTE can't use EventTuple because typescript will go into itself
      elseEvents: undefined as UntypedEventTuple[] | undefined, // NOTE can't use EventTuple because typescript will go into itself
    },
  }),
}));

type UntypedEventTuple = [string, string, Record<any, any> | undefined, Record<any, any> | undefined];

// Special types

type BasicRunEventsIfParams<T_ItemType extends ItemType> = {
  state: StatePath<T_ItemType>;
  events?: EventTuple[] | undefined;
  elseEvents?: EventTuple[] | undefined;
};

export type BasicEventParameters<T_Group, T_Event, T_GenericParamA> = T_Group extends "basic"
  ? T_Event extends "runEventsIf"
    ? BasicRunEventsIfParams<T_GenericParamA & ItemType>
    : // : T_Event extends "lookAtSpot"
      // ? CharacterLookAtSpotParams<T_GenericParamA & PlaceName>
      never
  : never;
