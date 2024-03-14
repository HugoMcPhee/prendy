import { forEach } from "chootils/dist/loops";
import { makeEffects } from "repond";
import { meta } from "../meta";
import { PlaceName, WallNameByPlace } from "../types";

export const placeEffects = makeEffects(({ itemEffect, effect }) => ({
  whenToggledWallsChanges: itemEffect({
    run({ newValue: toggledWalls, itemId: placeName, itemRefs }) {
      const { placeInfoByName } = meta.assets!;
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
