import delay from "delay";
import { makeTyped_getCharDollStuff } from "../../../stores/characters/utils";
import { makeTyped_globalUtils } from "../../../stores/global/utils/utils";
import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  PlaceInfoByName,
  PlaceName,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../../../declarations";
import { makeTyped_characterStoryUtils } from "../utils/characters";
import { makeTyped_sceneStoryUtils } from "../utils/scene";

export function makeTyped_sceneStoryHelpers<
  StoreHelpers extends PrendyStoreHelpers,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(storeHelpers: StoreHelpers, placeInfoByName: A_PlaceInfoByName, characterNames: readonly A_CharacterName[]) {
  const { getRefs, getState, onNextTick, setState } = storeHelpers;

  type CameraNameFromPlace<T_Place extends keyof A_PlaceInfoByName> =
    keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type ToPlaceOption<T_PlaceName extends A_PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: A_SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: A_CameraNameByPlace[T_PlaceName];
    toSegment?: A_SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
  const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);
  const { get2DAngleFromCharacterToSpot } = makeTyped_characterStoryUtils(storeHelpers);
  const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } =
    makeTyped_sceneStoryUtils(storeHelpers);

  async function changeSegmentAtLoop<
    T_Place extends A_PlaceName,
    T_Segment extends A_AnySegmentName // NOTE & might mes with the tye here
  >(_place: T_Place, newSegmentName: T_Segment) {
    // NOTE WARNING This will probably break if wantedSegmentNameAtLoop changes from somewhere else!!!
    // to fix: could listen to changes to wantedSegmentNameAtLoop
    // might be fixed now that doWhenNowSegmentChanges listens to any change, instead of waiting for the expected segment name
    // FIXME this can not work? (the async resolve part)
    return new Promise<void>((resolve, _reject) => {
      onNextTick(() => {
        setGlobalState((state) => {
          const { wantedSegmentNameAtLoop } = state;
          if (wantedSegmentNameAtLoop) {
            // TEMP resolve straight away if there's already a wantedSegmentNameAtLoop
            console.error("there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync");
            resolve();
            return {};
          }

          doWhenNowSegmentChanges(newSegmentName, () => resolve());

          return { wantedSegmentNameAtLoop: newSegmentName };
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
        const { nowPlaceName } = state.global.main;
        const { wantedCamNameAtLoop } = state.places[nowPlaceName];
        if (wantedCamNameAtLoop) {
          // TEMP resolve straight away if there's already a wantedCamNameAtLoop
          console.error("there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync");
          resolve();
          return {};
        }

        doWhenNowCamChanges(newCamName, () => resolve());

        return {
          places: {
            [nowPlaceName]: {
              wantedCamNameAtLoop: newCamName,
            }, // AnyCameraName needed if there's only 1 place
          },
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
    const placeRefs = getRefs().places[placeName];
    const wallMesh = placeRefs.wallMeshes[wallName];

    if (wallMesh) wallMesh.checkCollisions = !isDisabled;
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
      //   setGlobalState({ wantedSegmentName: segmentName }, () => resolve());
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
        const { nowCamName } = getState().places[nowPlaceName];

        // already on that camera
        if (nowCamName === cameraName) {
          resolve();
          return;
        }
        setState(
          {
            places: {
              [nowPlaceName]: { wantedCamName: cameraName }, // AnyCameraName needed if there's only 1 place
            },
          },
          () => resolve()
        );
      } else if (whenToRun === "at loop") {
        changeCameraAtLoop(_placeName, cameraName as any).finally(() => resolve());
      }
    });
  }

  function goToNewPlace<T_PlaceName extends A_PlaceName>(
    toOption: ToPlaceOption<T_PlaceName>,
    charName: A_CharacterName = characterNames[0]
  ) {
    let { toSpot, toPlace, toCam, toSegment } = toOption;
    const { dollName } = getCharDollStuff(charName) ?? {};
    if (!dollName) return;

    onNextTick(() => {
      setState((state) => {
        const newPlaceNowCamName = state.places[toPlace].nowCamName;
        const nowSegmentName = state.global.main.nowSegmentName;

        const placeInfo = placeInfoByName[toPlace];
        toSpot = toSpot ?? (placeInfo.spotNames[0] as A_SpotNameByPlace[T_PlaceName]);
        toCam = toCam ?? (placeInfo.cameraNames[0] as NonNullable<typeof toCam>); // types as a cam for the chosen place
        toSegment = toSegment ?? (placeInfo.segmentNames[0] as A_SegmentNameByPlace[T_PlaceName]);

        const foundRuleSegmentName = getSegmentFromStoryRules(toPlace, toCam);

        if (foundRuleSegmentName) {
          toSegment = foundRuleSegmentName;
        }

        return {
          global: {
            main: {
              nextPlaceName: toPlace,
              wantedSegmentWhenNextPlaceLoads: toSegment || nowSegmentName,
            },
          },
          // Note might need to check , if the place rules reacts to nowCamName changing, but maybe shouldnt while changing place
          places: {
            [toPlace]: {
              wantedCamWhenNextPlaceLoads: toCam || newPlaceNowCamName,
            },
          },
          dolls: { [dollName]: { nextSpotName: toSpot } },
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
