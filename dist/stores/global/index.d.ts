import { Mesh, RenderTargetTexture, Scene, ShaderMaterial, SolidParticleSystem, TargetCamera } from "@babylonjs/core";
import { AnySegmentName, PrendyArt, PrendyOptions, CharacterName, DollName, ModelName, PickupName, PlaceInfoByName, PlaceName } from "../../declarations";
import { CustomVideoTexture } from "../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { DepthRendererWithSize } from "../../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize";
export default function global<A_AnySegmentName extends AnySegmentName = AnySegmentName, A_PrendyArt extends PrendyArt = PrendyArt, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_ModelName extends ModelName = ModelName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName>(prendyStartOptions: A_PrendyOptions, prendyArt: A_PrendyArt): {
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
            planeZoomMoveMode: import("pietem-movers/dist/types").MoveMode;
            planeZoomMoveConfigName: string;
            planeZoomMoveConfigs: Record<string, import("pietem-movers/dist/types").PhysicsOptions>;
            planePos: import("chootils/dist/points2d").Point2D;
            planePosGoal: import("chootils/dist/points2d").Point2D;
            planePosIsMoving: boolean;
            planePosMoveMode: import("pietem-movers/dist/types").MoveMode;
            planePosMoveConfigs: Record<string, import("pietem-movers/dist/types").PhysicsOptions>;
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
            focusedDoll: any;
            focusedDollIsInView: boolean;
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
        planeZoomMoveMode: import("pietem-movers/dist/types").MoveMode;
        planeZoomMoveConfigName: string;
        planeZoomMoveConfigs: Record<string, import("pietem-movers/dist/types").PhysicsOptions>;
        planePos: import("chootils/dist/points2d").Point2D;
        planePosGoal: import("chootils/dist/points2d").Point2D;
        planePosIsMoving: boolean;
        planePosMoveMode: import("pietem-movers/dist/types").MoveMode;
        planePosMoveConfigs: Record<string, import("pietem-movers/dist/types").PhysicsOptions>;
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
        isHoveringPickupButton: boolean;
        isHoveringVirtualStickArea: boolean;
        solidParticleSystems: Record<string, SolidParticleSystem>;
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
            physicsConfigs: import("pietem-movers/dist/types").DefinedPhysicsConfig;
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
            physicsConfigs: import("pietem-movers/dist/types").DefinedPhysicsConfig;
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
