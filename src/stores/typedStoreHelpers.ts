import { PrendyAssets } from "../declarations";
import { makePrendyOptions } from "../getPrendyOptions";

const TEST_START_OPTIONS = makePrendyOptions({
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
  gameTimeSpeed: 1,
  headHeightOffsets: { walker: 2.75 },
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
      // videoFiles: { backdrop: "test" },
      cameraNames: testNames,
      segmentDurations: { start: 1 } as Record<string, number>,
      segmentNames: testNames,
      wallNames: testNames,
      floorNames: testNames,
      triggerNames: testNames,
      spotNames: testNames,
      soundspotNames: testNames,
      probesByCamera: { camA: "test" },
      segmentNamesByCamera: { camA: ["start"] } as Record<string, Array<string>>,
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

// const placeholderPrendyStores = {
//   keyboards: keyboards(),
//   miniBubbles: miniBubbles(testArtStuff),
//   global: global(TEST_START_OPTIONS as any, testArtStuff),
//   models: models(testArtStuff),
//   dolls: dolls(testArtStuff),
//   characters: characters(testArtStuff),
//   players: players(TEST_START_OPTIONS as any),
//   speechBubbles: speechBubbles(testArtStuff as any) as any, // NOTE as any cause it hits the typescript imit with speechBubbles
//   places: places(testArtStuff, TEST_START_OPTIONS as any),
//   stateVids: stateVids(testArtStuff),
//   sliceVids: sliceVids(testArtStuff),
//   //
//   story: story_fake<any, any>(),
// };

// const storeHelpers = _createStoreHelpers_ForTypes(placeholderPrendyStores, {
// const storeHelpers = createStoreHelpers(placeholderPrendyStores, {
//   stepNames: prendyStepNames,
//   dontSetMeta: true,
// });

// -----------------------------------------------------------------------------
// NOTE Use these to typeof to have known types while making prendys library
// export type PrendyStoresUntypedType = typeof placeholderPrendyStores;
// export type PrendyStoreHelpersUntypedType = typeof storeHelpers;

type AnyFunction = (...args: any) => any;

export type PlaceInfoByNamePlaceholder<
  PlaceName extends string
  // AnyCameraName extends string // NOTE might need to be CameraNameByPlace
> = Record<
  PlaceName,
  {
    modelFile: string;
    // videoFiles: { backdrop: string };
    cameraNames: readonly string[];
    segmentNames: readonly string[];
    wallNames: readonly string[];
    floorNames: readonly string[];
    triggerNames: readonly string[];
    spotNames: readonly string[];
    soundspotNames: readonly string[];
    probesByCamera: Record<string, string>;
    backdropsByCamera: Record<
      string,
      Record<
        string,
        {
          frameRate: number;
          totalFrames: number;
          maxFramesPerRow: number;
          textures: Array<{ color: string; depth: string }>;
        }
      >
    >; // by camera, by segment
    segmentNamesByCamera: Record<string, Array<string>>;
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
  gameTimeSpeed: number;
  headHeightOffsets: Record<string, number>; // maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: Partial<Record<string, Partial<Record<string, ToNewOptionUntyped>>>>;
  modelNamesByPlace: Record<string, string[]>;
  //
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
  gameTimeSpeed: number;
  headHeightOffsets: Record<string, number>; // maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: Partial<
    Record<PlaceName, Partial<Record<string, ToPlaceOption<AnyCameraName, AnySegmentName, PlaceName, AnySpotName>>>>
  >;
  modelNamesByPlace: Record<PlaceName, ModelName[]>;
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
};
