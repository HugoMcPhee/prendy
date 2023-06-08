import { AbstractMesh, AnimationGroup, Bone, InstantiatedEntries, Material, Skeleton } from "@babylonjs/core";
import { AnimationNameByModel, BoneNameByModel, MaterialNameByModel, MeshNameByModel, PrendyAssets } from "../../declarations";
export default function dolls(prendyAssets: PrendyAssets): {
    startStates: {
        [x: string]: {
            nowAnimation: string;
            animationLoops: boolean;
            inRange: Record<string, import("../../helpers/prendyUtils/dolls").InRangeForDoll>;
            animWeights: Record<string, number>;
            animWeightsGoal: Record<string, number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("repond-movers/dist/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            positionOnScreen: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("repond-movers/dist/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("repond-movers/dist/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            modelName: any;
            goalSpotName: string | null;
        };
    };
    state: <T_DollName extends string, T_ModelName extends string>(_dollName: T_DollName, modelName?: T_ModelName | undefined) => {
        nowAnimation: string;
        animationLoops: boolean;
        inRange: Record<string, import("../../helpers/prendyUtils/dolls").InRangeForDoll>;
        animWeights: Record<string, number>;
        animWeightsGoal: Record<string, number>;
        animWeightsIsMoving: boolean;
        animWeightsMoveMode: import("repond-movers/dist/types").MoveMode;
        animWeightsMoveConfigName: string;
        animWeightsMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        positionOnScreen: import("chootils/dist/points2d").Point2D;
        rotationY: number;
        rotationYGoal: number;
        rotationYIsMoving: boolean;
        rotationYMoveMode: import("repond-movers/dist/types").MoveMode;
        rotationYMoveConfigName: string;
        rotationYMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        position: import("chootils/dist/points3d").Point3D;
        positionGoal: import("chootils/dist/points3d").Point3D;
        positionIsMoving: boolean;
        positionMoveMode: import("repond-movers/dist/types").MoveMode;
        positionMoveConfigName: string;
        positionMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        modelName: NonNullable<T_ModelName>;
        goalSpotName: string | null;
    };
    refs: <T_DollName_1 extends string, T_ModelName_1 extends string>(dollName: T_DollName_1, itemState: {
        nowAnimation: string;
        animationLoops: boolean;
        inRange: Record<string, import("../../helpers/prendyUtils/dolls").InRangeForDoll>;
        animWeights: Record<string, number>;
        animWeightsGoal: Record<string, number>;
        animWeightsIsMoving: boolean;
        animWeightsMoveMode: import("repond-movers/dist/types").MoveMode;
        animWeightsMoveConfigName: string;
        animWeightsMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        positionOnScreen: import("chootils/dist/points2d").Point2D;
        rotationY: number;
        rotationYGoal: number;
        rotationYIsMoving: boolean;
        rotationYMoveMode: import("repond-movers/dist/types").MoveMode;
        rotationYMoveConfigName: string;
        rotationYMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        position: import("chootils/dist/points3d").Point3D;
        positionGoal: import("chootils/dist/points3d").Point3D;
        positionIsMoving: boolean;
        positionMoveMode: import("repond-movers/dist/types").MoveMode;
        positionMoveConfigName: string;
        positionMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        modelName: NonNullable<T_ModelName_1>;
        goalSpotName: string | null;
    }) => {
        animWeightsMoverRefs: {
            stateNames: {
                value: "animWeights";
                valueGoal: "animWeightsGoal";
                isMoving: "animWeightsIsMoving";
                moveMode: "animWeightsMoveMode";
                physicsConfigName: "animWeightsMoveConfigName";
                physicsConfigs: "animWeightsMoveConfigs";
            };
            physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
            animRefs: Record<string, {
                velocity: number;
                recentSpeeds: number[];
            }>;
            animNames: readonly string[];
        };
        rotationYMoverRefs: {
            velocity: number;
            recentSpeeds: number[];
            stateNames: {
                value: "rotationY";
                valueGoal: "rotationYGoal";
                isMoving: "rotationYIsMoving";
                moveMode: "rotationYMoveMode";
                physicsConfigName: "rotationYMoveConfigName";
                physicsConfigs: "rotationYMoveConfigs";
            };
            physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
        };
        positionMoverRefs: {
            velocity: import("chootils/dist/points3d").Point3D;
            recentSpeeds: number[];
            averageSpeed: number;
            canRunOnSlow: boolean;
            stateNames: {
                value: "position";
                valueGoal: "positionGoal";
                isMoving: "positionIsMoving";
                moveMode: "positionMoveMode";
                physicsConfigName: "positionMoveConfigName";
                physicsConfigs: "positionMoveConfigs";
            };
            physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
        };
        meshRef: AbstractMesh | null;
        otherMeshes: Record<string, AbstractMesh | null>;
        entriesRef: InstantiatedEntries | null;
        aniGroupsRef: Record<string, AnimationGroup> | null;
        assetRefs: {
            meshes: Record<string, AbstractMesh>;
            skeleton: Skeleton;
            bones: Record<string, Bone>;
            aniGroups: Record<string, AnimationGroup>;
            materials: Record<string, Material>;
        } | null;
        groundRef: AbstractMesh | null;
        checkCollisions: boolean;
    };
};
