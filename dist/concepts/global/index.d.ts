import { Mesh, RenderTargetTexture, Scene, ShaderMaterial, SolidParticleSystem, TargetCamera } from "@babylonjs/core";
import { CustomVideoTexture } from "../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { DepthRendererWithSize } from "../../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize";
import { GameyStartOptionsUntyped, PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";
export default function global<GameyStartOptions extends GameyStartOptionsUntyped, AnySegmentName extends string, PlaceName extends string, ModelName extends string, DollName extends string, PickupName extends string, CharacterName extends string, MusicName extends string, SoundName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(gameyStartOptions: GameyStartOptions, musicNames: readonly MusicName[], soundNames: readonly SoundName[]): {
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
            wantedSegmentWhenNextPlaceLoads: AnySegmentName;
            nextSegmentNameWhenVidPlays: AnySegmentName;
            wantedSegmentNameAtLoop: AnySegmentName;
            wantedSegmentName: AnySegmentName;
            nowSegmentName: AnySegmentName;
            wantToLoop: boolean;
            modelNamesLoaded: ModelName[];
            newPlaceLoaded: boolean;
            isLoadingBetweenPlaces: boolean;
            nowPlaceName: PlaceName;
            readyToSwapPlace: boolean;
            nextPlaceName: PlaceName;
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
        wantedSegmentWhenNextPlaceLoads: AnySegmentName;
        nextSegmentNameWhenVidPlays: AnySegmentName;
        wantedSegmentNameAtLoop: AnySegmentName;
        wantedSegmentName: AnySegmentName;
        nowSegmentName: AnySegmentName;
        wantToLoop: boolean;
        modelNamesLoaded: ModelName[];
        newPlaceLoaded: boolean;
        isLoadingBetweenPlaces: boolean;
        nowPlaceName: PlaceName;
        readyToSwapPlace: boolean;
        nextPlaceName: PlaceName;
        loadingOverlayToggled: boolean;
        loadingOverlayFullyShowing: boolean;
        playerCharacter: CharacterName;
        gravityValue: number;
        playerMovingPaused: boolean;
        focusedDoll: DollName;
    };
    refs: () => {
        sounds: { [K_SoundName in SoundName]: import("@babylonjs/core").Sound; };
        music: { [K_MusicName in MusicName]: import("@babylonjs/core").Sound; };
        musicEffects: {
            lowPass: BiquadFilterNode;
            compress: DynamicsCompressorNode;
            extraGain: GainNode;
        };
        isHoveringPickupButton: boolean;
        solidParticleSystems: Record<string, SolidParticleSystem>;
        timerSpeed: number;
        aConvoIsHappening_timeout: number;
        camSegmentRulesOptions: Partial<{ [P_PlaceName in PlaceName]: Partial<{ [P_CamName in keyof PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: Record<any, any>) => keyof PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }>;
        onPickupButtonClick: (pickupName: any) => void;
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
        depthVideoTex: CustomVideoTexture;
        colorVideoTex: CustomVideoTexture;
        scenes: {
            main: Scene;
            backdrop: Scene;
        };
        depthRenderer: DepthRendererWithSize;
        sceneRenderTarget: RenderTargetTexture;
        depthRenderTarget: RenderTargetTexture;
        scenePlane: Mesh;
        scenePlaneMaterial: ShaderMaterial;
        scenePlaneCamera: TargetCamera;
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