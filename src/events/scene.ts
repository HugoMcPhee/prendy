import { Point3D } from "chootils/dist/points3d";
import { meta } from "../meta";
import { StatePath, getState, onNextTick, setState, stopNewEffect } from "repond";
import { addSubEvents, makeEventTypes, II } from "repond-events";
import { getStateAtPath } from "repond";
import { get2DAngleFromCharacterToSpot, getCharDollStuff } from "../helpers/prendyUtils/characters";
import { getGlobalState, setGlobalState } from "../helpers/prendyUtils/global";
import { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromSegmentRules } from "../helpers/prendyUtils/scene";
import {
  CameraNameByPlace,
  CharacterName,
  PlaceName,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../types";

type ToPlaceOption<T_PlaceName extends PlaceName> = {
  toPlace: T_PlaceName;
  toSpot?: SpotNameByPlace[T_PlaceName];
  toPositon?: Point3D;
  // NOTE might be able to make this auto if the first spot is inside a cam collider?
  toCam?: CameraNameByPlace[T_PlaceName];
  toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
};

export const sceneEvents = makeEventTypes(({ event }) => ({
  changeSegmentAtLoop: event({
    run: async ({ place, segment }, { runMode, liveId }) => {
      const segmentChangeEffectId = "changeSegmentAtLoop" + "_" + liveId;

      const stopSegmentChangeEffect = () => stopNewEffect(segmentChangeEffectId);
      const endEvent = () => {
        stopSegmentChangeEffect();
        setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });
      };

      if (runMode === "start") {
        // NOTE WARNING This will probably break if goalSegmentNameAtLoop changes from somewhere else!!!
        // to fix: could listen to changes to goalSegmentNameAtLoop
        // might be fixed now that doWhenNowSegmentChanges listens to any change, instead of waiting for the expected segment name
        // FIXME this can not work? (the async resolve part)

        onNextTick(() => {
          setGlobalState((state) => {
            const { goalSegmentNameAtLoop } = state;
            if (goalSegmentNameAtLoop) {
              // TEMP resolve straight away if there's already a goalSegmentNameAtLoop
              console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoop");
              endEvent();
              return {};
            }

            // End this event once the segment changes
            doWhenNowSegmentChanges(segment, () => endEvent(), segmentChangeEffectId);

            // Set the goal segment name for when the backdrop video loops
            return { goalSegmentNameAtLoop: segment };
          });
        });
      } else {
        stopSegmentChangeEffect();
      }
    },
    params: { place: "" as PlaceName, segment: "" as SegmentNameByPlace[PlaceName] },
    duration: Infinity,
  }),
  changeCameraAtLoop: event({
    run: async ({ place, cam }, { runMode, liveId }) => {
      const camChangeEffectId = "changeCameraAtLoop" + "_" + liveId;

      const stopCamChangeEffect = () => stopNewEffect(camChangeEffectId);
      const endEvent = () => {
        stopCamChangeEffect();
        setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });
      };

      if (runMode === "start") {
        setState((state) => {
          const { goalCamNameAtLoop } = state.global.main;
          if (goalCamNameAtLoop) {
            // TEMP resolve straight away if there's already a goalCamNameAtLoop
            console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoopAsync");
            endEvent();
            return {};
          }

          doWhenNowCamChanges(cam, () => endEvent(), camChangeEffectId);

          return {
            // AnyCameraName needed if there's only 1 place
            global: { main: { goalCamNameAtLoop: cam } },
          };
        });
      } else {
        stopCamChangeEffect();
      }
    },
    params: { place: "" as PlaceName, cam: "" as CameraNameByPlace[PlaceName] },
    duration: Infinity,
  }),
  hideWall: event({
    run: async ({ place, wall, unhide }, { runMode }) => {
      if (runMode !== "start") return;
      let wallShouldShow = false;
      if (unhide) wallShouldShow = true;

      setState((state) => ({
        places: {
          [place]: { toggledWalls: { ...(state.places[place].toggledWalls as any), [wall]: wallShouldShow } },
        },
      }));
    },
    params: {
      place: "" as PlaceName,
      wall: "",
      unhide: undefined as undefined | boolean,
    },
  }),
  showStoryView: event({
    run: async ({ hide = false }, { runMode, liveId, elapsedTime }) => {
      if (runMode !== "start") return;
      const GUESSED_FADE_TIME = 1000; // note could listen to something like isFullyFaded and return here, but maybe a set time is okay
      setGlobalState({ storyOverlayToggled: hide });
      // await delay(GUESSED_FADE_TIME);
      setState({ liveEvents: { [liveId]: { goalEndTime: elapsedTime + GUESSED_FADE_TIME } } });
    },
    params: { hide: undefined as boolean | undefined },
    duration: Infinity,
  }),
  setSegment: event({
    run: async ({ place, segment }, { runMode, isFirstAdd, liveId }) => {
      if (isFirstAdd) addSubEvents(liveId, [II("scene", "changeSegmentAtLoop", { place, segment })]);
    },
    params: { place: "" as PlaceName, segment: "" as SegmentNameByPlace[PlaceName] },
  }),
  setCamera: event({
    run: async ({ place, cam, whenToRun = "now" }, { runMode, isFirstAdd, liveId }) => {
      if (whenToRun === "at loop") {
        if (isFirstAdd) addSubEvents(liveId, [II("scene", "changeCameraAtLoop", { place, cam })]);
      } else {
        if (runMode === "start") {
          const endEvent = () => setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });

          const { nowPlaceName } = getState().global.main;
          const { nowCamName } = getState().global.main;

          // already on that camera
          if (nowCamName === cam) {
            endEvent();
            return;
          }

          // AnyCameraName needed if there's only 1 place
          setState({ global: { main: { goalCamName: cam } } }, () => endEvent());
        }
      }
    },
    params: {
      place: "" as PlaceName,
      cam: "" as CameraNameByPlace[PlaceName],
      whenToRun: undefined as "at loop" | "now" | undefined,
    },
  }),
  goToNewPlace: event({
    run: async ({ toOption, who }, { runMode, liveId }) => {
      if (runMode !== "start") return;
      const playerCharacter = getGlobalState().playerCharacter as CharacterName;
      const character = who || playerCharacter;

      const { placeInfoByName } = meta.assets!;

      // NOTE could include waitForPlaceFullyLoaded here so it can be awaited
      let { toSpot, toPlace, toPositon, toCam, toSegment } = toOption;
      const { dollName } = getCharDollStuff(character) ?? {};

      if (!dollName) return;

      onNextTick(() => {
        setState((state) => {
          const newPlaceDefaultCamName = placeInfoByName[toPlace].cameraNames[0];
          const nowSegmentName = state.global.main.nowSegmentName;

          const placeInfo = placeInfoByName[toPlace];
          // toSpot = toSpot ?? (placeInfo.spotNames[0] as SpotNameByPlace[T_PlaceName]);
          toSpot = toSpot; // ?? (placeInfo.spotNames[0] as SpotNameByPlace[T_PlaceName]);
          toPositon = toPositon;
          toCam = toCam ?? (placeInfo.cameraNames[0] as NonNullable<typeof toCam>); // types as a cam for the chosen place
          toSegment = toSegment ?? (placeInfo.segmentNames[0] as SegmentNameByPlace[PlaceName]);

          const foundRuleSegmentName = getSegmentFromSegmentRules(toPlace, toCam);
          if (foundRuleSegmentName) toSegment = foundRuleSegmentName;

          return {
            global: {
              main: {
                goalPlaceName: toPlace,
                goalSegmentWhenGoalPlaceLoads: toSegment || nowSegmentName,
                goalCamWhenNextPlaceLoads: toCam || newPlaceDefaultCamName,
              },
            },
            dolls: { [dollName]: { goalPositionAtNewPlace: toPositon, goalSpotNameAtNewPlace: toSpot } },
          };
        });
      });
    },
    params: {
      toOption: { toPlace: "" as PlaceName } as ToPlaceOption<PlaceName>,
      who: undefined as undefined | CharacterName,
    },
  }),
}));

