import { forEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";

export function get_placeRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type DollName = T_MyTypes["Main"]["DollName"];
  type DollOptions = T_MyTypes["Main"]["DollOptions"];
  type PlaceName = T_MyTypes["Main"]["PlaceName"];
  type WallNameByPlace = T_MyTypes["Main"]["WallNameByPlace"];

  const { placeInfoByName } = prendyAssets;
  const { makeRules } = storeHelpers;

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
