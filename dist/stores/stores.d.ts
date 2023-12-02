/// <reference types="node" />
/// <reference types="react" />
import { MyTypes } from "../declarations";
export declare const prendyStepNames: readonly ["elapsedTimeUpdates", "moverUpdates", "stateVidStateUpdates", "sliceVidStateUpdates", "respondToNewPlace", "respondToNewPlaceStory", "cameraChange", "input", "editPosition", "positionReaction", "checkCollisions", "collisionReaction", "story", "storyReaction", "slatePosition", "slatePositionDontGoOverEdges", "slatePositionStartMovers", "dollAnimation", "dollAnimation2", "dollCorrectRotationAndPosition", "dollAnimationStartMovers", "positionUi", "loadNewPlaceModels", "loadNewPlace", "chooseVideoSlice", "sliceVidWantsToPlay", "sliceVidWantsToPlay2", "safeVidWantsToPlay", "moversGoal", "moversStart", "default", "rendering", "overlay"];
export type PrendyStepName = (typeof prendyStepNames)[number];
export declare function makePrendyStores<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    keyboards: {
        startStates: {
            main: {
                KeyW: boolean;
                KeyA: boolean;
                KeyS: boolean;
                KeyD: boolean;
                ArrowLeft: boolean;
                ArrowRight: boolean;
                ArrowUp: boolean;
                ArrowDown: boolean;
                KeyQ: boolean;
                KeyE: boolean;
                ShiftLeft: boolean;
                ControlLeft: boolean;
                Space: boolean;
                Enter: boolean;
                KeyZ: boolean;
                KeyM: boolean;
                KeyP: boolean;
            };
        };
        state: () => {
            KeyW: boolean;
            KeyA: boolean;
            KeyS: boolean;
            KeyD: boolean;
            ArrowLeft: boolean;
            ArrowRight: boolean;
            ArrowUp: boolean;
            ArrowDown: boolean;
            KeyQ: boolean;
            KeyE: boolean;
            ShiftLeft: boolean;
            ControlLeft: boolean;
            Space: boolean;
            Enter: boolean;
            KeyZ: boolean;
            KeyM: boolean;
            KeyP: boolean;
        };
        refs: () => {};
    };
    miniBubbles: {
        state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
            character?: T_MyTypes["Types"]["CharacterName"] | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: T_MyTypes["Types"]["CharacterName"] | null;
            position: import("chootils/dist/points2d").Point2D;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName in T_MyTypes["Types"]["CharacterName"]]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: T_MyTypes["Types"]["CharacterName"] | null;
            position: import("chootils/dist/points2d").Point2D;
        }; };
    };
    global: {
        startStates: {
            main: {
                slatePosMoveConfigName: string;
                isOnVerticalScreen: boolean;
                zoomMultiplier: number;
                timeScreenResized: number;
                interactButtonPressTime: number;
                heldPickups: T_MyTypes["Types"]["PickupName"][];
                storyOverlayToggled: boolean;
                alarmTextIsVisible: boolean;
                alarmText: string;
                aSpeechBubbleIsShowing: boolean;
                aConvoIsHappening: boolean;
                frameTick: number;
                timeMode: "pause" | "game" | "miniGame";
                elapsedGameTime: number;
                elapsedPauseTime: number;
                elapsedMiniGameTime: number;
                isGamePaused: boolean;
                gameTimeSpeed: number;
                gameIsInBackground: boolean;
                debugMessage: string;
                latestSave: import("./global/global").PrendySaveState | null;
                latestLoadTime: number;
                slateZoom: number;
                slateZoomGoal: number;
                slateZoomIsMoving: boolean;
                slateZoomMoveMode: import("repond-movers/src/types").MoveMode;
                slateZoomMoveConfigName: string;
                slateZoomMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
                slatePos: import("chootils/dist/points2d").Point2D;
                slatePosGoal: import("chootils/dist/points2d").Point2D;
                slatePosIsMoving: boolean;
                slatePosMoveMode: import("repond-movers/src/types").MoveMode;
                slatePosMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
                nowPlaceName: T_MyTypes["Types"]["PlaceName"];
                goalPlaceName: T_MyTypes["Types"]["PlaceName"] | null;
                readyToSwapPlace: boolean;
                isLoadingBetweenPlaces: boolean;
                loadingOverlayToggled: boolean;
                loadingOverlayFullyShowing: boolean;
                goalCamWhenNextPlaceLoads: T_MyTypes["Types"]["AnyCameraName"] | null;
                goalCamNameWhenVidPlays: T_MyTypes["Types"]["AnyCameraName"] | null;
                goalCamNameAtLoop: T_MyTypes["Types"]["AnyCameraName"] | null;
                goalCamName: T_MyTypes["Types"]["AnyCameraName"] | null;
                nowCamName: string;
                nowSegmentName: T_MyTypes["Types"]["AnySegmentName"];
                goalSegmentName: T_MyTypes["Types"]["AnySegmentName"] | null;
                goalSegmentNameAtLoop: T_MyTypes["Types"]["AnySegmentName"] | null;
                goalSegmentNameWhenVidPlays: T_MyTypes["Types"]["AnySegmentName"] | null;
                goalSegmentWhenGoalPlaceLoads: T_MyTypes["Types"]["AnySegmentName"] | null;
                modelNamesLoaded: T_MyTypes["Types"]["ModelName"][];
                newPlaceModelLoaded: boolean;
                newPlaceVideosLoaded: boolean;
                newPlaceProbesLoaded: boolean;
                playerCharacter: T_MyTypes["Types"]["CharacterName"];
                gravityValue: number;
                playerMovingPaused: boolean;
                focusedDoll: any;
                focusedDollIsInView: boolean;
            };
        };
        state: () => {
            slatePosMoveConfigName: string;
            isOnVerticalScreen: boolean;
            zoomMultiplier: number;
            timeScreenResized: number;
            interactButtonPressTime: number;
            heldPickups: T_MyTypes["Types"]["PickupName"][];
            storyOverlayToggled: boolean;
            alarmTextIsVisible: boolean;
            alarmText: string;
            aSpeechBubbleIsShowing: boolean;
            aConvoIsHappening: boolean;
            frameTick: number;
            timeMode: "pause" | "game" | "miniGame";
            elapsedGameTime: number;
            elapsedPauseTime: number;
            elapsedMiniGameTime: number;
            isGamePaused: boolean;
            gameTimeSpeed: number;
            gameIsInBackground: boolean;
            debugMessage: string;
            latestSave: import("./global/global").PrendySaveState | null;
            latestLoadTime: number;
            slateZoom: number;
            slateZoomGoal: number;
            slateZoomIsMoving: boolean;
            slateZoomMoveMode: import("repond-movers/src/types").MoveMode;
            slateZoomMoveConfigName: string;
            slateZoomMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            slatePos: import("chootils/dist/points2d").Point2D;
            slatePosGoal: import("chootils/dist/points2d").Point2D;
            slatePosIsMoving: boolean;
            slatePosMoveMode: import("repond-movers/src/types").MoveMode;
            slatePosMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            nowPlaceName: T_MyTypes["Types"]["PlaceName"];
            goalPlaceName: T_MyTypes["Types"]["PlaceName"] | null;
            readyToSwapPlace: boolean;
            isLoadingBetweenPlaces: boolean;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            goalCamWhenNextPlaceLoads: T_MyTypes["Types"]["AnyCameraName"] | null;
            goalCamNameWhenVidPlays: T_MyTypes["Types"]["AnyCameraName"] | null;
            goalCamNameAtLoop: T_MyTypes["Types"]["AnyCameraName"] | null;
            goalCamName: T_MyTypes["Types"]["AnyCameraName"] | null;
            nowCamName: string;
            nowSegmentName: T_MyTypes["Types"]["AnySegmentName"];
            goalSegmentName: T_MyTypes["Types"]["AnySegmentName"] | null;
            goalSegmentNameAtLoop: T_MyTypes["Types"]["AnySegmentName"] | null;
            goalSegmentNameWhenVidPlays: T_MyTypes["Types"]["AnySegmentName"] | null;
            goalSegmentWhenGoalPlaceLoads: T_MyTypes["Types"]["AnySegmentName"] | null;
            modelNamesLoaded: T_MyTypes["Types"]["ModelName"][];
            newPlaceModelLoaded: boolean;
            newPlaceVideosLoaded: boolean;
            newPlaceProbesLoaded: boolean;
            playerCharacter: T_MyTypes["Types"]["CharacterName"];
            gravityValue: number;
            playerMovingPaused: boolean;
            focusedDoll: any;
            focusedDollIsInView: boolean;
        };
        refs: () => {
            sounds: {
                [x: string]: import("@babylonjs/core").Sound | null;
            };
            music: {
                [x: string]: import("@babylonjs/core").Sound | null;
            };
            musicEffects: {
                lowPass: BiquadFilterNode | null;
                compress: DynamicsCompressorNode | null;
                extraGain: GainNode | null;
            };
            solidParticleSystems: Record<string, import("@babylonjs/core").SolidParticleSystem>;
            timerSpeed: number;
            aConvoIsHappening_timeout: NodeJS.Timeout | null;
            camSegmentRulesOptions: Partial<{ [P_PlaceName in T_MyTypes["Types"]["PlaceName"]]: Partial<keyof T_MyTypes["Types"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"] extends infer T extends keyof T_MyTypes["Types"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"] ? { [P_CamName in T]: (usefulStuff: Record<any, any>) => keyof T_MyTypes["Types"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"][P_CamName]; } : never>; }> | null;
            onPickupButtonClick: ((pickupName: any) => void) | null;
            slateZoomMoverRefs: {
                velocity: number;
                recentSpeeds: number[];
                stateNames: {
                    value: "slateZoom";
                    valueGoal: "slateZoomGoal";
                    isMoving: "slateZoomIsMoving";
                    moveMode: "slateZoomMoveMode";
                    physicsConfigName: "slateZoomMoveConfigName" | undefined;
                    physicsConfigs: "slateZoomMoveConfigs" | undefined;
                };
                physicsConfigs: import("repond-movers/src/types").DefinedPhysicsConfig | undefined;
            };
            slatePosMoverRefs: {
                velocity: import("chootils/dist/points2d").Point2D;
                recentSpeeds: number[];
                averageSpeed: number;
                canRunOnSlow: boolean;
                stateNames: {
                    value: "slatePos";
                    valueGoal: "slatePosGoal";
                    isMoving: "slatePosIsMoving";
                    moveMode: "slatePosMoveMode";
                    physicsConfigName: "slatePosMoveConfigName" | undefined;
                    physicsConfigs: "slatePosMoveConfigs" | undefined;
                };
                physicsConfigs: import("repond-movers/src/types").DefinedPhysicsConfig | undefined;
            };
            scene: import("@babylonjs/core").Scene | null;
            backdropVideoTex: import("../helpers/babylonjs/CustomVideoTexture").CustomVideoTexture | null;
            depthRenderer: import("@babylonjs/core").DepthRenderer | null;
            depthRenderTarget: import("@babylonjs/core").RenderTargetTexture | null;
            backdropPostProcess: import("@babylonjs/core").PostProcess | null;
            backdropPostProcessEffect: import("@babylonjs/core").Effect | null;
            fxaaPostProcess: import("@babylonjs/core").PostProcess | null;
            backdropSize: {
                width: number;
                height: number;
            };
            stretchVideoSize: {
                x: number;
                y: number;
            };
            stretchVideoGoalSize: {
                x: number;
                y: number;
            };
            stretchSceneSize: {
                x: number;
                y: number;
            };
        };
    };
    models: {
        startStates: { [K_ModelName in T_MyTypes["Types"]["ModelName"]]: {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        }; };
        state: <T_ModelName extends T_MyTypes["Types"]["ModelName"]>(_modelName: T_ModelName) => {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        };
        refs: <T_ModelName_1 extends T_MyTypes["Types"]["ModelName"]>(_modelName: T_ModelName_1) => {
            container: import("@babylonjs/core").AssetContainer | null;
            materialRef: import("@babylonjs/core").PBRMaterial | null;
            materialRefs: import("@babylonjs/core").PBRMaterial[] | null;
        };
    };
    dolls: {
        startStates: { [K_DollName in T_MyTypes["Types"]["DollName"]]: {
            toggledMeshes: Record<T_MyTypes["Types"]["MeshNameByModel"][T_MyTypes["Types"]["DollOptions"][K_DollName]["model"]], boolean>;
            nowAnimation: T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][K_DollName]["model"]];
            animationLoops: boolean;
            inRange: Record<T_MyTypes["Types"]["DollName"], import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
            animWeights: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][K_DollName]["model"]], number>;
            animWeightsGoal: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][K_DollName]["model"]], number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("repond-movers/src/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            nowWalkSpeed: number;
            positionOnScreen: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("repond-movers/src/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("repond-movers/src/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            modelName: NonNullable<T_MyTypes["Types"]["DollOptions"][K_DollName]["model"]>;
            goalSpotNameAtNewPlace: T_MyTypes["Types"]["AnySpotName"] | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
        }; };
        state: <T_DollName extends string, T_ModelName_2 extends T_MyTypes["Types"]["ModelName"]>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => {
            toggledMeshes: Record<T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_2], boolean>;
            nowAnimation: T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName_2];
            animationLoops: boolean;
            inRange: Record<T_MyTypes["Types"]["DollName"], import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
            animWeights: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName_2], number>;
            animWeightsGoal: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName_2], number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("repond-movers/src/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            nowWalkSpeed: number;
            positionOnScreen: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("repond-movers/src/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("repond-movers/src/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            modelName: NonNullable<T_ModelName_2>;
            goalSpotNameAtNewPlace: T_MyTypes["Types"]["AnySpotName"] | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
        };
        refs: <T_DollName_1 extends T_MyTypes["Types"]["DollName"], T_ModelName_3 extends T_MyTypes["Types"]["ModelName"]>(dollName: T_DollName_1, itemState: {
            toggledMeshes: Record<T_MyTypes["Types"]["MeshNameByModel"][T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]], boolean>;
            nowAnimation: T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]];
            animationLoops: boolean;
            inRange: Record<T_MyTypes["Types"]["DollName"], import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
            animWeights: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]], number>;
            animWeightsGoal: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]], number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("repond-movers/src/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            nowWalkSpeed: number;
            positionOnScreen: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("repond-movers/src/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("repond-movers/src/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("repond-movers/src/types").PhysicsOptions>;
            modelName: NonNullable<T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]>;
            goalSpotNameAtNewPlace: T_MyTypes["Types"]["AnySpotName"] | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
        }) => {
            animWeightsMoverRefs: {
                stateNames: {
                    value: "animWeights";
                    valueGoal: "animWeightsGoal";
                    isMoving: "animWeightsIsMoving";
                    moveMode: "animWeightsMoveMode";
                    physicsConfigName: "animWeightsMoveConfigName" | undefined;
                    physicsConfigs: "animWeightsMoveConfigs" | undefined;
                };
                physicsConfigs: import("repond-movers/src/types").DefinedPhysicsConfig | undefined;
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
                    physicsConfigName: "rotationYMoveConfigName" | undefined;
                    physicsConfigs: "rotationYMoveConfigs" | undefined;
                };
                physicsConfigs: import("repond-movers/src/types").DefinedPhysicsConfig | undefined;
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
                    physicsConfigName: "positionMoveConfigName" | undefined;
                    physicsConfigs: "positionMoveConfigs" | undefined;
                };
                physicsConfigs: import("repond-movers/src/types").DefinedPhysicsConfig | undefined;
            };
            meshRef: import("@babylonjs/core").AbstractMesh | null;
            otherMeshes: Record<T_MyTypes["Types"]["MeshNameByModel"][NonNullable<T_MyTypes["Types"]["DollOptions"][T_DollName_1]["model"]>], import("@babylonjs/core").AbstractMesh | null>;
            entriesRef: import("@babylonjs/core").InstantiatedEntries | null;
            aniGroupsRef: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName_3], import("@babylonjs/core").AnimationGroup> | null;
            assetRefs: {
                meshes: Record<"__root__" | T_MyTypes["Types"]["MeshNameByModel"][T_ModelName_3], import("@babylonjs/core").AbstractMesh>;
                skeleton: import("@babylonjs/core").Skeleton;
                bones: Record<T_MyTypes["Types"]["BoneNameByModel"][T_ModelName_3], import("@babylonjs/core").Bone>;
                aniGroups: Record<T_MyTypes["Types"]["AnimationNameByModel"][T_ModelName_3], import("@babylonjs/core").AnimationGroup>;
                materials: Record<T_MyTypes["Types"]["MaterialNameByModel"][T_ModelName_3], import("@babylonjs/core").Material>;
            } | null;
            groundRef: import("@babylonjs/core").AbstractMesh | null;
            canGoThroughWalls: boolean;
        };
    };
    characters: {
        startStates: { [K_CharacterName_1 in T_MyTypes["Types"]["CharacterName"]]: {
            dollName: T_MyTypes["Types"]["CharacterOptions"][K_CharacterName_1]["doll"];
            atTriggers: Partial<Record<T_MyTypes["Types"]["AnyTriggerName"], boolean>>;
            atCamCubes: Partial<Record<T_MyTypes["Types"]["AnyCameraName"], boolean>>;
            hasLeftFirstTrigger: boolean;
        }; };
        state: <T_CharacterName extends string, T_DollName_2 extends T_MyTypes["Types"]["DollName"]>(_characterName: T_CharacterName, dollName?: T_DollName_2 | undefined) => {
            dollName: T_DollName_2;
            atTriggers: Partial<Record<T_MyTypes["Types"]["AnyTriggerName"], boolean>>;
            atCamCubes: Partial<Record<T_MyTypes["Types"]["AnyCameraName"], boolean>>;
            hasLeftFirstTrigger: boolean;
        };
        refs: <T_CharacterName_1 extends string>(_characterName: T_CharacterName_1) => {
            testRef: null;
        };
    };
    players: {
        startStates: {
            main: {
                lastSafeInputAngle: number | null;
                inputVelocity: import("chootils/dist/points2d").Point2D;
                isJumping: boolean;
                isOnGround: boolean;
                canJump: boolean;
                interactButtonPressTime: number;
                jumpButtonPressTime: number;
                jumpButtonReleaseTime: number;
                pickupButtonPressTime: number;
                virtualControlsPressTime: number;
                virtualControlsReleaseTime: number;
                canShowVirtualButtons: boolean;
                animationNames: {
                    walking: T_MyTypes["Types"]["AnyAnimationName"];
                    idle: T_MyTypes["Types"]["AnyAnimationName"];
                };
            };
        };
        state: () => {
            lastSafeInputAngle: number | null;
            inputVelocity: import("chootils/dist/points2d").Point2D;
            isJumping: boolean;
            isOnGround: boolean;
            canJump: boolean;
            interactButtonPressTime: number;
            jumpButtonPressTime: number;
            jumpButtonReleaseTime: number;
            pickupButtonPressTime: number;
            virtualControlsPressTime: number;
            virtualControlsReleaseTime: number;
            canShowVirtualButtons: boolean;
            animationNames: {
                walking: T_MyTypes["Types"]["AnyAnimationName"];
                idle: T_MyTypes["Types"]["AnyAnimationName"];
            };
        };
        refs: () => {
            topWalkSpeed: number;
            canJumpTimeout: NodeJS.Timeout | null;
            canShowVirtualButtonsTimeout: NodeJS.Timeout | null;
            canHideVirtualButtonsTimeout: NodeJS.Timeout | null;
        };
    };
    speechBubbles: {
        state: <T_ItemName_1 extends string>(_itemName: T_ItemName_1, options?: {
            font?: T_MyTypes["Types"]["FontName"] | undefined;
            character?: T_MyTypes["Types"]["CharacterName"] | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: T_MyTypes["Types"]["CharacterName"] | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: T_MyTypes["Types"]["SpeechVidName"] | null;
            font: T_MyTypes["Types"]["FontName"];
            zIndex: number;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            currentTimeout: NodeJS.Timeout | null;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName_2 in T_MyTypes["Types"]["CharacterName"]]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: T_MyTypes["Types"]["CharacterName"] | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: T_MyTypes["Types"]["SpeechVidName"] | null;
            font: T_MyTypes["Types"]["FontName"];
            zIndex: number;
        }; };
    };
    places: {
        startStates: { [K_PlaceName in T_MyTypes["Types"]["PlaceName"]]: {
            toggledWalls: Record<T_MyTypes["Types"]["WallNameByPlace"][K_PlaceName], boolean>;
        }; };
        state: <K_PlaceName_1 extends T_MyTypes["Types"]["PlaceName"]>(itemName: string | K_PlaceName_1) => {
            toggledWalls: Record<T_MyTypes["Types"]["WallNameByPlace"][T_MyTypes["Types"]["PlaceName"]], boolean>;
        };
        refs: <K_PlaceName_2 extends T_MyTypes["Types"]["PlaceName"]>(itemName: K_PlaceName_2 & string) => {
            rootMesh: import("@babylonjs/core").AbstractMesh | null;
            spotPositions: { [P_SpotName in T_MyTypes["Types"]["SpotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: import("@babylonjs/core").Vector3; };
            spotRotations: { [P_SpotName_1 in T_MyTypes["Types"]["SpotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: import("@babylonjs/core").Vector3; };
            soundspotSounds: { [P_SoundName in T_MyTypes["Types"]["SoundspotNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: import("@babylonjs/core").Sound | null; };
            triggerMeshes: { [P_TriggerName in T_MyTypes["Types"]["TriggerNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: import("@babylonjs/core").AbstractMesh | null; };
            wallMeshes: { [P_WallName in T_MyTypes["Types"]["WallNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: import("@babylonjs/core").AbstractMesh | null; };
            camsRefs: { [P_CameraName in T_MyTypes["Types"]["CameraNameByPlace"][T_MyTypes["Types"]["PlaceName"]]]: {
                camera: import("@babylonjs/core").TargetCamera | null;
                camCubeMeshes: import("@babylonjs/core").AbstractMesh[];
                probeTexture: import("@babylonjs/core").CubeTexture | null;
                isTriggerable: boolean;
            }; };
        };
    };
    stateVids: {
        state: <T_ItemName_2 extends string>(itemName: T_ItemName_2) => {
            vidState: import("./stateVids").VidState;
            playType: "pause" | "play";
            goalSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSource: string;
            autoplay: boolean;
            doneSeekingTime: number | null;
        };
        refs: () => {
            videoElement: HTMLVideoElement | null;
        };
        startStates: import("repond").InitialItemsState<(<T_ItemName_2 extends string>(itemName: T_ItemName_2) => {
            vidState: import("./stateVids").VidState;
            playType: "pause" | "play";
            goalSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSource: string;
            autoplay: boolean;
            doneSeekingTime: number | null;
        })>;
    };
    sliceVids: {
        state: <T_ItemName_3 extends string>(itemName: T_ItemName_3) => {
            stateVidId_playing: string | null;
            stateVidId_waiting: string | null;
            sliceVidState: import("./sliceVids").SliceVidState;
            nowSlice: {
                time: number;
                duration: number;
            };
            goalSlice: import("./sliceVids").VidSlice | null;
            wantToLoad: boolean;
            wantToUnload: boolean;
            wantToLoop: boolean;
            switchSlice_keepProgress: boolean;
            newPlayingVidStartedTime: number;
            nowSliceSeekedTime: number;
        };
        refs: () => {
            waitingForPlayToDoLoopRuleName: string | null;
        };
        startStates: Record<T_MyTypes["Types"]["PlaceName"], {
            stateVidId_playing: string | null;
            stateVidId_waiting: string | null;
            sliceVidState: import("./sliceVids").SliceVidState;
            nowSlice: {
                time: number;
                duration: number;
            };
            goalSlice: import("./sliceVids").VidSlice | null;
            wantToLoad: boolean;
            wantToUnload: boolean;
            wantToLoop: boolean;
            switchSlice_keepProgress: boolean;
            newPlayingVidStartedTime: number;
            nowSliceSeekedTime: number;
        }>;
    };
};
