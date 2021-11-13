import { BackdopArt, BackdopOptions } from "../../..//declarations";
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeUsePlace<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): <T_PlaceName extends string>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
