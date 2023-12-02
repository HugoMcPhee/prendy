import { AbstractMesh } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
import { InRangeForDoll, defaultInRangeForDoll } from "../../helpers/prendyUtils/dolls";
export default function get_dollStoreUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    makeModelAnimWeightsMoverState: <T_ModelName extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName) => any;
    makeToggledMeshesState: <T_ModelName_1 extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName_1) => Record<T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_1], boolean>;
    modelMoverRefs: <T_ModelName_2 extends T_MyTypes["Types"]["ModelName"], T_MoverName extends string>(modelName: T_ModelName_2, moverName: T_MoverName) => any;
    modelOtherMeshesRefs: <T_ModelName_3 extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName_3) => Record<T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_3], AbstractMesh | null>;
    defaultInRangeForDoll: typeof defaultInRangeForDoll;
    defaultInRange: () => Record<T_MyTypes["Types"]["DollName"], InRangeForDoll>;
};
