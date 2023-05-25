import { AbstractMesh, Camera, Matrix, Vector3 } from "@babylonjs/core";
import { shortenDecimals } from "chootils/dist/numbers";
import { copyPoint, defaultPosition, Point2D } from "chootils/dist/points2d";
import { measurementToRect, pointInsideRect } from "chootils/dist/rects";
import { defaultSize } from "chootils/dist/sizes";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_globalUtils } from "../prendyUtils/global";
import { get_getSceneOrEngineUtils } from "./getSceneOrEngineUtils";

export function getScreenSize() {
  return { x: window.innerWidth, y: window.innerHeight };
}

export const planeSize = { x: 1280, y: 720 };

export function get_scenePlaneUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions) {
  const { getRefs, getState, onNextTick } = storeHelpers;

  const { setGlobalState, getGlobalState } = get_globalUtils(storeHelpers);
  const { getEngine } = get_getSceneOrEngineUtils(storeHelpers);
  const globalRefs = getRefs().global.main;

  const { backdropSize } = globalRefs;

  function getProjectionMatrixCustomSize(theCamera: Camera, theSize: { width: number; height: number }) {
    // Only for perspective camera here :)
    const scene = theCamera.getScene();

    // const aspectRatio = engine.getAspectRatio(theCamera);
    const aspectRatio = theSize.width / theSize.height;

    let theProjectionMatrix = Matrix.Identity();

    if (theCamera.minZ <= 0) {
      theCamera.minZ = 0.1;
    }

    if (scene.useRightHandedSystem) {
      Matrix.PerspectiveFovRHToRef(
        theCamera.fov,
        aspectRatio,
        theCamera.minZ,
        theCamera.maxZ,
        theProjectionMatrix,
        theCamera.fovMode === Camera.FOVMODE_VERTICAL_FIXED
      );
    } else {
      Matrix.PerspectiveFovLHToRef(
        theCamera.fov,
        aspectRatio,
        theCamera.minZ,
        theCamera.maxZ,
        theProjectionMatrix,
        theCamera.fovMode === Camera.FOVMODE_VERTICAL_FIXED
      );
    }

    return theProjectionMatrix;
  }

  function getPositionOnPlane(theMesh: AbstractMesh) {
    // This is a position on the plane itself

    const { nowPlaceName } = getState().global.main;
    const { nowCamName, goalCamName } = getState().places[nowPlaceName];
    const placeRefs = getRefs().places[nowPlaceName];

    const nowCam = placeRefs.camsRefs[nowCamName]?.camera;
    if (!nowCam) return new Vector3();

    // FIXME Temporary value to use the characters head position instead of center position
    const Y_OFFSET = prendyStartOptions.headHeightOffset;

    return Vector3.Project(
      new Vector3(theMesh.position.x, theMesh.position.y + Y_OFFSET, theMesh.position.z),
      Matrix.Identity(),
      nowCam
        .getViewMatrix()
        // .multiply(currentCamera.getProjectionMatrix()),
        .multiply(getProjectionMatrixCustomSize(nowCam, globalRefs.backdropSize)),
      nowCam.viewport.toGlobal(globalRefs.backdropSize.width, globalRefs.backdropSize.height)
    );
  }

  function getPlanePositionNotOverEdges(planePos: Point2D, useGoal?: boolean) {
    const newPlanePos = copyPoint(planePos);

    const stretchVideoX = useGoal ? globalRefs.stretchVideoGoalSize.x : globalRefs.stretchVideoSize.x;
    const stretchVideoY = useGoal ? globalRefs.stretchVideoGoalSize.y : globalRefs.stretchVideoSize.y;

    const maxShiftX = (stretchVideoX - 1) / stretchVideoX / 2;
    const maxShiftY = (stretchVideoY - 1) / stretchVideoY / 2;

    const isOverRightEdge = newPlanePos.x > maxShiftX;
    const isOverLeftEdge = newPlanePos.x < -maxShiftX;
    const isOverBottomEdge = newPlanePos.y > maxShiftY;
    const isOverTopEdge = newPlanePos.y < -maxShiftY;
    const isOverEdge = isOverRightEdge || isOverLeftEdge || isOverBottomEdge || isOverTopEdge;

    if (isOverRightEdge) newPlanePos.x = maxShiftX;
    if (isOverLeftEdge) newPlanePos.x = -maxShiftX;
    if (isOverBottomEdge) newPlanePos.y = maxShiftY;
    if (isOverTopEdge) newPlanePos.y = -maxShiftY;

    newPlanePos.x = shortenDecimals(newPlanePos.x);
    newPlanePos.y = shortenDecimals(newPlanePos.y);

    // zoom 1.5, edges are 0.1625?
    // zoom 2, edges are 0.25
    // zoom 2.5, edges are ~0.3?
    // zoom 3, edges are ~0.33?
    // zoom 1, edges are 0
    // console.log("editing plane pos");

    return newPlanePos;
  }

  function updatePlanePositionToFocusOnMesh({ meshRef, instant }: { meshRef: AbstractMesh; instant?: boolean }) {
    function updatePlanePos() {
      const characterPointOnPlane = getPositionOnPlane(meshRef);

      const newPlanePos = getPlanePositionNotOverEdges({
        x: characterPointOnPlane.x / planeSize.x - 0.5,
        y: 1 - characterPointOnPlane.y / planeSize.y - 0.5,
      });

      if (instant) {
        setGlobalState({ planePosGoal: newPlanePos, planePos: newPlanePos });
      } else {
        setGlobalState({ planePosGoal: newPlanePos });
      }
    }
    if (instant) {
      updatePlanePos();
    } else {
      onNextTick(updatePlanePos);
    }
  }

  function focusScenePlaneOnFocusedDoll(instant?: "instant") {
    const { focusedDoll } = getState().global.main;
    const { meshRef } = getRefs().dolls[focusedDoll];
    if (!meshRef) return;
    updatePlanePositionToFocusOnMesh({ meshRef: meshRef, instant: !!instant });
  }

  function getViewSize() {
    const engine = getEngine();
    if (!engine) return defaultSize();
    return {
      width: engine.getRenderWidth(),
      height: engine.getRenderHeight(),
    };
  }

  function checkPointIsInsidePlane(pointOnPlane: Point2D) {
    const sceneSize = backdropSize; // 1280x720 (the point is in here)

    const OUT_OF_FRAME_PADDING = 200;

    const pointSortOfIsInsidePlane = pointInsideRect(
      pointOnPlane,
      measurementToRect({
        width: sceneSize.width + OUT_OF_FRAME_PADDING,
        height: sceneSize.height + OUT_OF_FRAME_PADDING * 3, // Y is easier to go over the edges when the camera angle's low
        x: 0 - OUT_OF_FRAME_PADDING,
        y: 0 - OUT_OF_FRAME_PADDING * 3,
      })
    );

    return pointSortOfIsInsidePlane;
  }

  // This includes after the scenePlane moved
  function convertPointOnPlaneToPointOnScreen({
    pointOnPlane, // point on plane goes from 0 - 1280, 0 - 720, when the point is from the top left to bottom right
    planePos, // plane position is 0 when centered, then its the amount of offset (in percentage?)
    planeZoom,
  }: {
    pointOnPlane: Point2D;
    planePos: Point2D;
    planeZoom: number;
  }) {
    if (!planePos) return defaultPosition();

    const screenSize = getScreenSize();

    const planePosPixels = {
      x: planePos.x * planeSize.x,
      y: planePos.y * planeSize.y,
    };

    const center = { x: planeSize.x / 2, y: planeSize.y / 2 };

    // somehow this works
    function transformIt(point: Point2D, scale: number, translation: Point2D = { x: 0, y: 0 }): Point2D {
      const transformedPoint = {
        x: (point.x + translation.x - center.x) * scale + center.x,
        y: (point.y - translation.y - center.y) * scale + center.y,
      };
      return transformedPoint;
    }

    const transformedPoint = transformIt(pointOnPlane, planeZoom, {
      x: -planePosPixels.x,
      y: -planePosPixels.y,
    });

    const planeToScreenSize = {
      x: screenSize.x / planeSize.x,
      y: screenSize.y / planeSize.y,
    };

    const planeRatio = planeSize.x / planeSize.y; // 16/9
    const screenRatio = screenSize.x / screenSize.y;
    const screenIsThinnerThenVideo = screenRatio < planeRatio;

    let heightDifference = 0;
    let widthDifference = 0;

    let pixelScaler = 1;

    let planeRelativeScreenSize = {
      x: screenSize.x,
      y: screenSize.y,
    };

    if (screenIsThinnerThenVideo) {
      planeRelativeScreenSize = {
        x: screenSize.x / planeToScreenSize.y,
        y: screenSize.y / planeToScreenSize.y,
      };

      widthDifference = (planeRelativeScreenSize.x - planeSize.x) / 2;
      // scale based on fixed height
      pixelScaler = planeToScreenSize.y;
    } else {
      planeRelativeScreenSize = {
        x: screenSize.x / planeToScreenSize.x,
        y: screenSize.y / planeToScreenSize.x,
      };

      heightDifference = (planeRelativeScreenSize.y - planeSize.y) / 2;
      // scale based on fixed width
      pixelScaler = planeToScreenSize.x;
    }

    // NOTE this is only working when it's thinner

    // IN THIN MODE, the height is consistant,
    // in WIDE mode the width is consistant

    let positionOnScreen = {
      x: (transformedPoint.x + widthDifference) * pixelScaler,
      y: (transformedPoint.y + heightDifference) * pixelScaler,
    };

    return positionOnScreen;
  }

  function getShaderTransformStuff() {
    const { planeZoom, planeZoomGoal } = getState().global.main;
    // const planeZoom = prendyStartOptions.zoomLevels.default;

    // NOTE engine.getRenderHeight will return the 'retina'/upscaled resolution
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // check the screen ratio, and compare that to the video ratio
    const videoRatio = planeSize.x / planeSize.y; // 16/9
    const screenRatio = screenWidth / screenHeight;

    const videoXDiff = planeSize.x / screenWidth;
    const videoYDiff = planeSize.y / screenHeight;

    const ratioDiff = screenRatio / videoRatio;

    let stretchVideoX = 1;
    let stretchVideoY = 1;

    let stretchVideoGoalX = 1;
    let stretchVideoGoalY = 1;

    const screenIsThinnerThenVideo = screenRatio < videoRatio;

    // Changing width means same babylon camera zoom, but changing height zooms out,
    // because of camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;

    // the stretch for each is 1 for full stretch

    const editedPlaneZoomX = planeZoom / videoXDiff;
    const editedPlaneZoomY = planeZoom / videoYDiff;

    const editedPlaneZoomGoalX = planeZoomGoal / videoXDiff;
    const editedPlaneZoomGoalY = planeZoomGoal / videoYDiff;

    let editedPlaneSceneZoom = planeZoom;

    stretchVideoX = editedPlaneZoomY * Math.abs(videoXDiff);
    stretchVideoY = editedPlaneZoomY + (Math.abs(videoYDiff) - 1);

    if (screenIsThinnerThenVideo) {
      stretchVideoX = editedPlaneZoomY * Math.abs(videoXDiff);
      stretchVideoY = planeZoom;

      stretchVideoGoalX = editedPlaneZoomGoalY * Math.abs(videoXDiff);
      stretchVideoGoalY = planeZoomGoal;
    } else {
      stretchVideoX = planeZoom;
      stretchVideoY = editedPlaneZoomX * Math.abs(videoYDiff);
      editedPlaneSceneZoom = planeZoom * (screenRatio / videoRatio);

      stretchVideoGoalX = planeZoomGoal;
      stretchVideoGoalY = editedPlaneZoomGoalX * Math.abs(videoYDiff);
    }

    let stretchSceneX = editedPlaneSceneZoom / ratioDiff;
    let stretchSceneY = editedPlaneSceneZoom;

    const editedHardwareScaling = 1 / editedPlaneSceneZoom;

    globalRefs.stretchVideoGoalSize.x = stretchVideoGoalX;
    globalRefs.stretchVideoGoalSize.y = stretchVideoGoalY;
    globalRefs.stretchVideoSize.x = stretchVideoX;
    globalRefs.stretchVideoSize.y = stretchVideoY;
    globalRefs.stretchSceneSize.x = stretchSceneX;
    globalRefs.stretchSceneSize.y = stretchSceneY;

    return {
      editedPlaneSceneZoom,
      editedHardwareScaling,
    };
  }

  return {
    getPositionOnPlane,
    focusScenePlaneOnFocusedDoll,
    getPlanePositionNotOverEdges,
    getViewSize,
    convertPointOnPlaneToPointOnScreen,
    checkPointIsInsidePlane,
    getShaderTransformStuff,
  };
}
