import { Vector3 } from "@babylonjs/core";
import React, { Suspense } from "react";
import { makeUsePlace } from "../utils/babylonjs/usePlace";
import { makePlayer } from "./Player";
export function makeLoadingModels(concepFuncs, backdopConcepts, backdopStartOptions, placeInfoByName, characterNames, dollNames, soundFiles, extraStuff) {
    const { useStore } = concepFuncs;
    const Player = makePlayer(concepFuncs, backdopStartOptions, placeInfoByName, characterNames);
    const usePlace = makeUsePlace(concepFuncs, backdopStartOptions, placeInfoByName, dollNames, soundFiles);
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
