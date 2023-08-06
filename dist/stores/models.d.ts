import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { PrendyAssets, ModelName } from "../declarations";
export default function models<A_PrendyAssets extends PrendyAssets = PrendyAssets, A_ModelName extends ModelName = ModelName>(prendyAssets: A_PrendyAssets): {
    startStates: { [K_ModelName in A_ModelName]: {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    }; };
    state: <T_ModelName extends A_ModelName>(_modelName: T_ModelName) => {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    };
    refs: <T_ModelName_1 extends A_ModelName>(_modelName: T_ModelName_1) => {
        container: AssetContainer | null;
        materialRef: PBRMaterial | null;
        materialRefs: PBRMaterial[] | null;
    };
};
