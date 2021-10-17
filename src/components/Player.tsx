import { breakableForEach } from "shutils/dist/loops";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConcepFuncs";
import { makeSceneStoryHelpers } from "../utils/story/helpers/scene";

export function makePlayer<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped,
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
  concepFuncs: ConcepFuncs,
  backdopStartOptions: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[]
) {
  // type AnyToPlaceOption = {
  //   toPlace: PlaceName;
  //   toSpot: AnySpotName;
  //   toCam?: AnyCameraName;
  //   toSegment?: AnySegmentName;
  // };
  // type DoorsInfoLoose = Partial<
  //   Record<PlaceName, Partial<Record<AnyTriggerName, AnyToPlaceOption>>>
  // >;
  // type AnyToPlaceOption = {
  //   toPlace: PlaceName;
  //   toSpot: string;
  //   toCam?: string;
  //   toSegment?: string;
  // };

  type ToPlaceOption<T_PlaceName extends PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: CameraNameByPlace[T_PlaceName];
    toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  type DoorsInfoLoose = Partial<
    Record<PlaceName, Partial<Record<string, ToPlaceOption<PlaceName>>>>
  >;

  const {
    useStoreItemPropsEffect,
    getState,
    setState,
    useStore,
  } = concepFuncs;

  const { goToNewPlace } = makeSceneStoryHelpers<
    ConcepFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace
  >(concepFuncs, placeInfoByName, characterNames);

  type Props = {};

  return function Player(_props: Props) {
    const { playerCharacter: charName } = useStore(
      ({ global: { main } }) => main,
      {
        type: "global",
        name: "main",
        prop: ["playerCharacter"],
      }
    );

    // TODO Move to story dynamic rules for the player character ?
    useStoreItemPropsEffect(
      { type: "characters", name: charName },
      {
        atTriggers({ newValue: atTriggers }) {
          const { nowPlaceName } = getState().global.main;
          const { hasLeftFirstTrigger } = getState().characters[charName];

          // -------------------------------------------------------------------------------
          // Other story Triggers
          // if (atTriggers.)
          // -------------------------------------------------------------------------------

          // starting on a trigger
          if (!hasLeftFirstTrigger) {
            // previousValue
            let hasAnyCollision = false;
            breakableForEach(
              placeInfoByName[nowPlaceName].triggerNames,
              (triggerName) => {
                if (atTriggers[triggerName]) {
                  hasAnyCollision = true;
                  return true;
                }
              }
            );
            if (!hasAnyCollision) {
              setState({
                characters: { [charName]: { hasLeftFirstTrigger: true } },
              });
            }
          } else {
            // going to new places at door triggers
            breakableForEach(
              placeInfoByName[nowPlaceName].triggerNames,
              (triggerName) => {
                if (atTriggers[triggerName]) {
                  const toOption = (backdopStartOptions.doorsInfo as DoorsInfoLoose)[
                    nowPlaceName as PlaceName
                  ]?.[triggerName];
                  if (toOption) {
                    goToNewPlace(toOption, charName as CharacterName);

                    return true; // break
                  }
                }
              }
            );
          }
        },
      }
    );

    return null;
  };
}
