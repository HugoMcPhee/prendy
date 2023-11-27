import { Vector3 } from "@babylonjs/core";
import React, { Suspense } from "react";
import { usePlace } from "../helpers/babylonjs/usePlace/usePlace";
import { Player } from "./Player";
import { meta } from "../meta";
function Place({ name }) {
    usePlace(name);
    return null;
}
export function LoadingModels({ children }) {
    const { useStore } = meta.repond;
    const { nowPlaceName } = useStore(({ global: { main } }) => main, {
        type: "global",
        name: "main",
        prop: ["nowPlaceName"],
    });
    return (React.createElement(Suspense, { fallback: React.createElement("sphere", { name: "sphere1", diameter: 2, segments: 16, position: new Vector3(0, 1, 0) }) },
        React.createElement(Player, null),
        React.createElement(Place, { name: nowPlaceName, key: nowPlaceName }),
        children));
}
