import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../typedConcepFuncs";
import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";

export function makeStartAllGlobalRules<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] &
    string, // DollNameParameter extends string
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  // making rules
  const globalVideoRules = makeGlobalVideoRules<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    PlaceInfoByName,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    placeInfoByName,
    dollNames
  );

  const globalChangePlaceRules = makeGlobalChangePlaceRules<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    DollName,
    PlaceName,
    AnyCameraName,
    PlaceInfoByName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    dollNames,
    placeInfoByName
  );

  const globalGeneralRules =
    makeGlobalGeneralRules<ConcepFuncs>(concepFuncs);

  const globalScenePlaneRules = makeGlobalScenePlaneRules<
    ConcepFuncs,
    BackdopOptions
  >(concepFuncs, backdopStartOptions);

  return function startAllGlobalRules() {
    // ----------------------------------
    // running rules

    globalVideoRules.startAll();
    globalChangePlaceRules.startAll();
    globalScenePlaneRules.startAll();
    globalGeneralRules.startAll();

    return function stopAllGlobalRules() {
      globalVideoRules.stopAll();
      globalChangePlaceRules.stopAll();
      globalScenePlaneRules.stopAll();
      globalGeneralRules.stopAll();
    };
  };
}
