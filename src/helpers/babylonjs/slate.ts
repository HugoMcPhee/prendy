import { AbstractMesh, Camera, Matrix, Vector3 } from "@babylonjs/core";
import { shortenDecimals } from "chootils/dist/numbers";
import { Point2D, copyPoint, defaultPosition } from "chootils/dist/points2d";
import { measurementToRect, pointInsideRect } from "chootils/dist/rects";
import { defaultSize } from "chootils/dist/sizes";
import { ModelName, PrendyOptions, PrendyStoreHelpers } from "../../declarations";
import { get_globalUtils } from "../prendyUtils/global";
import { get_getSceneOrEngineUtils } from "./getSceneOrEngineUtils";

export function getScreenSize() {
  return { x: window.innerWidth, y: window.innerHeight };
}

export const slateSize = { x: 1280, y: 720 };

export function get_slateUtils(storeHelpers: PrendyStoreHelpers, prendyOptions: PrendyOptions) {
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

  function getPositionOnSlate(theMesh: AbstractMesh, modelName: ModelName) {
    // This is a position on the slate itself

    const { nowPlaceName, nowCamName } = getState().global.main;
    const placeRefs = getRefs().places[nowPlaceName];

    const nowCam = placeRefs.camsRefs[nowCamName]?.camera;
    if (!nowCam) return new Vector3();

    // Use the characters head position instead of center position (for speech bubbles)
    const Y_OFFSET = prendyOptions.headHeightOffsets[modelName] ?? 2; // default to 2, just above the model

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

  function getSlatePositionNotOverEdges(slatePos: Point2D, useGoal?: boolean) {
    const newSlatePos = copyPoint(slatePos);

    const stretchVideoX = useGoal ? globalRefs.stretchVideoGoalSize.x : globalRefs.stretchVideoSize.x;
    const stretchVideoY = useGoal ? globalRefs.stretchVideoGoalSize.y : globalRefs.stretchVideoSize.y;

    const maxShiftX = (stretchVideoX - 1) / stretchVideoX / 2;
    const maxShiftY = (stretchVideoY - 1) / stretchVideoY / 2;

    const isOverRightEdge = newSlatePos.x > maxShiftX;
    const isOverLeftEdge = newSlatePos.x < -maxShiftX;
    const isOverBottomEdge = newSlatePos.y > maxShiftY;
    const isOverTopEdge = newSlatePos.y < -maxShiftY;
    const isOverEdge = isOverRightEdge || isOverLeftEdge || isOverBottomEdge || isOverTopEdge;

    if (isOverRightEdge) newSlatePos.x = maxShiftX;
    if (isOverLeftEdge) newSlatePos.x = -maxShiftX;
    if (isOverBottomEdge) newSlatePos.y = maxShiftY;
    if (isOverTopEdge) newSlatePos.y = -maxShiftY;

    newSlatePos.x = shortenDecimals(newSlatePos.x);
    newSlatePos.y = shortenDecimals(newSlatePos.y);

    // zoom 1.5, edges are 0.1625?
    // zoom 2, edges are 0.25
    // zoom 2.5, edges are ~0.3?
    // zoom 3, edges are ~0.33?
    // zoom 1, edges are 0
    // console.log("editing slate pos");

    return newSlatePos;
  }

  function updateSlatePositionToFocusOnMesh({
    meshRef,
    instant,
    model,
  }: {
    meshRef: AbstractMesh;
    instant?: boolean;
    model: ModelName;
  }) {
    function updateSlatePos() {
      const characterPointOnSlate = getPositionOnSlate(meshRef, model);

      const newSlatePos = getSlatePositionNotOverEdges({
        x: characterPointOnSlate.x / slateSize.x - 0.5,
        y: 1 - characterPointOnSlate.y / slateSize.y - 0.5,
      });

      if (instant) {
        setGlobalState({ slatePosGoal: newSlatePos, slatePos: newSlatePos });
      } else {
        setGlobalState({ slatePosGoal: newSlatePos });
      }
    }
    if (instant) {
      updateSlatePos();
    } else {
      onNextTick(updateSlatePos);
    }
  }

  function focusSlateOnFocusedDoll(instant?: "instant") {
    const { focusedDoll } = getState().global.main;
    const { meshRef } = getRefs().dolls[focusedDoll];

    const model = getState().dolls[focusedDoll].modelName;

    if (!meshRef) return;
    updateSlatePositionToFocusOnMesh({ meshRef: meshRef, instant: !!instant, model });
  }

  function getViewSize() {
    const engine = getEngine();
    if (!engine) return defaultSize();
    return {
      width: engine.getRenderWidth(),
      height: engine.getRenderHeight(),
    };
  }

  function checkPointIsInsideSlate(pointOnSlate: Point2D) {
    const sceneSize = backdropSize; // 1280x720 (the point is in here)

    const OUT_OF_FRAME_PADDING = 200;

    const pointSortOfIsInsideSlate = pointInsideRect(
      pointOnSlate,
      measurementToRect({
        width: sceneSize.width + OUT_OF_FRAME_PADDING,
        height: sceneSize.height + OUT_OF_FRAME_PADDING * 3, // Y is easier to go over the edges when the camera angle's low
        x: 0 - OUT_OF_FRAME_PADDING,
        y: 0 - OUT_OF_FRAME_PADDING * 3,
      })
    );

    return pointSortOfIsInsideSlate;
  }

  // This includes after the slate moved
  function convertPointOnSlateToPointOnScreen({
    pointOnSlate, // point on slate goes from 0 - 1280, 0 - 720, when the point is from the top left to bottom right
    slatePos, // slate position is 0 when centered, then its the amount of offset (in percentage?)
    slateZoom,
  }: {
    pointOnSlate: Point2D;
    slatePos: Point2D;
    slateZoom: number;
  }) {
    if (!slatePos) return defaultPosition();

    const screenSize = getScreenSize();

    const slatePosPixels = {
      x: slatePos.x * slateSize.x,
      y: slatePos.y * slateSize.y,
    };

    const center = { x: slateSize.x / 2, y: slateSize.y / 2 };

    // somehow this works
    function transformIt(point: Point2D, scale: number, translation: Point2D = { x: 0, y: 0 }): Point2D {
      const transformedPoint = {
        x: (point.x + translation.x - center.x) * scale + center.x,
        y: (point.y - translation.y - center.y) * scale + center.y,
      };
      return transformedPoint;
    }

    const transformedPoint = transformIt(pointOnSlate, slateZoom, {
      x: -slatePosPixels.x,
      y: -slatePosPixels.y,
    });

    const slateToScreenSize = {
      x: screenSize.x / slateSize.x,
      y: screenSize.y / slateSize.y,
    };

    const slateRatio = slateSize.x / slateSize.y; // 16/9
    const screenRatio = screenSize.x / screenSize.y;
    const screenIsThinnerThenVideo = screenRatio < slateRatio;

    let heightDifference = 0;
    let widthDifference = 0;

    let pixelScaler = 1;

    let slateRelativeScreenSize = {
      x: screenSize.x,
      y: screenSize.y,
    };

    if (screenIsThinnerThenVideo) {
      slateRelativeScreenSize = {
        x: screenSize.x / slateToScreenSize.y,
        y: screenSize.y / slateToScreenSize.y,
      };

      widthDifference = (slateRelativeScreenSize.x - slateSize.x) / 2;
      // scale based on fixed height
      pixelScaler = slateToScreenSize.y;
    } else {
      slateRelativeScreenSize = {
        x: screenSize.x / slateToScreenSize.x,
        y: screenSize.y / slateToScreenSize.x,
      };

      heightDifference = (slateRelativeScreenSize.y - slateSize.y) / 2;
      // scale based on fixed width
      pixelScaler = slateToScreenSize.x;
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
    const { slateZoom, slateZoomGoal } = getState().global.main;
    // const slateZoom = prendyOptions.zoomLevels.default;

    // NOTE engine.getRenderHeight will return the 'retina'/upscaled resolution
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // check the screen ratio, and compare that to the video ratio
    const videoRatio = slateSize.x / slateSize.y; // 16/9
    const screenRatio = screenWidth / screenHeight;

    const videoXDiff = slateSize.x / screenWidth;
    const videoYDiff = slateSize.y / screenHeight;

    const ratioDiff = screenRatio / videoRatio;

    let stretchVideoX = 1;
    let stretchVideoY = 1;

    let stretchVideoGoalX = 1;
    let stretchVideoGoalY = 1;

    const screenIsThinnerThenVideo = screenRatio < videoRatio;

    // Changing width means same babylon camera zoom, but changing height zooms out,
    // because of camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;

    // the stretch for each is 1 for full stretch

    const editedSlateZoomX = slateZoom / videoXDiff;
    const editedSlateZoomY = slateZoom / videoYDiff;

    const editedSlateZoomGoalX = slateZoomGoal / videoXDiff;
    const editedSlateZoomGoalY = slateZoomGoal / videoYDiff;

    let editedSlateSceneZoom = slateZoom;

    stretchVideoX = editedSlateZoomY * Math.abs(videoXDiff);
    stretchVideoY = editedSlateZoomY + (Math.abs(videoYDiff) - 1);

    if (screenIsThinnerThenVideo) {
      stretchVideoX = editedSlateZoomY * Math.abs(videoXDiff);
      stretchVideoY = slateZoom;

      stretchVideoGoalX = editedSlateZoomGoalY * Math.abs(videoXDiff);
      stretchVideoGoalY = slateZoomGoal;
    } else {
      stretchVideoX = slateZoom;
      stretchVideoY = editedSlateZoomX * Math.abs(videoYDiff);
      editedSlateSceneZoom = slateZoom * (screenRatio / videoRatio);

      stretchVideoGoalX = slateZoomGoal;
      stretchVideoGoalY = editedSlateZoomGoalX * Math.abs(videoYDiff);
    }

    let stretchSceneX = editedSlateSceneZoom / ratioDiff;
    let stretchSceneY = editedSlateSceneZoom;

    const editedHardwareScaling = 1 / editedSlateSceneZoom;

    globalRefs.stretchVideoGoalSize.x = stretchVideoGoalX;
    globalRefs.stretchVideoGoalSize.y = stretchVideoGoalY;
    globalRefs.stretchVideoSize.x = stretchVideoX;
    globalRefs.stretchVideoSize.y = stretchVideoY;
    globalRefs.stretchSceneSize.x = stretchSceneX;
    globalRefs.stretchSceneSize.y = stretchSceneY;

    return {
      editedSlateSceneZoom,
      editedHardwareScaling,
    };
  }

  return {
    getPositionOnSlate,
    focusSlateOnFocusedDoll,
    getSlatePositionNotOverEdges,
    getViewSize,
    convertPointOnSlateToPointOnScreen,
    checkPointIsInsideSlate,
    getShaderTransformStuff,
  };
}
