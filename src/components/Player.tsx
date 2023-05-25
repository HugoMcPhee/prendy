import { AnyTriggerName, PrendyAssets } from "../declarations";
import { breakableForEach } from "chootils/dist/loops";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import {
  PrendyOptions,
  CameraNameByPlace,
  CharacterName,
  PlaceName,
  SegmentNameByPlace,
  SpotNameByPlace,
} from "../declarations";
import { get_sceneStoryHelpers } from "../helpers/prendyHelpers/scene";

export function get_Player<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { placeInfoByName, characterNames } = prendyAssets;

  type ToPlaceOption<T_PlaceName extends PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: CameraNameByPlace[T_PlaceName];
    toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  type DoorsInfoLoose = Partial<Record<PlaceName, Partial<Record<string, ToPlaceOption<PlaceName>>>>>;

  const { useStoreItemPropsEffect, getState, setState, useStore } = storeHelpers;
  const { goToNewPlace } = get_sceneStoryHelpers<StoreHelpers>(storeHelpers, placeInfoByName, characterNames);

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
            breakableForEach(placeInfoByName[nowPlaceName].triggerNames as AnyTriggerName[], (triggerName) => {
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
            breakableForEach(placeInfoByName[nowPlaceName].triggerNames as AnyTriggerName[], (triggerName) => {
              if (atTriggers[triggerName]) {
                const toOption = (prendyStartOptions.doorsInfo as DoorsInfoLoose)[nowPlaceName as PlaceName]?.[
                  triggerName
                ];
                if (toOption) {
                  goToNewPlace(toOption, charName as CharacterName);
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
