import { forEach } from "chootils/dist/loops";
import {
  DollName,
  DollOptions,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  WallNameByPlace,
} from "../declarations";

export function get_placeRules(
  prendyStartOptions: PrendyOptions,
  storeHelpers: PrendyStoreHelpers,
  prendyStores: PrendyStores,
  prendyAssets: PrendyAssets
) {
  const { placeInfoByName } = prendyAssets;
  const { makeRules, getPreviousState, getState, setState, getRefs } = storeHelpers;

  type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

  return makeRules(({ itemEffect, effect }) => ({
    whenToggledWallsChanges: itemEffect({
      run({ newValue: toggledWalls, itemName: placeName, itemRefs }) {
        const { wallMeshes } = itemRefs;
        if (!wallMeshes) return;

        type WallNameFromPlace<T_PlaceName extends PlaceName> = WallNameByPlace[T_PlaceName]; // NOTE Maybe this isn't needed

        const placeInfo = placeInfoByName[placeName as unknown as PlaceName];
        const typedWallNames = placeInfo.wallNames as unknown as WallNameFromPlace<typeof placeName>[];

        forEach(typedWallNames, (wallName) => {
          const newToggle = toggledWalls[wallName];
          const wallMesh = wallMeshes[wallName];

          // if (wallMesh && newToggle !== undefined) wallMesh.setEnabled(newToggle);
          if (wallMesh && newToggle !== undefined) wallMesh.checkCollisions = newToggle;
        });
      },
      check: { type: "places", prop: "toggledWalls" },
      step: "default",
      atStepEnd: true,
    }),
  }));
}
