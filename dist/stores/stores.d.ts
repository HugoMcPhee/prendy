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
            main: any;
        };
        state: () => any;
        refs: () => any;
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
        startStates: { [K_DollName in T_MyTypes["Types"]["DollName"]]: any; };
        state: <T_DollName extends string, T_ModelName_2 extends T_MyTypes["Types"]["ModelName"]>(_dollName: T_DollName, modelName?: T_ModelName_2 | undefined) => any;
        refs: <T_DollName_1 extends T_MyTypes["Types"]["DollName"], T_ModelName_3 extends T_MyTypes["Types"]["ModelName"]>(dollName: T_DollName_1, itemState: any) => any;
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
