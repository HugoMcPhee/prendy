import { breakableForEach } from "chootils/dist/loops";
import {
  AnyCameraName,
  AnySegmentName,
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceInfoByName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../declarations";
import { get_sceneStoryHelpers } from "../helpers/prendyHelpers/scene";

export function get_Player<
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(storeHelpers: A_PrendyStoreHelpers, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets) {
  const { placeInfoByName, characterNames } = prendyAssets;

  type ToPlaceOption<T_PlaceName extends A_PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: A_SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: A_CameraNameByPlace[T_PlaceName];
    toSegment?: A_SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  type DoorsInfoLoose = Partial<Record<A_PlaceName, Partial<Record<string, ToPlaceOption<A_PlaceName>>>>>;

  const { useStoreItemPropsEffect, getState, setState, useStore } = storeHelpers;
  const { goToNewPlace } = get_sceneStoryHelpers<
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_DollName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SegmentNameByPlace,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(storeHelpers, placeInfoByName as A_PlaceInfoByName, characterNames as A_CharacterName[]);

  type Props = {};

  return function Player(_props: Props) {
    const { playerCharacter: charName } = useStore(({ global: { main } }) => main, {
      type: "global",
      name: "main",
      prop: ["playerCharacter"],
    });

    // TODO Move to story dynamic rules for the player character ?
    useStoreItemPropsEffect(
      { type: "characters", name: charName },
      {
        atTriggers({ newValue: atTriggers }) {
          // if atTriggers changes, respond here

          const { nowPlaceName } = getState().global.main;
          const { hasLeftFirstTrigger } = getState().characters[charName];

          // When starting on a trigger, mark when they have left the first trigger
          if (!hasLeftFirstTrigger) {
            let hasAnyCollision = false;
            breakableForEach(placeInfoByName[nowPlaceName].triggerNames as A_AnyTriggerName[], (triggerName) => {
              if (atTriggers[triggerName]) {
                hasAnyCollision = true;
                return true;
              }
            });
            if (!hasAnyCollision) {
              setState({ characters: { [charName]: { hasLeftFirstTrigger: true } } });
            }
          } else {
            // If has left the first trigger
            // Check for going to new places at door triggers

            // TODO move to a rule
            breakableForEach(placeInfoByName[nowPlaceName].triggerNames as A_AnyTriggerName[], (triggerName) => {
              if (atTriggers[triggerName]) {
                const toOption = (prendyStartOptions.doorsInfo as DoorsInfoLoose)[nowPlaceName as A_PlaceName]?.[
                  triggerName
                ];
                if (toOption) {
                  goToNewPlace(toOption, charName as A_CharacterName);
                  return true; // break
                }
              }
            });
          }
        },
      }
    );

    return null;
  };
}
