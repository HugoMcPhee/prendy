import { forEach } from "chootils/dist/loops";
export function get_placeRules(prendyStartOptions, storeHelpers, prendyStores, prendyAssets) {
    const { placeInfoByName } = prendyAssets;
    const { makeRules, getPreviousState, getState, setState, getRefs } = storeHelpers;
    return makeRules(({ itemEffect, effect }) => ({
        whenToggledWallsChanges: itemEffect({
            run({ newValue: toggledWalls, itemName: placeName, itemRefs }) {
                const { wallMeshes } = itemRefs;
                if (!wallMeshes)
                    return;
                const placeInfo = placeInfoByName[placeName];
                const typedWallNames = placeInfo.wallNames;
                forEach(typedWallNames, (wallName) => {
                    const newToggle = toggledWalls[wallName];
                    const wallMesh = wallMeshes[wallName];
                    // if (wallMesh && newToggle !== undefined) wallMesh.setEnabled(newToggle);
                    if (wallMesh && newToggle !== undefined)
                        wallMesh.checkCollisions = newToggle;
                });
            },
            check: { type: "places", prop: "toggledWalls" },
            step: "default",
            atStepEnd: true,
        }),
    }));
}
