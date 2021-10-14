import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../typedConceptoFuncs";
import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";

export function makeStartAllGlobalRules<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  DollName extends keyof ReturnType<ConceptoFuncs["getState"]>["dolls"] &
    string, // DollNameParameter extends string
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  // making rules
  const globalVideoRules = makeGlobalVideoRules<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    PlaceInfoByName,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
    placeInfoByName,
    dollNames
  );

  const globalChangePlaceRules = makeGlobalChangePlaceRules<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    DollName,
    PlaceName,
    AnyCameraName,
    PlaceInfoByName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
    dollNames,
    placeInfoByName
  );

  const globalGeneralRules =
    makeGlobalGeneralRules<ConceptoFuncs>(conceptoFuncs);

  const globalScenePlaneRules = makeGlobalScenePlaneRules<
    ConceptoFuncs,
    GameyStartOptions
  >(conceptoFuncs, gameyStartOptions);

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
