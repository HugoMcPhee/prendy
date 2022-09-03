import { Vector3 } from "@babylonjs/core";
import React, { Suspense } from "react";
import { makeTyped_usePlace } from "../utils/babylonjs/usePlace/usePlace";
import { makeTyped_Player } from "./Player";
export function makeTyped_LoadingModels(storeHelpers, prendyStartOptions, prendyAssets) {
    const { useStore } = storeHelpers;
    const Player = makeTyped_Player(storeHelpers, prendyStartOptions, prendyAssets);
    const usePlace = makeTyped_usePlace(storeHelpers, prendyStartOptions, prendyAssets);
    function Place({ name }) {
        usePlace(name);
        return null;
    }
    return function LoadingModels({ children }) {
        const { nowPlaceName } = useStore(({ global: { main } }) => main, {
            type: "global",
            name: "main",
            prop: ["nowPlaceName"],
        });
        return (React.createElement(Suspense, { fallback: React.createElement("sphere", { name: "sphere1", diameter: 2, segments: 16, position: new Vector3(0, 1, 0) }) },
            React.createElement(Player, null),
            React.createElement(Place, { name: nowPlaceName, key: nowPlaceName }),
            children));
    };
}
