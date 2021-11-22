/// <reference types="react" />
import { AnimationNameByModel, AnyAnimationName, AnyCameraName, AnySegmentName, AnySpotName, AnyTriggerName, BackdopArt, BackdopOptions, BoneNameByModel, CameraNameByPlace, CharacterName, CharacterOptions, DollName, DollOptions, MaterialNameByModel, MeshNameByModel, ModelName, PickupName, PlaceInfoByName, PlaceName, SoundspotNameByPlace, SpotNameByPlace, TriggerNameByPlace, WallNameByPlace } from "../declarations";
export declare const backdopFlowNames: readonly ["safeVidStateUpdates", "sectionVidStateUpdates", "respondToNewPlace", "cameraChange", "input", "editPosition", "positionReaction", "checkCollisions", "collisionReaction", "story", "storyReaction", "planePosition", "planePositionStartMovers", "dollAnimation", "dollAnimation2", "dollAnimationStartMovers", "positionUi", "loadNewPlaceModels", "loadNewPlace", "chooseVideoSection", "sectionVidWantsToPlay", "sectionVidWantsToPlay2", "safeVidWantsToPlay", "default", "rendering"];
export declare type FlowName = typeof backdopFlowNames[number];
export declare function makeBackdopConcepts<A_CharacterName extends CharacterName = CharacterName, A_PlaceName extends PlaceName = PlaceName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_BackdopArt extends BackdopArt = BackdopArt, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_BackdopOptions extends BackdopOptions = BackdopOptions, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_DollName extends DollName = DollName, A_ModelName extends ModelName = ModelName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_AnySpotName extends AnySpotName = AnySpotName, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel, A_DollOptions extends DollOptions = DollOptions, A_MaterialNameByModel extends MaterialNameByModel = MaterialNameByModel, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_CharacterOptions extends CharacterOptions = CharacterOptions>(backdopStartOptions: A_BackdopOptions, backdopArt: A_BackdopArt): {
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
        state: <T_ItemName extends string>(_itemName: T_ItemName) => {
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
        startStates: {
            walkerMiniBubble: {
                isVisible: boolean;
                isFullyHidden: boolean;
                text: string;
                forCharacter: A_CharacterName | null;
                position: import("chootils/dist/points2d").Point2D;
            };
        };
    };
    pointers: {
        state: () => {
            pointerPosition: import("chootils/dist/points2d").Point2D;
        };
        refs: () => {
            pointerId: string;
            firstInputPosition: import("chootils/dist/points2d").Point2D;
            isFirstMovement: boolean;
            offset: import("chootils/dist/points2d").Point2D;
        };
    };
    global: {
        startStates: {
            main: {
                planePosMoveConfigName: string;
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
                planeZoom: number;
                planeZoomGoal: number;
                planeZoomIsMoving: boolean;
                planeZoomMoveMode: import("concep-movers/dist/types").MoveMode;
                planeZoomMoveConfigName: string;
                planeZoomMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
                planePos: import("chootils/dist/points2d").Point2D;
                planePosGoal: import("chootils/dist/points2d").Point2D;
                planePosIsMoving: boolean;
                planePosMoveMode: import("concep-movers/dist/types").MoveMode;
                planePosMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
                wantedSegmentWhenNextPlaceLoads: A_AnySegmentName | null;
                nextSegmentNameWhenVidPlays: A_AnySegmentName | null;
                wantedSegmentNameAtLoop: A_AnySegmentName | null;
                wantedSegmentName: A_AnySegmentName | null;
                nowSegmentName: A_AnySegmentName;
                wantToLoop: boolean;
                modelNamesLoaded: A_ModelName[];
                newPlaceLoaded: boolean;
                isLoadingBetweenPlaces: boolean;
                nowPlaceName: A_PlaceName;
                readyToSwapPlace: boolean;
                nextPlaceName: A_PlaceName | null;
                loadingOverlayToggled: boolean;
                loadingOverlayFullyShowing: boolean;
                playerCharacter: A_CharacterName;
                gravityValue: number;
                playerMovingPaused: boolean;
                focusedDoll: A_DollName;
            };
        };
        state: () => {
            planePosMoveConfigName: string;
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
            planeZoom: number;
            planeZoomGoal: number;
            planeZoomIsMoving: boolean;
            planeZoomMoveMode: import("concep-movers/dist/types").MoveMode;
            planeZoomMoveConfigName: string;
            planeZoomMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            planePos: import("chootils/dist/points2d").Point2D;
            planePosGoal: import("chootils/dist/points2d").Point2D;
            planePosIsMoving: boolean;
            planePosMoveMode: import("concep-movers/dist/types").MoveMode;
            planePosMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            wantedSegmentWhenNextPlaceLoads: A_AnySegmentName | null;
            nextSegmentNameWhenVidPlays: A_AnySegmentName | null;
            wantedSegmentNameAtLoop: A_AnySegmentName | null;
            wantedSegmentName: A_AnySegmentName | null;
            nowSegmentName: A_AnySegmentName;
            wantToLoop: boolean;
            modelNamesLoaded: A_ModelName[];
            newPlaceLoaded: boolean;
            isLoadingBetweenPlaces: boolean;
            nowPlaceName: A_PlaceName;
            readyToSwapPlace: boolean;
            nextPlaceName: A_PlaceName | null;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            playerCharacter: A_CharacterName;
            gravityValue: number;
            playerMovingPaused: boolean;
            focusedDoll: A_DollName;
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
            isHoveringPickupButton: boolean;
            solidParticleSystems: Record<string, import("@babylonjs/core").SolidParticleSystem>;
            timerSpeed: number;
            aConvoIsHappening_timeout: number | null;
            camSegmentRulesOptions: Partial<{ [P_PlaceName in A_PlaceName]: Partial<{ [P_CamName in keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: Record<any, any>) => keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }> | null;
            onPickupButtonClick: ((pickupName: any) => void) | null;
            hasAlreadyStartedRuningBeforeChangeSectionThisFrame: boolean;
            planeZoomMoverRefs: {
                velocity: number;
                recentSpeeds: number[];
                stateNames: {
                    value: "planeZoom";
                    valueGoal: "planeZoomGoal";
                    isMoving: "planeZoomIsMoving";
                    moveMode: "planeZoomMoveMode";
                    physicsConfigName: "planeZoomMoveConfigName";
                    physicsConfigs: "planeZoomMoveConfigs";
                };
                physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
            };
            planePosMoverRefs: {
                velocity: import("chootils/dist/points2d").Point2D;
                recentSpeeds: number[];
                averageSpeed: number;
                canRunOnSlow: boolean;
                stateNames: {
                    value: "planePos";
                    valueGoal: "planePosGoal";
                    isMoving: "planePosIsMoving";
                    moveMode: "planePosMoveMode";
                    physicsConfigName: "planePosMoveConfigName";
                    physicsConfigs: "planePosMoveConfigs";
                };
                physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
            };
            backdropVideoTex: import("../utils/babylonjs/CustomVideoTexture/CustomVideoTexture").CustomVideoTexture | null;
            scenes: {
                main: import("@babylonjs/core").Scene | null;
                backdrop: import("@babylonjs/core").Scene | null;
            };
            depthRenderer: import("../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize").DepthRendererWithSize | null;
            sceneRenderTarget: import("@babylonjs/core").RenderTargetTexture | null;
            depthRenderTarget: import("@babylonjs/core").RenderTargetTexture | null;
            scenePlane: import("@babylonjs/core").Mesh | null;
            scenePlaneMaterial: import("@babylonjs/core").ShaderMaterial | null;
            scenePlaneCamera: import("@babylonjs/core").TargetCamera | null;
            backdropImageSize: {
                width: number;
                height: number;
            };
            backdropRenderSize: {
                width: number;
                height: number;
            };
            depthRenderSize: {
                width: number;
                height: number;
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
            nowAnimation: A_AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<string, number>;
            animWeightsGoal: Record<string, number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            positionOnPlaneScene: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("concep-movers/dist/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            modelName: NonNullable<A_DollOptions[K_DollName]["model"]>;
            nextSpotName: A_AnySpotName | null;
        }; };
        state: <T_DollName extends string, T_ModelName_2 extends A_ModelName>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => {
            nowAnimation: A_AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<string, number>;
            animWeightsGoal: Record<string, number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            positionOnPlaneScene: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("concep-movers/dist/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            modelName: NonNullable<T_ModelName_2>;
            nextSpotName: A_AnySpotName | null;
        };
        refs: <T_DollName_1 extends A_DollName, T_ModelName_3 extends A_ModelName>(dollName: T_DollName_1, itemState: {
            nowAnimation: A_AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<string, number>;
            animWeightsGoal: Record<string, number>;
            animWeightsIsMoving: boolean;
            animWeightsMoveMode: import("concep-movers/dist/types").MoveMode;
            animWeightsMoveConfigName: string;
            animWeightsMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            positionOnPlaneScene: import("chootils/dist/points2d").Point2D;
            rotationY: number;
            rotationYGoal: number;
            rotationYIsMoving: boolean;
            rotationYMoveMode: import("concep-movers/dist/types").MoveMode;
            rotationYMoveConfigName: string;
            rotationYMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            position: import("chootils/dist/points3d").Point3D;
            positionGoal: import("chootils/dist/points3d").Point3D;
            positionIsMoving: boolean;
            positionMoveMode: import("concep-movers/dist/types").MoveMode;
            positionMoveConfigName: string;
            positionMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            modelName: NonNullable<T_ModelName_3>;
            nextSpotName: A_AnySpotName | null;
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
                physicsConfigs: import("concep-movers/dist/types").DefinedPhysicsConfig;
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
            checkCollisions: boolean;
        };
    };
    characters: {
        startStates: { [K_CharacterName in A_CharacterName]: {
            dollName: string;
            atTriggers: Partial<Record<A_AnyTriggerName, boolean>>;
            atCamCubes: Partial<Record<A_AnyCameraName, boolean>>;
            hasLeftFirstTrigger: boolean;
        }; };
        state: <T_CharacterName extends string, T_DollName_2 extends A_DollName>(_characterName: T_CharacterName, dollName?: T_DollName_2 | undefined) => {
            dollName: string;
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
            canJumpTimeout: number | null;
            canShowVirtualButtonsTimeout: number | null;
            canHideVirtualButtonsTimeout: number | null;
        };
    };
    speechBubbles: {
        state: <T_ItemName_1 extends string>(_itemName: T_ItemName_1, options?: {
            font?: string | undefined;
            character?: string | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: string | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: string | null;
            font: string;
            zIndex: number;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            currentTimeout: number | null;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName_1 in A_CharacterName]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: string | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: string | null;
            font: string;
            zIndex: number;
        }; };
    };
    places: {
        startStates: { [P_PlaceName_1 in A_PlaceName]: {
            wantedCamNameAtLoop: A_CameraNameByPlace[P_PlaceName_1] | null;
            wantedCamName: A_CameraNameByPlace[P_PlaceName_1] | null;
            nowCamName: A_CameraNameByPlace[P_PlaceName_1];
        }; };
        state: <K_PlaceName extends A_PlaceName>(itemName: string | K_PlaceName) => {
            wantedCamWhenNextPlaceLoads: A_CameraNameByPlace[A_PlaceName] | null;
            nextCamNameWhenVidPlays: A_CameraNameByPlace[A_PlaceName] | null;
            wantedCamNameAtLoop: A_CameraNameByPlace[A_PlaceName] | null;
            wantedCamName: A_CameraNameByPlace[A_PlaceName] | null;
            nowCamName: A_AnyCameraName;
        };
        refs: <K_PlaceName_1 extends A_PlaceName>(itemName: K_PlaceName_1 & string) => {
            rootMesh: import("@babylonjs/core").AbstractMesh | null;
            spotPositions: { [P_SpotName in A_SpotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Vector3; };
            spotRotations: { [P_SpotName_1 in A_SpotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Vector3; };
            soundspotSounds: { [P_SoundName in A_SoundspotNameByPlace[A_PlaceName]]: import("@babylonjs/core").Sound | null; };
            triggerMeshes: { [P_TriggerName in A_TriggerNameByPlace[A_PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            wallMeshes: { [P_TriggerName_1 in A_WallNameByPlace[A_PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            camsRefs: { [P_CameraName in A_CameraNameByPlace[A_PlaceName]]: {
                camera: import("@babylonjs/core").TargetCamera | null;
                camCubeMeshes: import("@babylonjs/core").AbstractMesh[];
                probeTexture: import("@babylonjs/core").CubeTexture | null;
                isTriggerable: boolean;
            }; };
        };
    };
    safeVids: {
        state: <T_ItemName_2 extends string>(itemName: T_ItemName_2) => {
            vidState: import("./safeVids").VidState;
            playType: "pause" | "play";
            wantedSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSource: string;
            autoplay: boolean;
        };
        refs: () => {
            videoElement: HTMLVideoElement | null;
        };
        startStates: import("concep").InitialItemsState<(<T_ItemName_2 extends string>(itemName: T_ItemName_2) => {
            vidState: import("./safeVids").VidState;
            playType: "pause" | "play";
            wantedSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSource: string;
            autoplay: boolean;
        })>;
    };
    sectionVids: {
        state: <T_ItemName_3 extends string>(itemName: T_ItemName_3) => {
            safeVidId_playing: string | null;
            safeVidId_waiting: string | null;
            sectionVidState: import("./sectionVids").SectionVidState;
            nowSection: {
                time: number;
                duration: number;
            };
            wantedSection: import("./sectionVids").VidSection | null;
            wantToLoad: boolean;
            wantToUnload: boolean;
            wantToLoop: boolean;
            switchSection_keepProgress: boolean;
            newplayingVidStartedTime: number;
            nowSectionSeekedTime: number;
        };
        refs: () => {
            waitingForPlayToDoLoopRuleName: string | null;
            waitingForPlayToChangeSectionRuleName: string | null;
        };
        startStates: Record<A_PlaceName, {
            safeVidId_playing: string | null;
            safeVidId_waiting: string | null;
            sectionVidState: import("./sectionVids").SectionVidState;
            nowSection: {
                time: number;
                duration: number;
            };
            wantedSection: import("./sectionVids").VidSection | null;
            wantToLoad: boolean;
            wantToUnload: boolean;
            wantToLoop: boolean;
            switchSection_keepProgress: boolean;
            newplayingVidStartedTime: number;
            nowSectionSeekedTime: number;
        }>;
    };
};
