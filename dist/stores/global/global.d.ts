/// <reference types="node" />
import { DepthRenderer, Effect, PostProcess, RenderTargetTexture, Scene, SolidParticleSystem } from "@babylonjs/core";
import { Point3D } from "chootils/dist/points3d";
import { MyTypes } from "../../declarations";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { InRangeForDoll } from "../../helpers/prendyUtils/dolls";
export type PrendySaveState = {
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
        forCharacter: string;
        typingFinished: boolean;
    }>;
    storyState: Record<any, any>;
};
export default function global<T_MyTypes extends MyTypes = MyTypes>(prendyOptions: T_MyTypes["Main"]["PrendyOptions"], prendyAssets: T_MyTypes["Assets"]): {
    startStates: {
        main: {
            slatePosMoveConfigName: string;
            timeScreenResized: number;
            interactButtonPressTime: number;
            heldPickups: T_MyTypes["Main"]["PickupName"][];
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
            slatePos: import("chootils/dist/points2d").Point2D;
            slatePosGoal: import("chootils/dist/points2d").Point2D;
            slatePosIsMoving: boolean;
            slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
            slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
            nowPlaceName: T_MyTypes["Main"]["PlaceName"];
            goalPlaceName: T_MyTypes["Main"]["PlaceName"] | null;
            readyToSwapPlace: boolean;
            isLoadingBetweenPlaces: boolean;
            loadingOverlayToggled: boolean;
            loadingOverlayFullyShowing: boolean;
            goalCamWhenNextPlaceLoads: T_MyTypes["Main"]["AnyCameraName"] | null;
            goalCamNameWhenVidPlays: T_MyTypes["Main"]["AnyCameraName"] | null;
            goalCamNameAtLoop: T_MyTypes["Main"]["AnyCameraName"] | null;
            goalCamName: T_MyTypes["Main"]["AnyCameraName"] | null;
            nowCamName: string;
            nowSegmentName: T_MyTypes["Main"]["AnySegmentName"];
            goalSegmentName: T_MyTypes["Main"]["AnySegmentName"] | null;
            goalSegmentNameAtLoop: T_MyTypes["Main"]["AnySegmentName"] | null;
            goalSegmentNameWhenVidPlays: T_MyTypes["Main"]["AnySegmentName"] | null;
            goalSegmentWhenGoalPlaceLoads: T_MyTypes["Main"]["AnySegmentName"] | null;
            modelNamesLoaded: T_MyTypes["Main"]["ModelName"][];
            newPlaceModelLoaded: boolean;
            newPlaceVideosLoaded: boolean;
            newPlaceProbesLoaded: boolean;
            playerCharacter: T_MyTypes["Main"]["CharacterName"];
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
        heldPickups: T_MyTypes["Main"]["PickupName"][];
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
        slatePos: import("chootils/dist/points2d").Point2D;
        slatePosGoal: import("chootils/dist/points2d").Point2D;
        slatePosIsMoving: boolean;
        slatePosMoveMode: import("repond-movers/dist/types").MoveMode;
        slatePosMoveConfigs: Record<string, import("repond-movers/dist/types").PhysicsOptions>;
        nowPlaceName: T_MyTypes["Main"]["PlaceName"];
        goalPlaceName: T_MyTypes["Main"]["PlaceName"] | null;
        readyToSwapPlace: boolean;
        isLoadingBetweenPlaces: boolean;
        loadingOverlayToggled: boolean;
        loadingOverlayFullyShowing: boolean;
        goalCamWhenNextPlaceLoads: T_MyTypes["Main"]["AnyCameraName"] | null;
        goalCamNameWhenVidPlays: T_MyTypes["Main"]["AnyCameraName"] | null;
        goalCamNameAtLoop: T_MyTypes["Main"]["AnyCameraName"] | null;
        goalCamName: T_MyTypes["Main"]["AnyCameraName"] | null;
        nowCamName: string;
        nowSegmentName: T_MyTypes["Main"]["AnySegmentName"];
        goalSegmentName: T_MyTypes["Main"]["AnySegmentName"] | null;
        goalSegmentNameAtLoop: T_MyTypes["Main"]["AnySegmentName"] | null;
        goalSegmentNameWhenVidPlays: T_MyTypes["Main"]["AnySegmentName"] | null;
        goalSegmentWhenGoalPlaceLoads: T_MyTypes["Main"]["AnySegmentName"] | null;
        modelNamesLoaded: T_MyTypes["Main"]["ModelName"][];
        newPlaceModelLoaded: boolean;
        newPlaceVideosLoaded: boolean;
        newPlaceProbesLoaded: boolean;
        playerCharacter: T_MyTypes["Main"]["CharacterName"];
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
        camSegmentRulesOptions: Partial<{ [P_PlaceName in T_MyTypes["Main"]["PlaceName"]]: Partial<{ [P_CamName in keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: Record<any, any>) => keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }> | null;
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
