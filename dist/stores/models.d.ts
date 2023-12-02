import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { MyTypes } from "../declarations";
export default function models<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    startStates: { [K_ModelName in T_MyTypes["Types"]["ModelName"]]: {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    }; };
    state: <T_ModelName extends T_MyTypes["Types"]["ModelName"]>(_modelName: T_ModelName) => {
        wantToLoad: boolean;
        isLoading: boolean;
        isLoaded: boolean;
    };
    refs: <T_ModelName_1 extends T_MyTypes["Types"]["ModelName"]>(_modelName: T_ModelName_1) => {
        container: AssetContainer | null;
        materialRef: PBRMaterial | null;
        materialRefs: PBRMaterial[] | null;
    };
};
