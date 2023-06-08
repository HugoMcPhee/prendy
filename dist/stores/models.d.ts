import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { PrendyAssets } from "../declarations";
export default function models(prendyAssets: PrendyAssets): {
    startStates: {
        [x: string]: {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        };
    };
    state: <T_ModelName extends string>(_modelName: T_ModelName) => {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    };
    refs: <T_ModelName_1 extends string>(_modelName: T_ModelName_1) => {
        container: AssetContainer | null;
        materialRef: PBRMaterial | null;
        materialRefs: PBRMaterial[] | null;
    };
};
