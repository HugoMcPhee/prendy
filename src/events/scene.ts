import { Point3D } from "chootils/dist/points3d";
import { meta } from "../meta";
import { StatePath, getState, onNextTick, setState, stopNewEffect } from "repond";
import { addSubEvents, makeEventTypes, toDo } from "repond-events";
import { getStatePathState } from "repond/src/usable/getSet";
import { get2DAngleFromCharacterToSpot, getCharDollStuff } from "../helpers/prendyUtils/characters";
import { setGlobalState } from "../helpers/prendyUtils/global";
import { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromSegmentRules } from "../helpers/prendyUtils/scene";
import { CameraNameByPlace, CharacterName, PlaceName, SegmentNameByPlace, SpotNameByPlace } from "../types";

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
    run: async ({ place, newSegmentName }, { runMode, liveId }) => {
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
            doWhenNowSegmentChanges(newSegmentName, () => endEvent(), segmentChangeEffectId);

            // Set the goal segment name for when the backdrop video loops
            return { goalSegmentNameAtLoop: newSegmentName };
          });
        });
      } else {
        stopSegmentChangeEffect();
      }
    },
    params: { place: "" as PlaceName, newSegmentName: "" as SegmentNameByPlace[PlaceName] },
    duration: Infinity,
  }),
  changeCameraAtLoop: event({
    run: async ({ place, newCamName }, { runMode, liveId }) => {
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

          doWhenNowCamChanges(newCamName, () => endEvent(), camChangeEffectId);

          return {
            // AnyCameraName needed if there's only 1 place
            global: { main: { goalCamNameAtLoop: newCamName } },
          };
        });
      } else {
        stopCamChangeEffect();
      }
    },
    params: { place: "" as PlaceName, newCamName: "" as CameraNameByPlace[PlaceName] },
    duration: Infinity,
  }),
  lookAtSpot: event({
    run: async ({ place, spot, character }, { runMode }) => {
      if (runMode !== "start") return;

      const { playerCharacter } = getState().global.main;
      const editedCharacter = character ?? (playerCharacter as CharacterName);
      const charDollStuff = getCharDollStuff(editedCharacter);
      const { dollName } = charDollStuff;

      const angle = get2DAngleFromCharacterToSpot(editedCharacter, place, spot);
      setState({ dolls: { [dollName]: { rotationYGoal: angle } } });
    },
    params: { place: "" as PlaceName, spot: "" as SpotNameByPlace[PlaceName], character: "" },
  }),
  hideWallIf: event({
    run: async ({ placeName, wallName, statePath }, { runMode }) => {
      if (runMode !== "start") return;
      if (!statePath[0]) return console.error("hideWallIf: statePath[0] is empty");
      const shouldHideWall = getStatePathState(statePath);
      setState((state) => ({
        places: {
          [placeName]: {
            toggledWalls: { ...(state.places[placeName].toggledWalls as any), [wallName]: shouldHideWall },
          },
        },
      }));
    },
    params: { placeName: "" as PlaceName, wallName: "", statePath: ["", "", ""] as StatePath<any, any> },
  }),
  showStoryView: event({
    run: async ({ isVisible }, { runMode, liveId, elapsedTime }) => {
      if (runMode !== "start") return;
      const GUESSED_FADE_TIME = 1000; // note could listen to something like isFullyFaded and return here, but maybe a set time is okay
      setGlobalState({ storyOverlayToggled: !isVisible });
      // await delay(GUESSED_FADE_TIME);
      setState({ liveEvents: { [liveId]: { goalEndTime: elapsedTime + GUESSED_FADE_TIME } } });
    },
    params: { isVisible: true },
    duration: Infinity,
  }),
  setSegment: event({
    run: async ({ placeName, segmentName }, { runMode, isFirstAdd, liveId }) => {
      if (isFirstAdd)
        addSubEvents(liveId, [toDo("scene", "changeSegmentAtLoop", { place: placeName, newSegmentName: segmentName })]);
    },
    params: { placeName: "" as PlaceName, segmentName: "" as SegmentNameByPlace[PlaceName] },
  }),
  setCamera: event({
    run: async ({ placeName, cameraName, whenToRun }, { runMode, isFirstAdd, liveId }) => {
      if (whenToRun === "at loop") {
        if (isFirstAdd) {
          addSubEvents(liveId, [toDo("scene", "changeCameraAtLoop", { place: placeName, newCamName: cameraName })]);
        }
      } else {
        if (runMode === "start") {
          const endEvent = () => setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });

          const { nowPlaceName } = getState().global.main;
          const { nowCamName } = getState().global.main;

          // already on that camera
          if (nowCamName === cameraName) {
            endEvent();
            return;
          }

          // AnyCameraName needed if there's only 1 place
          setState({ global: { main: { goalCamName: cameraName } } }, () => endEvent());
        }
      }
    },
    params: {
      placeName: "" as PlaceName,
      cameraName: "" as CameraNameByPlace[PlaceName],
      whenToRun: "at loop" as "at loop" | "now",
    },
  }),
  goToNewPlace: event({
    run: async ({ toOption, charNameParam }, { runMode, liveId }) => {
      if (runMode !== "start") return;
      const charName = charNameParam || meta.assets!.characterNames[0];

      const { placeInfoByName } = meta.assets!;

      // NOTE could include waitForPlaceFullyLoaded here so it can be awaited
      let { toSpot, toPlace, toPositon, toCam, toSegment } = toOption;
      const { dollName } = getCharDollStuff(charName) ?? {};

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
      charNameParam: undefined as undefined | CharacterName,
    },
  }),
}));

// TOXO Add CustomEventParams type for
// - lookAtSpot
// - hideWallIf
// - setSegment
// - setCamera
// - goToNewPlace;

// ideas

// disable/enable camCubes ?
// start/stop characterFollowinglayer ?
