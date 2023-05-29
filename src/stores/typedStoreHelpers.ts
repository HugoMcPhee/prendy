import { PrendyAssets } from "../declarations";
import { StoreHelperTypes } from "repond";
import { createStoreHelpers } from "repond";
import { prendyStepNames } from "./stores";
import { getPrendyOptions } from "../getPrendyOptions";
import { story_fake } from "../helpers/prendyRuleMakers/fakeStoryStore";
import characters from "./characters";
import dolls from "./dolls/dolls";
import global from "./global/global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import stateVids from "./stateVids";
import loopVids from "./loopVids";
import speechBubbles from "./speechBubbles";

const TEST_START_OPTIONS = getPrendyOptions({
  // place: "cave",
  // segment: "start",
  // camera: "View_Camera",
  place: "street" as string,
  segment: "start" as string,
  camera: "test_low_cam",
  heldPickups: [],
  playerCharacter: "walker",
  playerAnimations: { walking: "walker_walking", idle: "walker_idle" },
  zoomLevels: { default: 1.1, max: 2 },
  walkSpeed: 10,
  animationSpeed: 1,
  headHeightOffset: -0.5,
  doorsInfo: {
    street: {
      // test_trigger: {
      //   toPlace: "cityb",
      //   toCam: "looping",
      //   toSegment: "start",
      //   toSpot: "start_spot",
      // },
    },
  },
  modelNamesByPlace: {
    street: ["walker", "cat", "chef", "fakefish", "fish", "ladder", "taptop"],
  },
} as any);

const testNames = ["testA", "testB"] as const;

const getModelInfoByName = () => ({
  modelFile: "test",
  animationNames: testNames,
  boneNames: testNames,
  meshNames: testNames,
  materialNames: testNames,
  skeletonName: "test",
});

const testArtStuff = {
  modelNames: ["modelA", "modelB"] as readonly any[],
  dollNames: ["dollA", "dollB"] as readonly any[],
  placeNames: ["placeA"] as readonly any[],
  characterNames: ["characterA", "characterB"] as readonly any[],
  musicNames: ["musicA", "musicB"] as readonly any[],
  soundNames: ["soundA", "soundB"] as readonly any[],
  fontNames: ["fontA", "fontB"] as readonly any[],
  modelInfoByName: {
    modelA: getModelInfoByName(),
    modelB: getModelInfoByName(),
  },
  placeInfoByName: {
    placeA: {
      modelFile: "test",
      videoFiles: { backdrop: "test" },
      cameraNames: testNames,
      segmentDurations: { start: 1 } as Record<string, number>,
      segmentNames: testNames,
      wallNames: testNames,
      floorNames: testNames,
      triggerNames: testNames,
      spotNames: testNames,
      soundspotNames: testNames,
      probesByCamera: { camA: "test" },
      segmentTimesByCamera: { camA: { start: 0 } } as Record<string, Record<string, number>>,
    } as const,
  },
  dollOptions: {
    characterA: { model: "modelA" },
    characterB: { model: "modelB" },
  } as const,
  characterOptions: {
    characterA: { doll: "dollA", font: "fontA" },
    characterB: { doll: "dollB", font: "fontA" },
  } as const,
} as unknown as PrendyAssets;

// NOTE to get types working, might need to hard-type prendyAssets, while working on the libray

export type CharacterOptionsPlaceholder<
  CharacterName extends string,
  DollName extends string,
  FontName extends string
> = Record<
  CharacterName,
  {
    doll: any;
    font: any;
  }
>;

export type DollOptionsPlaceholder<DollName extends string, ModelName extends string> = Record<
  DollName,
  {
    model: any;
  }
>;

const placeholderPrendyStores = {
  keyboards: keyboards(),
  miniBubbles: miniBubbles(testArtStuff),
  global: global(TEST_START_OPTIONS as any, testArtStuff),
  models: models(testArtStuff),
  dolls: dolls(testArtStuff),
  characters: characters(testArtStuff),
  players: players(TEST_START_OPTIONS as any),
  speechBubbles: speechBubbles(testArtStuff),
  places: places(testArtStuff, TEST_START_OPTIONS as any),
  stateVids: stateVids(testArtStuff),
  loopVids: loopVids(testArtStuff),
  //
  story: story_fake<any, any>(),
};

// const storeHelpers = _createStoreHelpers_ForTypes(placeholderPrendyStores, {
const storeHelpers = createStoreHelpers(placeholderPrendyStores, {
  stepNames: prendyStepNames,
  dontSetMeta: true,
});

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// NOTE Change these to typeof  to have known types while making prendys library
export type PlaceholderPrendyStores = typeof placeholderPrendyStores;
export type PrendyStoreHelpers = typeof storeHelpers;

export type PlaceholderPrendyStores_ = Record<
  any,
  {
    state: (itemName: any) => any;
    refs: (itemName: any, type: any) => any;
    startStates?: Record<any, any>;
  }
