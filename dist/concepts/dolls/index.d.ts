import { AbstractMesh, AnimationGroup, Bone, InstantiatedEntries, Material, Skeleton } from "@babylonjs/core";
import { AnimationNameByModel, BackdopArt, BoneNameByModel, MaterialNameByModel, MeshNameByModel } from "../../declarations";
export default function dolls(backdopArt: BackdopArt): {
    startStates: {
        [x: string]: {
            nowAnimation: string;
            animationLoops: boolean;
            inRange: Record<string, import("./indexUtils").InRangeForDoll>;
            animWeights: Record<any, number>;
            animWeightsGoal: Record<any, number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            positionOnPlaneScene: import("shutils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            position: import("shutils/dist/points3d").Point3D;
            positionGoal: import("shutils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("concep-movers/dist/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            modelName: any;
            nextSpotName: string | null;
        };
    };
    state: <T_DollName extends string, T_ModelName extends string>(_dollName: T_DollName, modelName?: T_ModelName | undefined) => {
        nowAnimation: string;
        animationLoops: boolean;
        inRange: Record<string, import("./indexUtils").InRangeForDoll>;
        animWeights: Record<any, number>;
        animWeightsGoal: Record<any, number>;
        animWeightsIsMoving: boolean;
        animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
        animWeightsMoveConfigName: string;
        animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        positionOnPlaneScene: import("shutils/dist/points2d").Point2D;
        rotationY: number;
        rotationYGoal: number;
        rotationYIsMoving: boolean;
        rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
        rotationYMoveConfigName: string;
        rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        position: import("shutils/dist/points3d").Point3D;
        positionGoal: import("shutils/dist/points3d").Point3D;
        positionIsMoving: boolean;
        positionMoveMode: import("concep-movers/dist/types").MoveMode;
        positionMoveConfigName: string;
        positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        modelName: NonNullable<T_ModelName>;
        nextSpotName: string | null;
    };
    refs: <T_DollName_1 extends string, T_ModelName_1 extends string>(dollName: T_DollName_1, itemState: {
        nowAnimation: string;
        animationLoops: boolean;
        inRange: Record<string, import("./indexUtils").InRangeForDoll>;
        animWeights: Record<any, number>;
        animWeightsGoal: Record<any, number>;
        animWeightsIsMoving: boolean;
        animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
        animWeightsMoveConfigName: string;
        animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        positionOnPlaneScene: import("shutils/dist/points2d").Point2D;
        rotationY: number;
        rotationYGoal: number;
        rotationYIsMoving: boolean;
        rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
        rotationYMoveConfigName: string;
        rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        position: import("shutils/dist/points3d").Point3D;
        positionGoal: import("shutils/dist/points3d").Point3D;
        positionIsMoving: boolean;
        positionMoveMode: import("concep-movers/dist/types").MoveMode;
        positionMoveConfigName: string;
        positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
        modelName: NonNullable<T_ModelName_1>;
        nextSpotName: string | null;
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
            physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
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
            physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
        };
        positionMoverRefs: {
            velocity: import("shutils/dist/points3d").Point3D;
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
            physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
        };
        meshRef: AbstractMesh | null;
        otherMeshes: Record<any, AbstractMesh | null>;
        entriesRef: InstantiatedEntries | null;
        aniGroupsRef: Record<any, AnimationGroup> | null;
        assetRefs: {
            meshes: Record<any, AbstractMesh>;
            skeleton: Skeleton;
            bones: Record<any, Bone>;
            aniGroups: Record<any, AnimationGroup>;
            materials: Record<any, Material>;
        } | null;
        groundRef: AbstractMesh | null;
        checkCollisions: boolean;
    };
};
