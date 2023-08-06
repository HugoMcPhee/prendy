/// <reference types="node" />
/// <reference types="react" />
import { AnimationNameByModel, AnyAnimationName, AnyCameraName, AnySegmentName, AnySpotName, AnyTriggerName, PrendyAssets, PrendyOptions, BoneNameByModel, CameraNameByPlace, CharacterName, CharacterOptions, DollName, DollOptions, MaterialNameByModel, MeshNameByModel, ModelName, PickupName, PlaceInfoByName, PlaceName, SoundspotNameByPlace, SpotNameByPlace, TriggerNameByPlace, WallNameByPlace } from "../declarations";
export declare const prendyStepNames: readonly ["stateVidStateUpdates", "sliceVidStateUpdates", "respondToNewPlace", "respondToNewPlaceStory", "cameraChange", "input", "editPosition", "positionReaction", "checkCollisions", "collisionReaction", "story", "storyReaction", "slatePosition", "slatePositionDontGoOverEdges", "slatePositionStartMovers", "dollAnimation", "dollAnimation2", "dollAnimationStartMovers", "positionUi", "loadNewPlaceModels", "loadNewPlace", "chooseVideoSlice", "sliceVidWantsToPlay", "sliceVidWantsToPlay2", "safeVidWantsToPlay", "default", "rendering", "overlay"];
export declare type PrendyStepName = (typeof prendyStepNames)[number];
export declare function makePrendyStores<A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_AnySpotName extends AnySpotName = AnySpotName, A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_MaterialNameByModel extends MaterialNameByModel = MaterialNameByModel, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_ModelName extends ModelName = ModelName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets): {
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
        };
        refs: () => {};
    };
    miniBubbles: {
        state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
            character?: A_CharacterName | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: A_CharacterName | null;
            position: import("chootils/dist/points2d").Point2D;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName in A_CharacterName]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: A_CharacterName | null;
            position: import("chootils/dist/points2d").Point2D;
        }; };
    };
    global: {
        startStates: {
            main: {
                slatePosMoveConfigName: string;
                timeScreenResized: number;
                interactButtonPressTime: number;
                heldPickups: A_PickupName[];
                storyOverlayToggled: boolean;
                alarmTextIsVisible: boolean;
                alarmText: string;
                aSpeechBubbleIsShowing: boolean;
                aConvoIsHappening: boolean;
                frameTick: number;
                debugMessage: string;
                latestSave: import("./global/global").PrendySaveState | null;
                latestLoadTime: number;
                appBecameVisibleTime: number;
                slateZoom: number;
                slateZoomGoal: number;
                slateZoomIsMoving: boolean;
                slateZoomMoveMode: import("repond-movers/dist/types").MoveMode;
                slateZoomMoveConfigName: string;
                slateZoomMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
                slatePos: import("chootils/dist/points2d").Point2D;
                slatePosGoal: import("chootils/dist/points2d").Point2D;
                slatePosIsMoving: boolean;
                slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
                slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
                nowPlaceName: A_PlaceName;
                goalPlaceName: A_PlaceName | null;
                readyToSwapPlace: boolean;
                isLoadingBetweenPlaces: boolean;
                loadingOverlayToggled: boolean;
                loadingOverlayFullyShowing: boolean;
                goalCamWhenNextPlaceLoads: A_AnyCameraName | null;
                goalCamNameWhenVidPlays: A_AnyCameraName | null;
                goalCamNameAtLoop: A_AnyCameraName | null;
                goalCamName: A_AnyCameraName | null;
                nowCamName: string;
                nowSegmentName: A_AnySegmentName;
                goalSegmentName: A_AnySegmentName | null;
                goalSegmentNameAtLoop: A_AnySegmentName | null;
                goalSegmentNameWhenVidPlays: A_AnySegmentName | null;
                goalSegmentWhenGoalPlaceLoads: A_AnySegmentName | null;
                modelNamesLoaded: A_ModelName[];
                newPlaceModelLoaded: boolean;
                newPlaceVideosLoaded: boolean;
                newPlaceProbesLoaded: boolean;
                playerCharacter: A_CharacterName;
                gravityValue: number;
                playerMovingPaused: boolean;
                focusedDoll: any;
                focusedDollIsInView: boolean;
            };
        };
        state: () => {
            slatePosMoveConfigName: string;
            timeScreenResized: number;
            interactButtonPressTime: number;
            heldPickups: A_PickupName[];
            storyOverlayToggled: boolean;
            alarmTextIsVisible: boolean;
            alarmText: string;
            aSpeechBubbleIsShowing: boolean;
            aConvoIsHappening: boolean;
            frameTick: number;
            debugMessage: string;
            latestSave: import("./global/global").PrendySaveState | null;
            latestLoadTime: number;
            appBecameVisibleTime: number;
            slateZoom: number;
            slateZoomGoal: number;
            slateZoomIsMoving: boolean;
            slateZoomMoveMode: import("repond-movers/dist/types").MoveMode;
            slateZoomMoveConfigName: string;
            slateZoomMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            slatePos: import("chootils/dist/points2d").Point2D;
            slatePosGoal: import("chootils/dist/points2d").Point2D;
            slatePosIsMoving: boolean;
            slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
            slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            nowPlaceName: A_PlaceName;
            goalPlaceName: A_PlaceName | null;
            readyToSwapPlace: boolean;
            isLoadingBetweenPlaces: boolean;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            goalCamWhenNextPlaceLoads: A_AnyCameraName | null;
            goalCamNameWhenVidPlays: A_AnyCameraName | null;
            goalCamNameAtLoop: A_AnyCameraName | null;
            goalCamName: A_AnyCameraName | null;
            nowCamName: string;
            nowSegmentName: A_AnySegmentName;
            goalSegmentName: A_AnySegmentName | null;
            goalSegmentNameAtLoop: A_AnySegmentName | null;
            goalSegmentNameWhenVidPlays: A_AnySegmentName | null;
            goalSegmentWhenGoalPlaceLoads: A_AnySegmentName | null;
            modelNamesLoaded: A_ModelName[];
            newPlaceModelLoaded: boolean;
            newPlaceVideosLoaded: boolean;
            newPlaceProbesLoaded: boolean;
            playerCharacter: A_CharacterName;
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
            camSegmentRulesOptions: Partial<{ [P_PlaceName in A_PlaceName]: Partial<{ [P_CamName in keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: Record<any, any>) => keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }> | null;
            onPickupButtonClick: ((pickupName: any) => void) | null;
            slateZoomMoverRefs: {
                velocity: number;
                recentSpeeds: number[];
                stateNames: {
                    value: "slateZoom";
                    valueGoal: "slateZoomGoal";
                    isMoving: "slateZoomIsMoving";
                    moveMode: "slateZoomMoveMode";
                    physicsConfigName: "slateZoomMoveConfigName";
                    physicsConfigs: "slateZoomMoveConfigs";
                };
                physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
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
                    physicsConfigName: "slatePosMoveConfigName";
                    physicsConfigs: "slatePosMoveConfigs";
                };
                physicsConfigs: import("repond-movers/dist/types").DefinedPhysicsConfig;
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
        startStates: { [K_ModelName in A_ModelName]: {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        }; };
        state: <T_ModelName extends A_ModelName>(_modelName: T_ModelName) => {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        };
        refs: <T_ModelName_1 extends A_ModelName>(_modelName: T_ModelName_1) => {
            container: import("@babylonjs/core").AssetContainer | null;
            materialRef: import("@babylonjs/core").PBRMaterial | null;
            materialRefs: import("@babylonjs/core").PBRMaterial[] | null;
        };
    };
    dolls: {
        startStates: { [K_DollName in A_DollName]: {
            toggledMeshes: Record<string, boolean>;
            nowAnimation: A_AnimationNameByModel[A_DollOptions[K_DollName]["model"]];
            animationLoops: boolean;
            inRange: Record<string, import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
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
            modelName: NonNullable<A_DollOptions[K_DollName]["model"]>;
            goalSpotNameAtNewPlace: A_AnySpotName | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
        }; };
        state: <T_DollName extends string, T_ModelName_2 extends A_ModelName>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => {
            toggledMeshes: Record<string, boolean>;
            nowAnimation: A_AnimationNameByModel[T_ModelName_2];
            animationLoops: boolean;
            inRange: Record<string, import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
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
            modelName: NonNullable<T_ModelName_2>;
            goalSpotNameAtNewPlace: A_AnySpotName | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
        };
        refs: <T_DollName_1 extends A_DollName, T_ModelName_3 extends A_ModelName>(dollName: T_DollName_1, itemState: {
            toggledMeshes: Record<string, boolean>;
            nowAnimation: A_AnimationNameByModel[A_DollOptions[T_DollName_1]["model"]];
            animationLoops: boolean;
            inRange: Record<string, import("../helpers/prendyUtils/dolls").InRangeForDoll>;
            isVisible: boolean;
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
            modelName: NonNullable<A_DollOptions[T_DollName_1]["model"]>;
            goalSpotNameAtNewPlace: A_AnySpotName | null;
            goalPositionAtNewPlace: import("chootils/dist/points3d").Point3D | null;
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
            meshRef: import("@babylonjs/core").AbstractMesh | null;
            otherMeshes: Record<string, import("@babylonjs/core").AbstractMesh | null>;
            entriesRef: import("@babylonjs/core").InstantiatedEntries | null;
            aniGroupsRef: Record<A_AnimationNameByModel[T_ModelName_3], import("@babylonjs/core").AnimationGroup> | null;
            assetRefs: {
                meshes: Record<"__root__" | A_MeshNameByModel[T_ModelName_3], import("@babylonjs/core").AbstractMesh>;
                skeleton: import("@babylonjs/core").Skeleton;
                bones: Record<A_BoneNameByModel[T_ModelName_3], import("@babylonjs/core").Bone>;
                aniGroups: Record<A_AnimationNameByModel[T_ModelName_3], import("@babylonjs/core").AnimationGroup>;
                materials: Record<A_MaterialNameByModel[T_ModelName_3], import("@babylonjs/core").Material>;
            } | null;
            groundRef: import("@babylonjs/core").AbstractMesh | null;
            canGoThroughWalls: boolean;
        };
    };
    characters: {
        startStates: { [K_CharacterName_1 in A_CharacterName]: {
            dollName: A_CharacterOptions[K_CharacterName_1]["doll"];
            atTriggers: Partial<Record<A_AnyTriggerName, boolean>>;
            atCamCubes: Partial<Record<A_AnyCameraName, boolean>>;
            hasLeftFirstTrigger: boolean;
        }; };
        state: <T_CharacterName extends string, T_DollName_2 extends A_DollName>(_characterName: T_CharacterName, dollName?: T_DollName_2 | undefined) => {
            dollName: T_DollName_2;
            atTriggers: Partial<Record<A_AnyTriggerName, boolean>>;
            atCamCubes: Partial<Record<A_AnyCameraName, boolean>>;
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
                    walking: A_AnyAnimationName;
                    idle: A_AnyAnimationName;
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
                walking: A_AnyAnimationName;
                idle: A_AnyAnimationName;
            };
        };
        refs: () => {
            walkSpeed: number;
            canJumpTimeout: NodeJS.Timeout | null;
            canShowVirtualButtonsTimeout: NodeJS.Timeout | null;
            canHideVirtualButtonsTimeout: NodeJS.Timeout | null;
        };
    };
    speechBubbles: {
        state: <T_ItemName_1 extends string>(_itemName: T_ItemName_1, options?: {
            font?: any;
            character?: A_CharacterName | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: A_CharacterName | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: any;
            font: A_FontName;
            zIndex: number;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            currentTimeout: NodeJS.Timeout | null;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName_2 in A_CharacterName]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: A_CharacterName | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: any;
            font: A_FontName;
            zIndex: number;
        }; };
    };
    places: {
        startStates: { [K_PlaceName in A_PlaceName]: {
            toggledWalls: Record<A_WallNameByPlace[K_PlaceName], boolean>;
        }; };
        state: <K_PlaceName_1 extends A_PlaceName>(itemName: string | K_PlaceName_1) => {
            toggledWalls: Record<A_WallNameByPlace[A_PlaceName], boolean>;
        };
        refs: <K_PlaceName_2 extends A_PlaceName>(itemName: K_PlaceName_2 & string) => {
            rootMesh: import("@babylonjs/core").AbstractMesh | null;
            spotPositions: { [P_SpotName in A_SpotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Vector3; };
            spotRotations: { [P_SpotName_1 in A_SpotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Vector3; };
            soundspotSounds: { [P_SoundName in A_SoundspotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Sound | null; };
            triggerMeshes: { [P_TriggerName in A_TriggerNameByPlace[A_PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            wallMeshes: { [P_WallName in A_WallNameByPlace[A_PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            camsRefs: { [P_CameraName in A_CameraNameByPlace[A_PlaceName]]: {
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
        startStates: Record<A_PlaceName, {
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
