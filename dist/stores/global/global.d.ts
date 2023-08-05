/// <reference types="node" />
import { DepthRenderer, Effect, PostProcess, RenderTargetTexture, Scene, SolidParticleSystem } from "@babylonjs/core";
import { CharacterName, PrendyAssets, PrendyOptions } from "../../declarations";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { Point2D } from "chootils/dist/points2d";
import { Point3D } from "chootils/dist/points3d";
import { InRangeForDoll } from "../../helpers/prendyUtils/dolls";
export declare type PrendySaveState = {
    global: {
        nowCamName: string;
        nowPlaceName: string;
        nowSegmentName: string;
        heldPickups: string[];
        storyOverlayToggled: boolean;
        alarmTextIsVisible: boolean;
        alarmText: string;
        aSpeechBubbleIsShowing: boolean;
        aConvoIsHappening: boolean;
    };
    dolls: Record<string, {
        position: Point3D;
        rotationY: number;
        isVisible: boolean;
        toggledMeshes: Record<string, boolean>;
        inRange: Record<string, InRangeForDoll>;
        nowAnimation: string;
    }>;
    places: Record<string, {
        toggledWalls: Record<string, boolean>;
    }>;
    characters: Record<string, {
        hasLeftFirstTrigger: boolean;
    }>;
    player: {
        animationNames: {
            walking: string;
            idle: string;
        };
    };
    miniBubbles: Record<string, {
        isVisible: boolean;
        text: string;
    }>;
    speechBubbles: Record<string, {
        isVisible: boolean;
        goalText: string;
        nowVideoName: string;
        font: string;
        stylesBySpecialText: {
            [key: string]: {
                color: string;
                fontSize: string;
                fontWeight: string;
                fontStyle: string;
                textDecoration: string;
            };
        };
        forCharacter: CharacterName;
        typingFinished: boolean;
    }>;
    storyState: Record<any, any>;
};
export default function global(prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    startStates: {
        main: {
            slatePosMoveConfigName: string;
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
            latestSave: PrendySaveState | null;
            latestLoadTime: number;
            appBecameVisibleTime: number;
            slateZoom: number;
            slateZoomGoal: number;
            slateZoomIsMoving: boolean;
            slateZoomMoveMode: import("repond-movers/dist/types").MoveMode;
            slateZoomMoveConfigName: string;
            slateZoomMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            slatePos: Point2D;
            slatePosGoal: Point2D;
            slatePosIsMoving: boolean;
            slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
            slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            nowPlaceName: string;
            goalPlaceName: string | null;
            readyToSwapPlace: boolean;
            isLoadingBetweenPlaces: boolean;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            goalCamWhenNextPlaceLoads: string | null;
            goalCamNameWhenVidPlays: string | null;
            goalCamNameAtLoop: string | null;
            goalCamName: string | null;
            nowCamName: string;
            nowSegmentName: string;
            goalSegmentName: string | null;
            goalSegmentNameAtLoop: string | null;
            goalSegmentNameWhenVidPlays: string | null;
            goalSegmentWhenGoalPlaceLoads: string | null;
            modelNamesLoaded: string[];
            newPlaceModelLoaded: boolean;
            newPlaceVideosLoaded: boolean;
            newPlaceProbesLoaded: boolean;
            playerCharacter: string;
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
        heldPickups: string[];
        storyOverlayToggled: boolean;
        alarmTextIsVisible: boolean;
        alarmText: string;
        aSpeechBubbleIsShowing: boolean;
        aConvoIsHappening: boolean;
        frameTick: number;
        debugMessage: string;
        latestSave: PrendySaveState | null;
        latestLoadTime: number;
        appBecameVisibleTime: number;
        slateZoom: number;
        slateZoomGoal: number;
        slateZoomIsMoving: boolean;
        slateZoomMoveMode: import("repond-movers/dist/types").MoveMode;
        slateZoomMoveConfigName: string;
        slateZoomMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        slatePos: Point2D;
        slatePosGoal: Point2D;
        slatePosIsMoving: boolean;
        slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
        slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        nowPlaceName: string;
        goalPlaceName: string | null;
        readyToSwapPlace: boolean;
        isLoadingBetweenPlaces: boolean;
        loadingOverlayToggled: boolean;
        loadingOverlayFullyShowing: boolean;
        goalCamWhenNextPlaceLoads: string | null;
        goalCamNameWhenVidPlays: string | null;
        goalCamNameAtLoop: string | null;
        goalCamName: string | null;
        nowCamName: string;
        nowSegmentName: string;
        goalSegmentName: string | null;
        goalSegmentNameAtLoop: string | null;
        goalSegmentNameWhenVidPlays: string | null;
        goalSegmentWhenGoalPlaceLoads: string | null;
        modelNamesLoaded: string[];
        newPlaceModelLoaded: boolean;
        newPlaceVideosLoaded: boolean;
        newPlaceProbesLoaded: boolean;
        playerCharacter: string;
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
        solidParticleSystems: Record<string, SolidParticleSystem>;
        timerSpeed: number;
        aConvoIsHappening_timeout: NodeJS.Timeout | null;
        camSegmentRulesOptions: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: Record<any, any>) => string;
            }>;
        }> | null;
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
            velocity: Point2D;
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
        scene: Scene | null;
        backdropVideoTex: CustomVideoTexture | null;
        depthRenderer: DepthRenderer | null;
        depthRenderTarget: RenderTargetTexture | null;
        backdropPostProcess: PostProcess | null;
        backdropPostProcessEffect: Effect | null;
        fxaaPostProcess: PostProcess | null;
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
