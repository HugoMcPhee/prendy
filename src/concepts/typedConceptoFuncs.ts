import { ConceptsHelperTypes } from "concepto";
import { createConcepts } from "concepto";
import { gameyFlowNames } from ".";
import { makeGetGameyStartOptions } from "../getGameyOptions";
import { story_fake } from "../storyRuleMakers/fakeStoryConcepts";
import characters from "./characters";
import dolls from "./dolls";
import global from "./global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import pointers from "./pointers";
import safeVids from "./safeVids";
import sectionVids from "./sectionVids";
import speechBubbles from "./speechBubbles";
import stackVids from "./stackVids";

const testGetGameyStartOptions = makeGetGameyStartOptions<
  string, // PickupName
  string, // PlaceName
  string, // ModelName
  string, // CharacterName
  Record<string, string>, // TriggerNameByPlace
  Record<string, string>, // CameraNameByPlace
  Record<string, string>, // SpotNameByPlace
  Record<string, string[]>, // ModelNamesByPlaceLoose
  Record<string, string> // SegmentNameByPlace
>();

const TEST_START_OPTIONS = testGetGameyStartOptions({
  // place: "cave",
  // segment: "start",
  // camera: "View_Camera",
  place: "street" as string,
  segment: "start" as string,
  camera: "test_low_cam",
  heldPickups: [],
  playerCharacter: "walker",
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
});

const testNames = ["testA", "testB"] as const;

const getModelInfoByName = () => ({
  modelFile: "test",
  animationNames: testNames,
  boneNames: testNames,
  meshNames: testNames,
  materialNames: testNames,
  skeletonName: "test",
});

const testStuff = {
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
      videoFiles: { color: "test", depth: "test" },
      cameraNames: testNames,
      segmentDurations: { start: 1 } as Record<string, number>,
      segmentNames: testNames,
      wallNames: testNames,
      floorNames: testNames,
      triggerNames: testNames,
      spotNames: testNames,
      soundspotNames: testNames,
      probesByCamera: { camA: "test" },
      segmentTimesByCamera: { camA: { start: 0 } } as Record<
        string,
        Record<string, number>
      >,
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
};

export type CharacterOptionsPlaceholder<
  CharacterName extends string,
  DollName extends string,
  FontName extends string
> = Record<
  CharacterName,
  {
    doll: DollName;
    font: FontName;
  }
>;

export type DollOptionsPlaceholder<
  DollName extends string,
  ModelName extends string
> = Record<
  DollName,
  {
    model: ModelName;
  }
>;

const placeholderGameyConcepts = {
  keyboards: keyboards(),
  miniBubbles: miniBubbles<any>(), // CharacterName
  pointers: pointers(),
  global: global<
    GameyStartOptionsUntyped, // typeof TEST_START_OPTIONS,
    any, // AnySegmentName,
    any, // PlaceName,
    any, //  ModelName,
    any, //  DollName,
    any, // PickupName,
    any, // CharacterName
    any, // MusicName
    any, // SoundName
    typeof testStuff.placeInfoByName // PlaceInfoByName
  >(TEST_START_OPTIONS, testStuff.musicNames, testStuff.soundNames),
  models: models<any>(testStuff.modelNames), //ModelName
  dolls: dolls<
    any, // ModelName
    any, // DollName
    any, // AnySpotName
    any, // AnyAnimationName
    Record<any, any>, // DollOptions
    Record<any, any>, // AnimationNameByModel
    Record<any, any>, // BoneNameByModel
    Record<any, any>, // MaterialNameByModel
    Record<any, any>, // MeshNameByModel
    typeof testStuff.modelInfoByName
  >(
    testStuff.modelNames,
    testStuff.dollNames,
    testStuff.modelInfoByName,
    testStuff.dollOptions
  ),
  characters: characters<
    any, // CharacterName
    any, // DollName
    any, // FontName
    any, // AnyTriggerName
    any, // AnyCameraName
    typeof testStuff.characterOptions // CharacterOptions
  >(testStuff.characterNames, testStuff.dollNames, testStuff.characterOptions),
  players: players<
    typeof TEST_START_OPTIONS,
    any // AnyAnimationName
  >(TEST_START_OPTIONS),
  speechBubbles: speechBubbles<
    any, // CharacterName,
    any, // DollName,
    any, // FontName,
    any, // SpeechVidName,
    typeof testStuff.characterOptions
  >(testStuff.characterNames, testStuff.characterOptions, testStuff.fontNames),
  places: places<
    any, // PlaceName,
    any, // AnyCameraName,
    Record<any, any>, // TriggerNameByPlace,
    Record<any, any>, // CameraNameByPlace,
    Record<any, any>, // SoundspotNameByPlace,
    Record<any, any>, // WallNameByPlace,
    Record<any, any>, // SpotNameByPlace,
    typeof testStuff.placeInfoByName
  >(testStuff.placeNames, testStuff.placeInfoByName),
  safeVids: safeVids<
    any, // PlaceName
    typeof testStuff.placeInfoByName
  >(testStuff.placeNames, testStuff.placeInfoByName),
  stackVids: stackVids(testStuff.placeNames),
  sectionVids: sectionVids(testStuff.placeNames),
  //
  story: story_fake<any, any>(),
};

// const conceptoFuncs = _createConcepts_ForTypes(placeholderGameyConcepts, {
const conceptoFuncs = createConcepts(placeholderGameyConcepts, {
  flowNames: gameyFlowNames,
  dontSetMeta: true,
});

// NOTE Change these to typeof  to have known types while making backdops library
// export type PlaceholderGameyConcepts = typeof placeholderGameyConcepts;
// export type GameyConceptoFuncs = typeof conceptoFuncs;

export type PlaceholderGameyConcepts = Record<
  any,
  {
    state: (itemName: any) => any;
    refs: (itemName: any, type: any) => any;
    startStates?: Record<any, any>;
  }
>;
export type GameyConceptoFuncs = {
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
  makeRules: (
    ...args: any
  ) => {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
  };
  makeDynamicRules: (
    ...args: any
  ) => {
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

type ItemType = keyof ReturnType<GameyConceptoFuncs["getState"]>;
type HelperType<T extends ItemType> = ConceptsHelperTypes<
  GameyConceptoFuncs["getState"],
  GameyConceptoFuncs["getRefs"],
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
    videoFiles: { color: string; depth: string };
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

export type GameyStartOptionsUntyped = {
  place: string;
  segment: string;
  camera: string;
  heldPickups: string[];
  playerCharacter: string;
  zoomLevels: {
    default: number;
    max: number;
  };
  walkSpeed: number;
  animationSpeed: number; // 1.75 for rodont
  headHeightOffset: number; // 1.75 for rodont TODO update this to headHeightOffetsByModel, and maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: Partial<
    Record<string, Partial<Record<string, ToNewOptionUntyped>>>
  >;
  modelNamesByPlace: Record<string, string[]>;
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
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

export type GameyStartOptionsGeneric<
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
    Record<
      PlaceName,
      Partial<
        Record<
          string,
          ToPlaceOption<AnyCameraName, AnySegmentName, PlaceName, AnySpotName>
        >
      >
    >
  >;
  modelNamesByPlace: Record<PlaceName, ModelName[]>;
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
};
