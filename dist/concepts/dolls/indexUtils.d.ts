import { AbstractMesh } from "@babylonjs/core";
import { ModelInfoByNamePlaceholder } from "../typedConcepFuncs";
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
export declare function getDefaultInRangeFunction<DollName extends string>(dollNames: readonly DollName[]): () => Record<DollName, InRangeForDoll>;
export default function makeDollIndexUtils<DollName extends string, ModelName extends string, AnimationNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(dollNames: readonly DollName[], modelInfoByName: ModelInfoByName): {
    makeModelAnimWeightsMoverState: <T_ModelName extends ModelName>(modelName: T_ModelName) => <T_Name extends string, T_PhysicsNames extends string, T_InitialState extends {
        value?: Record<AnimationNameByModel[T_ModelName], number>;
        valueGoal?: Record<AnimationNameByModel[T_ModelName], number>;
        isMoving?: boolean;
        moveConfigName?: T_PhysicsNames;
        moveMode?: import("concep-movers/dist/types").MoveMode;
        moveConfigs?: Record<T_PhysicsNames, import("concep-movers/dist/types").PhysicsOptions>;
    }>(newName: T_Name, initialState?: T_InitialState) => Record<T_Name, Record<AnimationNameByModel[T_ModelName], number>> & import("concep-movers/dist/utils").NewProps<T_Name, Record<AnimationNameByModel[T_ModelName], number>> & (T_InitialState["moveConfigName"] extends undefined ? {} : Record<`${T_Name}MoveConfigName`, T_PhysicsNames>) & (T_InitialState["moveConfigs"] extends undefined ? {} : Record<`${T_Name}MoveConfigs`, Record<T_PhysicsNames, import("concep-movers/dist/types").PhysicsOptions>>);
    modelMoverRefs: <T_ModelName_1 extends ModelName, T_MoverName extends string>(modelName: T_ModelName_1, moverName: T_MoverName) => Record<`${T_MoverName}MoverRefs`, {
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
    modelOtherMeshesRefs: <T_ModelName_2 extends ModelName>(modelName: T_ModelName_2) => Record<MeshNameByModel[T_ModelName_2], AbstractMesh>;
    defaultInRangeForDoll: typeof defaultInRangeForDoll;
    defaultInRange: () => Record<DollName, InRangeForDoll>;
};
