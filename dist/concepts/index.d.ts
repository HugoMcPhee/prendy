/// <reference types="react" />
import { BackdopArt, BackdopOptions } from "../declarations";
export declare const backdopFlowNames: readonly ["safeVidStateUpdates", "sectionVidStateUpdates", "respondToNewPlace", "cameraChange", "input", "editPosition", "positionReaction", "checkCollisions", "collisionReaction", "story", "storyReaction", "planePosition", "planePositionStartMovers", "dollAnimation", "dollAnimation2", "dollAnimationStartMovers", "positionUi", "loadNewPlaceModels", "loadNewPlace", "chooseVideoSection", "sectionVidWantsToPlay", "sectionVidWantsToPlay2", "safeVidWantsToPlay", "default", "rendering"];
export declare type FlowName = typeof backdopFlowNames[number];
export declare function makeBackdopConcepts(backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): {
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
            forCharacter: string | null;
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
                forCharacter: string | null;
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
                heldPickups: string[];
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
                wantedSegmentWhenNextPlaceLoads: string | null;
                nextSegmentNameWhenVidPlays: string | null;
                wantedSegmentNameAtLoop: string | null;
                wantedSegmentName: string | null;
                nowSegmentName: string;
                wantToLoop: boolean;
                modelNamesLoaded: string[];
                newPlaceLoaded: boolean;
                isLoadingBetweenPlaces: boolean;
                nowPlaceName: string;
                readyToSwapPlace: boolean;
                nextPlaceName: string | null;
                loadingOverlayToggled: boolean;
                loadingOverlayFullyShowing: boolean;
                playerCharacter: string;
                gravityValue: number;
                playerMovingPaused: boolean;
                focusedDoll: string;
            };
        };
        state: () => {
            planePosMoveConfigName: string;
            timeScreenResized: number;
            interactButtonPressTime: number;
            heldPickups: string[];
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
            wantedSegmentWhenNextPlaceLoads: string | null;
            nextSegmentNameWhenVidPlays: string | null;
            wantedSegmentNameAtLoop: string | null;
            wantedSegmentName: string | null;
            nowSegmentName: string;
            wantToLoop: boolean;
            modelNamesLoaded: string[];
            newPlaceLoaded: boolean;
            isLoadingBetweenPlaces: boolean;
            nowPlaceName: string;
            readyToSwapPlace: boolean;
            nextPlaceName: string | null;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            playerCharacter: string;
            gravityValue: number;
            playerMovingPaused: boolean;
            focusedDoll: string;
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
            camSegmentRulesOptions: Partial<{
                [x: string]: Partial<{
                    [x: string]: (usefulStuff: Record<any, any>) => string;
                }>;
            }> | null;
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
        startStates: {
            [x: string]: {
                wantToLoad: boolean;
                isLoading: boolean;
                isLoaded: boolean;
            };
        };
        state: <T_ModelName extends string>(_modelName: T_ModelName) => {
            wantToLoad: boolean;
            isLoading: boolean;
            isLoaded: boolean;
        };
        refs: <T_ModelName_1 extends string>(_modelName: T_ModelName_1) => {
            container: import("@babylonjs/core").AssetContainer | null;
            materialRef: import("@babylonjs/core").PBRMaterial | null;
            materialRefs: import("@babylonjs/core").PBRMaterial[] | null;
        };
    };
    dolls: {
        startStates: {
            [x: string]: {
                nowAnimation: string;
                animationLoops: boolean;
                inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
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
        state: <T_DollName extends string, T_ModelName_2 extends string>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => {
            nowAnimation: string;
            animationLoops: boolean;
            inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
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
            modelName: NonNullable<T_ModelName_2>;
            nextSpotName: string | null;
        };
        refs: <T_DollName_1 extends string, T_ModelName_3 extends string>(dollName: T_DollName_1, itemState: {
            nowAnimation: string;
            animationLoops: boolean;
            inRange: Record<string, import("./dolls/indexUtils").InRangeForDoll>;
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
            modelName: NonNullable<T_ModelName_3>;
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
            meshRef: import("@babylonjs/core").AbstractMesh | null;
            otherMeshes: Record<any, import("@babylonjs/core").AbstractMesh | null>;
            entriesRef: import("@babylonjs/core").InstantiatedEntries | null;
            aniGroupsRef: Record<any, import("@babylonjs/core").AnimationGroup> | null;
            assetRefs: {
                meshes: Record<any, import("@babylonjs/core").AbstractMesh>;
                skeleton: import("@babylonjs/core").Skeleton;
                bones: Record<any, import("@babylonjs/core").Bone>;
                aniGroups: Record<any, import("@babylonjs/core").AnimationGroup>;
                materials: Record<any, import("@babylonjs/core").Material>;
            } | null;
            groundRef: import("@babylonjs/core").AbstractMesh | null;
            checkCollisions: boolean;
        };
    };
    characters: {
        startStates: {
            [x: string]: {
                dollName: string;
                atTriggers: Partial<Record<string, boolean>>;
                atCamCubes: Partial<Record<string, boolean>>;
                hasLeftFirstTrigger: boolean;
            };
        };
        state: <T_CharacterName extends string, T_DollName_2 extends string>(_characterName: T_CharacterName, dollName?: T_DollName_2 | undefined) => {
            dollName: string;
            atTriggers: Partial<Record<string, boolean>>;
            atCamCubes: Partial<Record<string, boolean>>;
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
                    walking: string;
                    idle: string;
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
                walking: string;
                idle: string;
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
            position: import("shutils/dist/points2d").Point2D;
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
        startStates: {
            [x: string]: {
                isVisible: boolean;
                isFullyHidden: boolean;
                goalText: string;
                visibleLetterAmount: number;
                typingSpeed: number;
                stylesBySpecialText: Record<string, import("react").CSSProperties>;
                _specialTextByLetterIndex: Record<number, string>;
                _goalTextWordLetterArrays: string[][];
                forCharacter: string | null;
                position: import("shutils/dist/points2d").Point2D;
                typingFinished: boolean;
                nowVideoName: string | null;
                font: string;
                zIndex: number;
            };
        };
    };
    places: {
        startStates: {
            [x: string]: {
                wantedCamNameAtLoop: any;
                wantedCamName: any;
                nowCamName: any;
            };
        };
        state: <T_PlaceName extends string>(itemName: string | T_PlaceName) => {
            wantedCamWhenNextPlaceLoads: any;
            nextCamNameWhenVidPlays: any;
            wantedCamNameAtLoop: any;
            wantedCamName: any;
            nowCamName: string;
        };
        refs: <T_PlaceName_1 extends string>(itemName: T_PlaceName_1 & string) => {
            rootMesh: import("@babylonjs/core").AbstractMesh | null;
            spotPositions: {
                [x: string]: import("@babylonjs/core").Vector3;
                [x: number]: import("@babylonjs/core").Vector3;
                [x: symbol]: import("@babylonjs/core").Vector3;
            };
            spotRotations: {
                [x: string]: import("@babylonjs/core").Vector3;
                [x: number]: import("@babylonjs/core").Vector3;
                [x: symbol]: import("@babylonjs/core").Vector3;
            };
            soundspotSounds: {
                [x: string]: import("@babylonjs/core").Sound | null;
                [x: number]: import("@babylonjs/core").Sound | null;
                [x: symbol]: import("@babylonjs/core").Sound | null;
            };
            triggerMeshes: {
                [x: string]: import("@babylonjs/core").AbstractMesh | null;
                [x: number]: import("@babylonjs/core").AbstractMesh | null;
                [x: symbol]: import("@babylonjs/core").AbstractMesh | null;
            };
            wallMeshes: {
                [x: string]: import("@babylonjs/core").AbstractMesh | null;
                [x: number]: import("@babylonjs/core").AbstractMesh | null;
                [x: symbol]: import("@babylonjs/core").AbstractMesh | null;
            };
            camsRefs: {
                [x: string]: {
                    camera: import("@babylonjs/core").TargetCamera | null;
                    camCubeMeshes: import("@babylonjs/core").AbstractMesh[];
                    probeTexture: import("@babylonjs/core").CubeTexture | null;
                    isTriggerable: boolean;
                };
                [x: number]: {
                    camera: import("@babylonjs/core").TargetCamera | null;
                    camCubeMeshes: import("@babylonjs/core").AbstractMesh[];
                    probeTexture: import("@babylonjs/core").CubeTexture | null;
                    isTriggerable: boolean;
                };
                [x: symbol]: {
                    camera: import("@babylonjs/core").TargetCamera | null;
                    camCubeMeshes: import("@babylonjs/core").AbstractMesh[];
                    probeTexture: import("@babylonjs/core").CubeTexture | null;
                    isTriggerable: boolean;
                };
            };
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
        startStates: Record<string, {
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
