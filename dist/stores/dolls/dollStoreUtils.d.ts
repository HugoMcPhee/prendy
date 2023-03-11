import { AbstractMesh } from "@babylonjs/core";
import { PrendyAssets } from "../../declarations";
import { defaultInRangeForDoll, InRangeForDoll } from "../../helpers/prendyUtils/dolls";
export default function get_dollStoreUtils(prendyAssets: PrendyAssets): {
    makeModelAnimWeightsMoverState: <T_ModelName extends string>(modelName: T_ModelName) => <T_Name extends string, T_PhysicsNames extends string, T_InitialState extends {
        value?: Record<string, number> | undefined;
        valueGoal?: Record<string, number> | undefined;
        isMoving?: boolean | undefined;
        moveConfigName?: T_PhysicsNames | undefined;
        moveMode?: import("pietem-movers/dist/types").MoveMode | undefined;
        moveConfigs?: Record<T_PhysicsNames, import("pietem-movers/dist/types").PhysicsOptions> | undefined;
    }>(newName: T_Name, initialState?: T_InitialState | undefined) => Record<T_Name, Record<string, number>> & import("pietem-movers/dist/utils").NewProps<T_Name, Record<string, number>> & (T_InitialState["moveConfigName"] extends undefined ? {} : Record<`${T_Name}MoveConfigName`, T_PhysicsNames>) & (T_InitialState["moveConfigs"] extends undefined ? {} : Record<`${T_Name}MoveConfigs`, Record<T_PhysicsNames, import("pietem-movers/dist/types").PhysicsOptions>>);
    modelMoverRefs: <T_ModelName_1 extends string, T_MoverName extends string>(modelName: T_ModelName_1, moverName: T_MoverName) => Record<`${T_MoverName}MoverRefs`, {
        stateNames: {
            value: T_MoverName;
            valueGoal: `${T_MoverName}Goal`;
            isMoving: `${T_MoverName}IsMoving`;
            moveMode: `${T_MoverName}MoveMode`;
            physicsConfigName: `${T_MoverName}MoveConfigName`;
            physicsConfigs: `${T_MoverName}MoveConfigs`;
        };
        physicsConfigs: import("pietem-movers/dist/types").DefinedPhysicsConfig;
        animRefs: Record<string, {
            velocity: number;
            recentSpeeds: number[];
        }>;
        animNames: readonly string[];
    }>;
    modelOtherMeshesRefs: <T_ModelName_2 extends string>(modelName: T_ModelName_2) => Record<string, AbstractMesh | null>;
    defaultInRangeForDoll: typeof defaultInRangeForDoll;
    defaultInRange: () => Record<string, InRangeForDoll>;
};
