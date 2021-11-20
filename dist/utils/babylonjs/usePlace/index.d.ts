import { BackdopArt, BackdopOptions, ModelInfoByName } from "../../..//declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeUsePlace<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, A_BackdopOptions extends BackdopOptions = BackdopOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName>(concepFuncs: ConcepFuncs, backdopStartOptions: A_BackdopOptions, backdopArt: BackdopArt): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
