import { AbstractMesh } from "@babylonjs/core";
import { BackdopArt, DollName } from "../../declarations";
export declare type InRangeForDoll = {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
export declare function defaultInRangeForDoll(): {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
declare type InRangeForAllDolls = Record<DollName, InRangeForDoll>;
export declare function getDefaultInRangeFunction(dollNames: readonly DollName[]): () => InRangeForAllDolls;
export default function makeDollIndexUtils(backdopArt: BackdopArt): {
    makeModelAnimWeightsMoverState: <T_ModelName extends string>(modelName: T_ModelName) => <T_Name extends string, T_PhysicsNames extends string, T_InitialState extends {
        value?: Record<any, number> | undefined;
        valueGoal?: Record<any, number> | undefined;
        isMoving?: boolean | undefined;
        moveConfigName?: T_PhysicsNames | undefined;
        moveMode?: import("concep-movers/dist/types").MoveMode | undefined;
        moveConfigs?: Record<T_PhysicsNames, import("concep-movers/dist/types").PhysicsOptions> | undefined;
    }>(newName: T_Name, initialState?: T_InitialState | undefined) => Record<T_Name, Record<any, number>> & import("concep-movers/dist/utils").NewProps<T_Name, Record<any, number>> & (T_InitialState["moveConfigName"] extends undefined ? {} : Record<`${T_Name}MoveConfigName`, T_PhysicsNames>) & (T_InitialState["moveConfigs"] extends undefined ? {} : Record<`${T_Name}MoveConfigs`, Record<T_PhysicsNames, import("concep-movers/dist/types").PhysicsOptions>>);
    modelMoverRefs: <T_ModelName_1 extends string, T_MoverName extends string>(modelName: T_ModelName_1, moverName: T_MoverName) => Record<`${T_MoverName}MoverRefs`, {
        stateNames: {
            value: T_MoverName;
            valueGoal: `${T_MoverName}Goal`;
            isMoving: `${T_MoverName}IsMoving`;
            moveMode: `${T_MoverName}MoveMode`;
            physicsConfigName: `${T_MoverName}MoveConfigName`;
            physicsConfigs: `${T_MoverName}MoveConfigs`;
        };
        physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
        animRefs: Record<string, {
            velocity: number;
            recentSpeeds: number[];
        }>;
        animNames: readonly string[];
    }>;
    modelOtherMeshesRefs: <T_ModelName_2 extends string>(modelName: T_ModelName_2) => Record<any, AbstractMesh | null>;
    defaultInRangeForDoll: typeof defaultInRangeForDoll;
    defaultInRange: () => Record<string, InRangeForDoll>;
};
export {};
