import { PrendyArt, PrendyOptions, ModelInfoByName } from "../../..//declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeUsePlace<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName>(concepFuncs: ConcepFuncs, prendyStartOptions: A_PrendyOptions, prendyArt: PrendyArt): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
