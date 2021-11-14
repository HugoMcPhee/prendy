import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { SpotNameByPlace } from "../../../declarations";
export declare function makeSpotStoryUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    getSpotPosition: <T_Place extends string>(place: T_Place, spot: string) => any;
    getSpotRotation: <T_Place_1 extends string>(place: T_Place_1, spot: string) => any;
};
