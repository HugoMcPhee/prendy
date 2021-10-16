import { AssetContainer, PBRMaterial } from "@babylonjs/core";
export default function models<ModelName extends string>(modelNames: readonly ModelName[]): {
    startStates: { [K_ModelName in ModelName]: {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    }; };
    state: <T_ModelName extends ModelName>(_modelName: T_ModelName) => {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    };
    refs: <T_ModelName_1 extends ModelName>(_modelName: T_ModelName_1) => {
        container: AssetContainer;
        materialRef: PBRMaterial;
        materialRefs: PBRMaterial[];
    };
};
