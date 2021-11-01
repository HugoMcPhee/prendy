/// <reference types="react" />
import { CharacterOptionsPlaceholder, DollOptionsPlaceholder, BackdopOptionsUntyped, ModelInfoByNamePlaceholder, PlaceInfoByNamePlaceholder } from "./typedConcepFuncs";
export declare const backdopFlowNames: readonly ["safeVidStateUpdates", "stackVidStateUpdates", "sectionVidStateUpdates", "respondToNewPlace", "cameraChange", "input", "editPosition", "positionReaction", "checkCollisions", "collisionReaction", "story", "storyReaction", "planePosition", "planePositionStartMovers", "dollAnimation", "dollAnimation2", "dollAnimationStartMovers", "positionUi", "loadNewPlaceModels", "loadNewPlace", "checkVideoLoop", "chooseVideoSection", "sectionVidWantsToPlay", "sectionVidWantsToPlay2", "stackVidWantsToPlay", "safeVidWantsToPlay", "default", "rendering"];
export declare type FlowName = typeof backdopFlowNames[number];
export declare function makeBackdopConcepts<BackdopOptions extends BackdopOptionsUntyped, PlaceInfoByName extends PlaceInfoByNamePlaceholder<PlaceName>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>, DollOptions extends DollOptionsPlaceholder<DollName, ModelName>, CharacterOptions extends CharacterOptionsPlaceholder<CharacterName, DollName, FontName>, ModelName extends string, DollName extends string, CharacterName extends string, AnyCameraName extends string, AnySegmentName extends string, AnySpotName extends string, AnyTriggerName extends string, PlaceName extends string, PickupName extends string, AnyAnimationName extends string, SoundName extends string, MusicName extends string, FontName extends string, SpeechVidName extends string, CameraNameByPlace extends Record<PlaceName, AnyCameraName>, SoundspotNameByPlace extends Record<PlaceName, string>, SpotNameByPlace extends Record<PlaceName, AnySpotName>, TriggerNameByPlace extends Record<PlaceName, AnyTriggerName>, WallNameByPlace extends Record<PlaceName, string>, AnimationNameByModel extends Record<ModelName, AnyAnimationName>, BoneNameByModel extends Record<ModelName, string>, MaterialNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>>(backdopStartOptions: BackdopOptions, placeInfoByName: PlaceInfoByName, modelInfoByName: ModelInfoByName, dollOptions: DollOptions, characterOptions: CharacterOptions, placeNames: readonly PlaceName[], modelNames: readonly ModelName[], dollNames: readonly DollName[], characterNames: readonly CharacterName[], musicNames: readonly MusicName[], soundNames: readonly SoundName[], fontNames: readonly FontName[]): {
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
            forCharacter: CharacterName | null;
            position: import("shutils/dist/points2d").Point2D;
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
                forCharacter: CharacterName | null;
                position: import("shutils/dist/points2d").Point2D;
            };
        };
    };
    pointers: {
        state: () => {
            pointerPosition: import("shutils/dist/points2d").Point2D;
        };
        refs: () => {
            pointerId: string;
            firstInputPosition: import("shutils/dist/points2d").Point2D;
            isFirstMovement: boolean;
            offset: import("shutils/dist/points2d").Point2D;
        };
    };
    global: {
        startStates: {
            main: {
                planePosMoveConfigName: string;
                timeScreenResized: number;
                interactButtonPressTime: number;
                heldPickups: PickupName[];
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
                planePos: import("shutils/dist/points2d").Point2D;
                planePosGoal: import("shutils/dist/points2d").Point2D;
                planePosIsMoving: boolean;
                planePosMoveMode: import("concep-movers/dist/types").MoveMode;
                planePosMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
                wantedSegmentWhenNextPlaceLoads: AnySegmentName | null;
                nextSegmentNameWhenVidPlays: AnySegmentName | null;
                wantedSegmentNameAtLoop: AnySegmentName | null;
                wantedSegmentName: AnySegmentName | null;
                nowSegmentName: AnySegmentName;
                wantToLoop: boolean;
                modelNamesLoaded: ModelName[];
                newPlaceLoaded: boolean;
                isLoadingBetweenPlaces: boolean;
                nowPlaceName: PlaceName;
                readyToSwapPlace: boolean;
                nextPlaceName: PlaceName | null;
                loadingOverlayToggled: boolean;
                loadingOverlayFullyShowing: boolean;
                playerCharacter: CharacterName;
                gravityValue: number;
                playerMovingPaused: boolean;
                focusedDoll: DollName;
            };
        };
        state: () => {
            planePosMoveConfigName: string;
            timeScreenResized: number;
            interactButtonPressTime: number;
            heldPickups: PickupName[];
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
            planePos: import("shutils/dist/points2d").Point2D;
            planePosGoal: import("shutils/dist/points2d").Point2D;
            planePosIsMoving: boolean;
            planePosMoveMode: import("concep-movers/dist/types").MoveMode;
            planePosMoveConfigs: Record<string, import("concep-movers/dist/types").PhysicsOptions>;
            wantedSegmentWhenNextPlaceLoads: AnySegmentName | null;
            nextSegmentNameWhenVidPlays: AnySegmentName | null;
            wantedSegmentNameAtLoop: AnySegmentName | null;
            wantedSegmentName: AnySegmentName | null;
            nowSegmentName: AnySegmentName;
            wantToLoop: boolean;
            modelNamesLoaded: ModelName[];
            newPlaceLoaded: boolean;
            isLoadingBetweenPlaces: boolean;
            nowPlaceName: PlaceName;
            readyToSwapPlace: boolean;
            nextPlaceName: PlaceName | null;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            playerCharacter: CharacterName;
            gravityValue: number;
            playerMovingPaused: boolean;
            focusedDoll: DollName;
        };
        refs: () => {
            sounds: { [K_SoundName in SoundName]: import("@babylonjs/core").Sound | null; };
            music: { [K_MusicName in MusicName]: import("@babylonjs/core").Sound | null; };
            musicEffects: {
                lowPass: BiquadFilterNode | null;
                compress: DynamicsCompressorNode | null;
                extraGain: GainNode | null;
            };
            isHoveringPickupButton: boolean;
            solidParticleSystems: Record<string, import("@babylonjs/core").SolidParticleSystem>;
            timerSpeed: number;
            aConvoIsHappening_timeout: number | null;
            camSegmentRulesOptions: Partial<{ [P_PlaceName in PlaceName]: Partial<{ [P_CamName in keyof PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: Record<any, any>) => keyof PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }> | null;
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
                velocity: import("shutils/dist/points2d").Point2D;
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
            depthVideoTex: import("../utils/babylonjs/CustomVideoTexture/CustomVideoTexture").CustomVideoTexture | null;
            colorVideoTex: import("../utils/babylonjs/CustomVideoTexture/CustomVideoTexture").CustomVideoTexture | null;
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
        startStates: { [K_ModelName in ModelName]: {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        }; };
        state: <T_ModelName extends ModelName>(_modelName: T_ModelName) => {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        };
        refs: <T_ModelName_1 extends ModelName>(_modelName: T_ModelName_1) => {
            container: import("@babylonjs/core").AssetContainer | null;
            materialRef: import("@babylonjs/core").PBRMaterial | null;
            materialRefs: import("@babylonjs/core").PBRMaterial[] | null;
        };
    };
    dolls: {
        startStates: { [K_DollName in DollName]: {
            nowAnimation: AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<DollName, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<AnimationNameByModel[ModelName], number>;
            animWeightsGoal: Record<AnimationNameByModel[ModelName], number>;
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
            modelName: NonNullable<DollOptions[K_DollName]["model"]>;
            nextSpotName: AnySpotName | null;
        }; };
        state: <T_DollName extends string, T_ModelName_2 extends ModelName>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => {
            nowAnimation: AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<DollName, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<AnimationNameByModel[ModelName], number>;
            animWeightsGoal: Record<AnimationNameByModel[ModelName], number>;
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
            modelName: NonNullable<T_ModelName_2>;
            nextSpotName: AnySpotName | null;
        };
        refs: <T_DollName_1 extends DollName, T_ModelName_3 extends ModelName>(dollName: T_DollName_1, itemState: {
            nowAnimation: AnyAnimationName;
            animationLoops: boolean;
            inRange: Record<DollName, import("./dolls/indexUtils").InRangeForDoll>;
            animWeights: Record<AnimationNameByModel[ModelName], number>;
            animWeightsGoal: Record<AnimationNameByModel[ModelName], number>;
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
            modelName: NonNullable<T_ModelName_3>;
            nextSpotName: AnySpotName | null;
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
            meshRef: import("@babylonjs/core").AbstractMesh | null;
            otherMeshes: Record<MeshNameByModel[NonNullable<T_ModelName_3>], import("@babylonjs/core").AbstractMesh | null>;
            entriesRef: import("@babylonjs/core").InstantiatedEntries | null;
            aniGroupsRef: Record<AnimationNameByModel[T_ModelName_3], import("@babylonjs/core").AnimationGroup> | null;
            assetRefs: {
                meshes: Record<"__root__" | MeshNameByModel[T_ModelName_3], import("@babylonjs/core").AbstractMesh>;
                skeleton: import("@babylonjs/core").Skeleton;
                bones: Record<BoneNameByModel[T_ModelName_3], import("@babylonjs/core").Bone>;
                aniGroups: Record<AnimationNameByModel[T_ModelName_3], import("@babylonjs/core").AnimationGroup>;
                materials: Record<MaterialNameByModel[T_ModelName_3], import("@babylonjs/core").Material>;
            } | null;
            groundRef: import("@babylonjs/core").AbstractMesh | null;
            checkCollisions: boolean;
        };
    };
    characters: {
        startStates: { [K_CharacterName in CharacterName]: {
            dollName: DollName;
            atTriggers: Partial<Record<AnyTriggerName, boolean>>;
            atCamCubes: Partial<Record<AnyCameraName, boolean>>;
            hasLeftFirstTrigger: boolean;
        }; };
        state: <T_CharacterName extends string, T_DollName_2 extends DollName>(_characterName: T_CharacterName, dollName?: T_DollName_2 | undefined) => {
            dollName: DollName;
            atTriggers: Partial<Record<AnyTriggerName, boolean>>;
            atCamCubes: Partial<Record<AnyCameraName, boolean>>;
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
                inputVelocity: import("shutils/dist/points2d").Point2D;
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
                    walking: AnyAnimationName;
                    idle: AnyAnimationName;
                };
            };
        };
        state: () => {
            lastSafeInputAngle: number | null;
            inputVelocity: import("shutils/dist/points2d").Point2D;
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
                walking: AnyAnimationName;
                idle: AnyAnimationName;
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
            font?: FontName | undefined;
            character?: CharacterName | undefined;
        } | undefined) => {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: CharacterName | null;
            position: import("shutils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: SpeechVidName | null;
            font: FontName;
            zIndex: number;
        };
        refs: () => {
            bubbleRef: any;
            textRef: any;
            currentTimeout: number | null;
            videoRef: HTMLVideoElement | null;
        };
        startStates: { [K_CharacterName_1 in CharacterName]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, import("react").CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: CharacterName | null;
            position: import("shutils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: SpeechVidName | null;
            font: FontName;
            zIndex: number;
        }; };
    };
    places: {
        startStates: { [P_PlaceName_1 in PlaceName]: {
            wantedCamNameAtLoop: CameraNameByPlace[P_PlaceName_1] | null;
            wantedCamName: CameraNameByPlace[P_PlaceName_1] | null;
            nowCamName: CameraNameByPlace[P_PlaceName_1];
        }; };
        state: <T_PlaceName extends PlaceName>(itemName: string | T_PlaceName) => {
            wantedCamWhenNextPlaceLoads: CameraNameByPlace[PlaceName] | null;
            nextCamNameWhenVidPlays: CameraNameByPlace[PlaceName] | null;
            wantedCamNameAtLoop: CameraNameByPlace[PlaceName] | null;
            wantedCamName: CameraNameByPlace[PlaceName] | null;
            nowCamName: AnyCameraName;
        };
        refs: <T_PlaceName_1 extends PlaceName>(itemName: T_PlaceName_1 & string) => {
            rootMesh: import("@babylonjs/core").AbstractMesh | null;
            spotPositions: { [P_SpotName in SpotNameByPlace[PlaceName]]: import("@babylonjs/core").Vector3; };
            spotRotations: { [P_SpotName_1 in SpotNameByPlace[PlaceName]]: import("@babylonjs/core").Vector3; };
            soundspotSounds: { [P_SoundName in SoundspotNameByPlace[PlaceName]]: import("@babylonjs/core").Sound | null; };
            triggerMeshes: { [P_TriggerName in TriggerNameByPlace[PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            wallMeshes: { [P_TriggerName_1 in WallNameByPlace[PlaceName]]: import("@babylonjs/core").AbstractMesh | null; };
            camsRefs: { [P_CameraName in CameraNameByPlace[PlaceName]]: {
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
    stackVids: {
        state: <T_ItemName_3 extends string>(itemName: T_ItemName_3) => {
            vidAId: string | null;
            vidBId: string | null;
            vidState: import("./stackVids").StackVidState;
            playType: "pause" | "play";
            wantedSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSourcePath: string;
            autoplay: boolean;
        };
        refs: () => {};
        startStates: import("concep").InitialItemsState<(<T_ItemName_3 extends string>(itemName: T_ItemName_3) => {
            vidAId: string | null;
            vidBId: string | null;
            vidState: import("./stackVids").StackVidState;
            playType: "pause" | "play";
            wantedSeekTime: number | null;
            wantToPlay: boolean;
            wantToPause: boolean;
            wantToUnload: boolean;
            wantToLoad: boolean;
            videoSourcePath: string;
            autoplay: boolean;
        })>;
    };
    sectionVids: {
        state: <T_ItemName_4 extends string>(itemName: T_ItemName_4) => {
            stackVidId_playing: string | null;
            stackVidId_waiting: string | null;
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
        startStates: Record<PlaceName, {
            stackVidId_playing: string | null;
            stackVidId_waiting: string | null;
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
