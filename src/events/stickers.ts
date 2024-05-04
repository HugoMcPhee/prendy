import { setState } from "repond";
import { makeEventTypes } from "repond-events";

export const stickerEvents = makeEventTypes(({ event }) => ({
  moveSticker: event({
    run: ({ x, y }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ story: { main: { screenStickerPosition: { x, y } } } });
    },
    params: { x: 0, y: 0 },
  }),
  showSticker: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      setState({ story: { main: { screenStickerIsVisible: true } } });
    },
    params: {},
  }),
  hideSticker: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      setState({ story: { main: { screenStickerIsVisible: false } } });
    },
    params: {},
  }),
}));
