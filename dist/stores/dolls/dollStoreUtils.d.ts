import { AbstractMesh } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
import { InRangeForDoll, defaultInRangeForDoll } from "../../helpers/prendyUtils/dolls";
export default function get_dollStoreUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    makeModelAnimWeightsMoverState: <T_ModelName extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName) => <T_Name extends string, T_PhysicsNames extends string, T_InitialState extends {
        value?: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName], number> | undefined;
        valueGoal?: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName], number> | undefined;
        isMoving?: boolean | undefined;
        moveConfigName?: T_PhysicsNames | undefined;
        moveMode?: import("repond-movers/dist/types").MoveMode | undefined;
        moveConfigs?: Record<T_PhysicsNames, import("repond-movers/dist/types").PhysicsOptions> | undefined;
    }>(newName: T_Name, initialState?: T_InitialState | undefined) => Record<T_Name, Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName], number>> & import("repond-movers/dist/utils").NewProps<T_Name, Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName], number>> & (T_InitialState["moveConfigName"] extends undefined ? {} : Record<`${T_Name}MoveConfigName`, T_PhysicsNames>) & (T_InitialState["moveConfigs"] extends undefined ? {} : Record<`${T_Name}MoveConfigs`, Record<T_PhysicsNames, import("repond-movers/dist/types").PhysicsOptions>>);
    makeToggledMeshesState: <T_ModelName_1 extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName_1) => Record<T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_1], boolean>;
    modelMoverRefs: <T_ModelName_2 extends T_MyTypes["Types"]["ModelName"], T_MoverName extends string>(modelName: T_ModelName_2, moverName: T_MoverName) => Record<`${T_MoverName}MoverRefs`, {
        stateNames: {
            value: T_MoverName;
            valueGoal: `${T_MoverName}Goal`;
            isMoving: `${T_MoverName}IsMoving`;
            moveMode: `${T_MoverName}MoveMode`;
            physicsConfigName: `${T_MoverName}MoveConfigName`;
            physicsConfigs: `${T_MoverName}MoveConfigs`;
        };
        physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
        animRefs: Record<string, {
            velocity: number;
            recentSpeeds: number[];
        }>;
        animNames: readonly string[];
    }>;
    modelOtherMeshesRefs: <T_ModelName_3 extends T_MyTypes["Types"]["ModelName"]>(modelName: T_ModelName_3) => Record<T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_3], AbstractMesh | null>;
    defaultInRangeForDoll: typeof defaultInRangeForDoll;
    defaultInRange: () => Record<T_MyTypes["Types"]["DollName"], InRangeForDoll>;
};
