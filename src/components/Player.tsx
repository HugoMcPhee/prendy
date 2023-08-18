import { breakableForEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";
import { get_sceneStoryHelpers } from "../helpers/prendyHelpers/scene";

export function get_Player<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type AnyTriggerName = T_MyTypes["Main"]["AnyTriggerName"];
  type CameraNameByPlace = T_MyTypes["Main"]["CameraNameByPlace"];
  type CharacterName = T_MyTypes["Main"]["CharacterName"];
  type PlaceInfoByName = T_MyTypes["Main"]["PlaceInfoByName"];
  type PlaceName = T_MyTypes["Main"]["PlaceName"];
  type SegmentNameByPlace = T_MyTypes["Main"]["SegmentNameByPlace"];
  type SpotNameByPlace = T_MyTypes["Main"]["SpotNameByPlace"];

  const { placeInfoByName, characterNames, prendyOptions } = prendyAssets;

  type ToPlaceOption<T_PlaceName extends PlaceName> = {
    toPlace: T_PlaceName;
    toSpot: SpotNameByPlace[T_PlaceName];
    // NOTE might be able to make this auto if the first spot is inside a cam collider?
    toCam?: CameraNameByPlace[T_PlaceName];
    toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
  };

  type DoorsInfoLoose = Partial<Record<PlaceName, Partial<Record<string, ToPlaceOption<PlaceName>>>>>;

  const { useStoreItemPropsEffect, getState, setState, useStore } = storeHelpers;
  const { goToNewPlace } = get_sceneStoryHelpers<T_MyTypes>(prendyAssets, storeHelpers);

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
                const toOption = (prendyOptions.doorsInfo as DoorsInfoLoose)[nowPlaceName as PlaceName]?.[triggerName];
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
