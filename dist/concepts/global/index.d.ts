import { Mesh, RenderTargetTexture, Scene, ShaderMaterial, SolidParticleSystem, TargetCamera } from "@babylonjs/core";
import { AnySegmentName, BackdopArt, BackdopOptions } from "../../declarations";
import { CustomVideoTexture } from "../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { DepthRendererWithSize } from "../../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize";
declare type MaybeSegment = null | AnySegmentName;
export default function global(backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): {
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
            wantedSegmentWhenNextPlaceLoads: MaybeSegment;
            nextSegmentNameWhenVidPlays: MaybeSegment;
            wantedSegmentNameAtLoop: MaybeSegment;
            wantedSegmentName: MaybeSegment;
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
        wantedSegmentWhenNextPlaceLoads: MaybeSegment;
        nextSegmentNameWhenVidPlays: MaybeSegment;
        wantedSegmentNameAtLoop: MaybeSegment;
        wantedSegmentName: MaybeSegment;
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
        solidParticleSystems: Record<string, SolidParticleSystem>;
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
        backdropVideoTex: CustomVideoTexture | null;
        scenes: {
            main: Scene | null;
            backdrop: Scene | null;
        };
        depthRenderer: DepthRendererWithSize | null;
        sceneRenderTarget: RenderTargetTexture | null;
        depthRenderTarget: RenderTargetTexture | null;
        scenePlane: Mesh | null;
        scenePlaneMaterial: ShaderMaterial | null;
        scenePlaneCamera: TargetCamera | null;
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
export {};
