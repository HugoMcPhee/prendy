import delay from "delay";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceInfoByName,
  PlaceName,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../../declarations";
import { get_characterStoryUtils, get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_sceneStoryUtils } from "../../helpers/prendyUtils/scene";
import { Point3D } from "chootils/dist/points3d";
import { get_spotStoryUtils } from "../prendyUtils/spots";

export function get_sceneStoryHelpers<
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(storeHelpers: A_PrendyStoreHelpers, placeInfoByName: A_PlaceInfoByName, characterNames: readonly A_CharacterName[]) {
  const { getRefs, getState, onNextTick, setState } = storeHelpers;

  type CameraNameFromPlace<T_Place extends keyof A_PlaceInfoByName> =
    keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type ToPlaceOption<T_PlaceName extends A_PlaceName> = {
    toPlace: T_PlaceName;
    toSpot?: A_SpotNameByPlace[T_PlaceName];
    toPositon?: Point3D;
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: A_CameraNameByPlace[T_PlaceName];
    toSegment?: A_SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  const { setGlobalState } = get_globalUtils(storeHelpers);
  const getCharDollStuff = get_getCharDollStuff(storeHelpers);
  const { get2DAngleFromCharacterToSpot } = get_characterStoryUtils<
    A_CharacterName,
    A_DollName,
    A_PlaceName,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers);
  const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = get_sceneStoryUtils<
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_PlaceName,
    A_PrendyStoreHelpers
  >(storeHelpers);
  const { getSpotPosition, getSpotRotation } = get_spotStoryUtils<A_PlaceName, A_PrendyStoreHelpers, A_SpotNameByPlace>(
    storeHelpers
  );

  async function changeSegmentAtLoop<
    T_Place extends A_PlaceName,
    T_Segment extends A_AnySegmentName // NOTE & might mes with the tye here
  >(_place: T_Place, newSegmentName: T_Segment) {
    // NOTE WARNING This will probably break if goalSegmentNameAtLoop changes from somewhere else!!!
    // to fix: could listen to changes to goalSegmentNameAtLoop
    // might be fixed now that doWhenNowSegmentChanges listens to any change, instead of waiting for the expected segment name
    // FIXME this can not work? (the async resolve part)
    return new Promise<void>((resolve, _reject) => {
      onNextTick(() => {
        setGlobalState((state) => {
          const { goalSegmentNameAtLoop } = state;
          if (goalSegmentNameAtLoop) {
            // TEMP resolve straight away if there's already a goalSegmentNameAtLoop
            console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoopAsync");
            resolve();
            return {};
          }

          doWhenNowSegmentChanges(newSegmentName, () => resolve());

          return { goalSegmentNameAtLoop: newSegmentName };
        });
      });
    });
  }

  async function changeCameraAtLoop<
    // WARNING This might mess up if the place changes while the cam change was waiting
    T_Place extends A_PlaceName,
    T_Cam extends CameraNameFromPlace<T_Place> & A_AnyCameraName // NOTE new & type
  >(_place: T_Place, newCamName: T_Cam) {
    return new Promise<void>((resolve, _reject) => {
      setState((state) => {
        const { goalCamNameAtLoop } = state.global.main;
        if (goalCamNameAtLoop) {
          // TEMP resolve straight away if there's already a goalCamNameAtLoop
          console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoopAsync");
          resolve();
          return {};
        }

        doWhenNowCamChanges(newCamName, () => resolve());

        return {
          // AnyCameraName needed if there's only 1 place
          global: { main: { goalCamNameAtLoop: newCamName } },
        };
      });
    });
  }

  function lookAtSpot<T_Place extends A_PlaceName>(
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place],
    character?: A_CharacterName
  ) {
    const { playerCharacter } = getState().global.main;
    const editedCharacter = character ?? (playerCharacter as A_CharacterName);
    const charDollStuff = getCharDollStuff(editedCharacter);
    const { dollName } = charDollStuff;

    const angle = get2DAngleFromCharacterToSpot(editedCharacter, place, spot);
    setState({ dolls: { [dollName]: { rotationYGoal: angle } } });
  }

  function hideWallIf<T_Place extends A_PlaceName, T_Wall extends A_WallNameByPlace[T_Place]>(
    placeName: T_Place,
    wallName: T_Wall,
    isDisabled: boolean
  ) {
    // NOTE could update to set properties in a loop to avoid spreading
    setState((state) => ({
      places: {
        [placeName]: { toggledWalls: { ...(state.places[placeName].toggledWalls as any), [wallName]: !isDisabled } },
      },
    }));
  }

  async function showStoryView(isVisible: boolean = true) {
    const GUESSED_FADE_TIME = 1000; // note could listen to something like isFullyFaded and return here, but maybe a set time is okay
    setGlobalState({ storyOverlayToggled: !isVisible });
    await delay(GUESSED_FADE_TIME);
  }

  function setSegment<T_Place extends A_PlaceName, T_Segment extends A_SegmentNameByPlace[T_Place]>(
    _placeName: T_Place,
    segmentName: T_Segment
    // whenToRun: "now" | "at loop" = "at loop"
  ) {
    return new Promise<void>((resolve, _reject) => {
      // always sets segment at loop sicne it probably shouldn't change halfway through

      // if (whenToRun === "now") {
      //   const { nowSegmentName } = getState().global.main;
      //   if (nowSegmentName === segmentName) {
      //     console.warn("already on that segment");
      //     resolve();
      //     return;
      //   }
      //   setGlobalState({ goalSegmentName: segmentName }, () => resolve());
      // } else if (whenToRun === "at loop") {
      changeSegmentAtLoop(_placeName, segmentName as any).finally(() => resolve());
      // }
    });
  }

  function setCamera<
    T_Place extends A_PlaceName,
    T_Cam extends CameraNameFromPlace<T_Place> & A_AnyCameraName // NOTE & Type
  >(_placeName: T_Place, cameraName: T_Cam, whenToRun: "now" | "at loop" = "now") {
    return new Promise<void>((resolve, _reject) => {
      if (whenToRun === "now") {
        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().global.main;

        // already on that camera
        if (nowCamName === cameraName) {
          resolve();
          return;
        }

        // AnyCameraName needed if there's only 1 place
        setState({ global: { main: { goalCamName: cameraName } } }, () => resolve());
      } else if (whenToRun === "at loop") {
        changeCameraAtLoop(_placeName, cameraName as any).finally(() => resolve());
      }
    });
  }

  function goToNewPlace<T_PlaceName extends A_PlaceName>(
    toOption: ToPlaceOption<T_PlaceName>,
    charName: A_CharacterName = characterNames[0]
  ) {
    // NOTE could include waitForPlaceFullyLoaded here so it can be awaited
    let { toSpot, toPlace, toPositon, toCam, toSegment } = toOption;
    const { dollName } = getCharDollStuff(charName) ?? {};
    console.log("toOption");
    console.log(toOption);

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
        toSegment = toSegment ?? (placeInfo.segmentNames[0] as A_SegmentNameByPlace[T_PlaceName]);

        const foundRuleSegmentName = getSegmentFromStoryRules(toPlace, toCam);
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
  }

  // ideas

  // disable/enable camCubes ?
  // start/stop characterFollowinglayer ?

  return {
    // changeSegmentAtLoop,
    // changeCameraAtLoop,
    lookAtSpot,
    hideWallIf,
    showStoryView,
    setSegment,
    setCamera,
    goToNewPlace,
  };
}