// TODO Add CustomEventParams type for
// - setSegment
// - setCamera
// - goToNewPlace;

// ideas

// disable/enable camCubes ?
// start/stop characterFollowinglayer ?

// Special types

type SceneHideWallParams<T_Place extends PlaceName> = {
  place: T_Place;
  wall: WallNameByPlace[T_Place];
  unhide?: boolean;
};

type SceneSetSegmentParams<T_Place extends PlaceName> = {
  place: T_Place;
  segment: SegmentNameByPlace[T_Place];
};

type SceneSetCameraParams<T_Place extends PlaceName> = {
  place: T_Place;
  cam: CameraNameByPlace[T_Place];
  whenToRun?: "at loop" | "now" | undefined;
};

type SceneGoToNewPlaceParams<T_Place extends PlaceName> = {
  toOption: ToPlaceOption<T_Place>;
  who: undefined | CharacterName;
};

export type SceneEventParameters<T_Group, T_Event, T_GenericParamA> = T_Group extends "scene"
  ? T_Event extends "hideWall"
    ? SceneHideWallParams<T_GenericParamA & PlaceName>
    : T_Event extends "setSegment"
    ? SceneSetSegmentParams<T_GenericParamA & PlaceName>
    : T_Event extends "setCamera"
    ? SceneSetCameraParams<T_GenericParamA & PlaceName>
    : T_Event extends "goToNewPlace"
    ? SceneGoToNewPlaceParams<T_GenericParamA & PlaceName>
    : never
  : never;
