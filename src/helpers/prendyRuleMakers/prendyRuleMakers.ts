import { getRefs, getState, setState } from "repond";
import { APlaceRefs, APlaceRefsCamsRefs, AllPlacesRefs, GlobalState, StoryRefs, StoryState } from "../../types";

// export each of the rule makers stuff from here :)

export function getUsefulStoryStuff() {
  const storyState = getState().story.main as StoryState;
  const storyRefs = getRefs().story.main as StoryRefs;
  const globalState = getState().global.main as GlobalState;
  const { nowPlaceName, nowSegmentName } = globalState;
  const { nowCamName } = globalState;
  const placesRefs = getRefs().places as AllPlacesRefs;
  const placeRefs = placesRefs[nowPlaceName];
  const { camsRefs } = placesRefs[nowPlaceName];
  const camRefs = camsRefs[nowCamName];

  return {
    storyState,
    storyRefs,
    globalState,
    nowSegmentName: nowSegmentName as GlobalState["nowSegmentName"],
    nowPlaceName: nowPlaceName as GlobalState["nowPlaceName"],
    nowCamName: nowCamName as GlobalState["nowCamName"],
    placesRefs: placesRefs as AllPlacesRefs,
    placeRefs: placeRefs as APlaceRefs,
    camsRefs: camsRefs as APlaceRefsCamsRefs,
    camRefs: camRefs as APlaceRefsCamsRefs[keyof APlaceRefsCamsRefs],
  };
}

export function setStoryState(newState: Partial<StoryState>) {
  setState({ story: { main: newState } });
}
