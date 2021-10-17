import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeSpotStoryUtils<ConcepFuncs extends BackdopConcepFuncs, PlaceName extends string, SpotNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs): {
    getSpotPosition: <T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]) => any;
    getSpotRotation: <T_Place_1 extends PlaceName>(place: T_Place_1, spot: SpotNameByPlace[T_Place_1]) => any;
};
