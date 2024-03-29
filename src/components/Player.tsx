import { breakableForEach } from "chootils/dist/loops";
import { goToNewPlace } from "../helpers/prendyHelpers/scene";
import { meta } from "../meta";
import { useStore, useStoreItemPropsEffect, getState, setState } from "repond";
import {
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  PlaceName,
  SegmentNameByPlace,
  SpotNameByPlace,
} from "../types";

type ToPlaceOption<T_PlaceName extends PlaceName> = {
  toPlace: T_PlaceName;
  toSpot: SpotNameByPlace[T_PlaceName];
  // NOTE might be able to make this auto if the first spot is inside a cam collider?
  toCam?: CameraNameByPlace[T_PlaceName];
  toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
};

type DoorsInfoLoose = Partial<Record<PlaceName, Partial<Record<string, ToPlaceOption<PlaceName>>>>>;

type Props = {};

export function Player(_props: Props) {
  const { placeInfoByName, prendyOptions } = meta.assets!;

  const { playerCharacter: charName } = useStore(({ global: { main } }) => main, {
    type: "global",
    id: "main",
    prop: ["playerCharacter"],
  });

  // TODO Move to story dynamic rules for the player character ?
  useStoreItemPropsEffect(
    { type: "characters", id: charName },
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
}
