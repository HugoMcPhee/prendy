import delay from "delay";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  GameyConceptoFuncs,
  PlaceInfoByNamePlaceholder,
} from "../../../concepts/typedConceptoFuncs";
import { makeSetStoryState } from "../../../storyRuleMakers";
import { makeCharacterStoryUtils } from "../utils/characters";
import { makeSceneStoryUtils } from "../utils/scene";

export function makeSceneStoryHelpers<
  ConceptoFuncs extends GameyConceptoFuncs,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  CharacterName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  WallNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[]
) {
  const { getRefs, getState, onNextTick, setState } = conceptoFuncs;

  type CameraNameFromPlace<
    T_Place extends keyof PlaceInfoByName
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type ToPlaceOption<T_PlaceName extends PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: CameraNameByPlace[T_PlaceName];
    toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  const { setGlobalState } = makeGlobalStoreUtils(conceptoFuncs);

  const getCharDollStuff = makeGetCharDollStuff<ConceptoFuncs, CharacterName>(
    conceptoFuncs
  );

  const setStoryState = makeSetStoryState(conceptoFuncs);

  const { get2DAngleFromCharacterToSpot } = makeCharacterStoryUtils<
    ConceptoFuncs,
    PlaceName,
    CharacterName,
    SpotNameByPlace
  >(conceptoFuncs);

  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
  } = makeSceneStoryUtils<
    ConceptoFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CameraNameByPlace
  >(conceptoFuncs);

  async function changeSegmentAtLoop<
    T_Place extends PlaceName,
    T_Segment extends SegmentNameByPlace[T_Place] & AnySegmentName // NOTE & might mes with the tye here
  >(_place: T_Place, newSegmentName: T_Segment) {
    // NOTE WARNING This will probably break if wantedSegmentNameAtLoop changes from somewhere else!!!
    // to fix: could listen to changes to wantedSegmentNameAtLoop
    // FIXME this can not work? (the async resolve part)
    return new Promise<void>((resolve, _reject) => {
      onNextTick(() => {
        setGlobalState((state) => {
          const { wantedSegmentNameAtLoop } = state;
          if (wantedSegmentNameAtLoop) {
            // TEMP resolve straight away if there's already a wantedSegmentNameAtLoop
            console.error(
              "there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync"
            );
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
    T_Place extends PlaceName,
    T_Cam extends CameraNameFromPlace<T_Place> & AnyCameraName // NOTE new & type
  >(_place: T_Place, newCamName: T_Cam) {
    return new Promise<void>((resolve, _reject) => {
      setState((state) => {
        const { nowPlaceName } = state.global.main;
        const { wantedCamNameAtLoop } = state.places[nowPlaceName];
        if (wantedCamNameAtLoop) {
          // TEMP resolve straight away if there's already a wantedCamNameAtLoop
          console.error(
            "there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync"
          );
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

  function lookAtSpot<T_Place extends PlaceName>(
    place: T_Place,
    spot: SpotNameByPlace[T_Place],
    character?: CharacterName
  ) {
    const { playerCharacter } = getState().global.main;
    const editedCharacter = character ?? (playerCharacter as CharacterName);
    const charDollStuff = getCharDollStuff(editedCharacter);
    const { dollName } = charDollStuff;

    const angle = get2DAngleFromCharacterToSpot(editedCharacter, place, spot);
    setState({ dolls: { [dollName]: { rotationYGoal: angle } } });
  }

  function hideWallIf<
    T_Place extends PlaceName,
    T_Wall extends WallNameByPlace[T_Place]
  >(placeName: T_Place, wallName: T_Wall, isDisabled: boolean) {
    const placeRefs = getRefs().places[placeName];
    const wallMesh = placeRefs.wallMeshes[wallName];

    if (wallMesh) wallMesh.checkCollisions = !isDisabled;
  }

  function setNextSegment<
    T_Place extends PlaceName,
    T_Segment extends SegmentNameByPlace[T_Place]
  >(_placeName: T_Place, segmentName: T_Segment) {
    setGlobalState({ wantedSegmentName: segmentName });
  }

  async function showStoryView(isVisible: boolean = true) {
    const GUESSED_FADE_TIME = 1000; // note could listen to something like isFullyFaded and return here, but maybe a set time is okay
    setStoryState({ storyOverlayToggled: !isVisible });
    await delay(GUESSED_FADE_TIME);
  }

  function setCamera<
    T_Place extends PlaceName,
    T_Cam extends CameraNameFromPlace<T_Place> & AnyCameraName // NOTE & Type
  >(_place: T_Place, newCam: T_Cam) {
    const { nowPlaceName } = getState().global.main;
    setState({
      places: {
        [nowPlaceName]: { wantedCamNameAtLoop: newCam }, // AnyCameraName needed if there's only 1 place
      },
    });
  }

  function goToNewPlace<T_PlaceName extends PlaceName>(
    toOption: ToPlaceOption<T_PlaceName>,
    charName: CharacterName = characterNames[0]
  ) {
    let { toSpot, toPlace, toCam, toSegment } = toOption;
    const { dollName } = getCharDollStuff(charName) ?? {};
    if (!dollName) return;

    onNextTick(() => {
      setState((state) => {
        const newPlaceNowCamName = state.places[toPlace].nowCamName;
        const nowSegmentName = state.global.main.nowSegmentName;

        const placeInfo = placeInfoByName[toPlace];
        toSpot =
          toSpot ?? (placeInfo.spotNames[0] as SpotNameByPlace[T_PlaceName]);
        toCam =
          toCam ?? (placeInfo.cameraNames[0] as NonNullable<typeof toCam>); // types as a cam for the chosen place
        toSegment =
          toSegment ??
          (placeInfo.segmentNames[0] as SegmentNameByPlace[T_PlaceName]);

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
    changeSegmentAtLoop,
    changeCameraAtLoop,
    lookAtSpot,
    hideWallIf,
    setNextSegment,
    showStoryView,
    setCamera,
    goToNewPlace,
  };
}