>;
export type PrendyStoreHelpers_ = {
  getState: () => Record<any, Record<any, Record<any, any | any[]>>>;
  getPreviousState: () => Record<any, Record<any, Record<any, any | any[]>>>;
  getRefs: () => Record<any, Record<any, Record<any, any | any[]>>>;
  setState: (
    newState:
      | Record<any, Record<any, Record<any, any | any[]>>>
      | ((state: Record<any, Record<any, Record<any, any | any[]>>>) => any),
    callback?: (nextFrameDuration: number) => any
  ) => void;
  startItemEffect: (...args: any) => any;
  startEffect: (...args: any) => any;
  stopEffect: (...args: any) => any;
  makeRules: (...args: any) => {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
  };
  makeDynamicRules: (...args: any) => {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
  };
  onNextTick: (...args: any) => any;
  addItem: (...args: any) => any;
  removeItem: (...args: any) => any;

  getItem: (...args: any) => any;
  useStore: (...args: any) => any;
  useStoreItem: (...args: any) => any;
  useStoreEffect: (...args: any) => any;
  useStoreItemEffect: (...args: any) => any;
  useStoreItemPropsEffect: (...args: any) => any;
};

type ItemType = keyof ReturnType<PrendyStoreHelpers["getState"]>;
type HelperType<T extends ItemType> = StoreHelperTypes<
  PrendyStoreHelpers["getState"],
  PrendyStoreHelpers["getRefs"],
  T
>;
export type AllItemsState<T extends ItemType> = HelperType<T>["AllItemsState"];
export type ItemState<T extends ItemType> = HelperType<T>["ItemState"];
export type ItemRefs<T extends ItemType> = HelperType<T>["ItemRefs"];

export type PlaceInfoByNamePlaceholder<
  PlaceName extends string
  // AnyCameraName extends string // NOTE might need to be CameraNameByPlace
> = Record<
  PlaceName,
  {
    modelFile: string;
    videoFiles: { backdrop: string };
    cameraNames: readonly string[];
    segmentDurations: Record<string, number>;
    segmentNames: readonly string[];
    wallNames: readonly string[];
    floorNames: readonly string[];
    triggerNames: readonly string[];
    spotNames: readonly string[];
    soundspotNames: readonly string[];
    probesByCamera: Record<string, string>;
    segmentTimesByCamera: Record<string, Record<string, number>>;
  }
>;

export type ModelInfoByNamePlaceholder<ModelName extends string> = Record<
  ModelName,
  {
    modelFile: string;
    animationNames: readonly string[];
    boneNames: readonly string[];
    meshNames: readonly string[];
    materialNames: readonly string[];
    skeletonName: string;
  }
>;

export type PickupsInfoPlaceholder<PickupName extends string> = Record<
  PickupName,
  {
    name: string;
    hint: string;
    image: string;
  }
>;

// https://stackoverflow.com/a/43001581
// Marco & Nitzan Tomer

export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

type ToNewOptionUntyped = {
  toPlace: string;
  toSpot: string;
  toCam?: string;
  toSegment?: string;
};

export type PrendyOptionsUntyped = {
  place: string;
  segment: string;
  camera: string;
  heldPickups: string[];
  playerCharacter: string;
  playerAnimations: { walking: string; idle: string };
  zoomLevels: {
    default: number;
    max: number;
  };
  walkSpeed: number;
  animationSpeed: number; // 1.75 for rodont
  headHeightOffset: number; // 1.75 for rodont TODO update this to headHeightOffetsByModel, and maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: Partial<Record<string, Partial<Record<string, ToNewOptionUntyped>>>>;
  modelNamesByPlace: Record<string, string[]>;
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
  hasInteracting?: boolean;
  hasJumping?: boolean;
};

type ToPlaceOption<
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  AnySpotName extends string
> = {
  toPlace: PlaceName;
  toSpot: AnySpotName;
  toCam?: AnyCameraName;
  toSegment?: AnySegmentName;
};

export type PrendyOptionsGeneric<
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  CharacterName extends string,
  PickupName extends string,
  ModelName extends string,
  AnySpotName extends string
> = {
  place: PlaceName;
  segment: AnySegmentName;
  camera: AnyCameraName;
  heldPickups: PickupName[];
  playerCharacter: CharacterName;
  zoomLevels: {
    default: number;
    max: number;
  };
  walkSpeed: number;
  animationSpeed: number; // 1.75 for rodont
  headHeightOffset: number; // 1.75 for rodont TODO update this to headHeightOffetsByModel, and maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: Partial<
    Record<PlaceName, Partial<Record<string, ToPlaceOption<AnyCameraName, AnySegmentName, PlaceName, AnySpotName>>>>
  >;
  modelNamesByPlace: Record<PlaceName, ModelName[]>;
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
};
