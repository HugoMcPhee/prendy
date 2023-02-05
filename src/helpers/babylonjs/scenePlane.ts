import { AbstractMesh, Camera, Effect, Matrix, Mesh, Vector3 } from "@babylonjs/core";
import { get_globalUtils } from "../prendyUtils/global";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../../stores/typedStoreHelpers";
import { shortenDecimals } from "chootils/dist/numbers";
import { defaultPosition, Point2D } from "chootils/dist/points2d";
import { measurementToRect, pointInsideRect } from "chootils/dist/rects";
import { defaultSize } from "chootils/dist/sizes";
import { get_getSceneOrEngineUtils } from "./getSceneOrEngineUtils";

export function get_scenePlaneUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions) {
  const { getRefs, getState } = storeHelpers;

  const { setGlobalState } = get_globalUtils(storeHelpers);
  const globalRefs = getRefs().global.main;

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

    // if (!globalRefs.scenePlane) return new Vector3();

    const { nowPlaceName } = getState().global.main;
    const { nowCamName } = getState().places[nowPlaceName];
    const placeRefs = getRefs().places[nowPlaceName];

    const currentCamera = placeRefs.camsRefs[nowCamName].camera;
    if (!currentCamera) return new Vector3();

    // FIXME Temporary value to use the characters head position instead of center position
    const Y_OFFSET = prendyStartOptions.headHeightOffset;

    return Vector3.Project(
      new Vector3(theMesh.position.x, theMesh.position.y + Y_OFFSET, theMesh.position.z),
      Matrix.Identity(),
      currentCamera
        .getViewMatrix()
        // .multiply(currentCamera.getProjectionMatrix()),
        .multiply(getProjectionMatrixCustomSize(currentCamera, globalRefs.backdropImageSize)),
      currentCamera.viewport.toGlobal(globalRefs.backdropImageSize.width, globalRefs.backdropImageSize.height)
    );
  }

  function updatePlanePositionToFocusOnMesh({ meshRef, instant }: { meshRef: AbstractMesh; instant?: boolean }) {
    const { planeZoom } = getState().global.main;

    const planeSize = { x: 1280, y: 720 };

    const characterPointOnPlane = getPositionOnPlane(meshRef);

    const stretchVideoX = globalRefs.stretchVideoSize.x;
    const stretchVideoY = globalRefs.stretchVideoSize.y;

    let testShiftX = characterPointOnPlane.x / planeSize.x - 0.5;
    let testShiftY = 1 - characterPointOnPlane.y / planeSize.y - 0.5;

    const maxShiftX = (stretchVideoX - 1) / stretchVideoX / 2;
    const maxShiftY = (stretchVideoY - 1) / stretchVideoY / 2;

    if (testShiftX > maxShiftX) testShiftX = maxShiftX;
    if (testShiftX < -maxShiftX) testShiftX = -maxShiftX;
    if (testShiftY > maxShiftY) testShiftY = maxShiftY;
    if (testShiftY < -maxShiftY) testShiftY = -maxShiftY;

    const safeNumbersSafePlanePosition = {
      x: shortenDecimals(testShiftX),
      y: shortenDecimals(testShiftY),
    };

    // zoom 1.5, edges are 0.1625?
    // zoom 2, edges are 0.25
    // zoom 2.5, edges are ~0.3?
    // zoom 3, edges are ~0.33?
    // zoom 1, edges are 0

    if (instant) {
      setGlobalState({
        planePosGoal: safeNumbersSafePlanePosition,
        planePos: safeNumbersSafePlanePosition,
      });
    } else {
      setGlobalState({ planePosGoal: safeNumbersSafePlanePosition });
    }
  }

  function focusScenePlaneOnFocusedDoll(instant?: "instant") {
    const { focusedDoll } = getState().global.main;
    const { meshRef } = getRefs().dolls[focusedDoll];
    if (!meshRef) return;
    updatePlanePositionToFocusOnMesh({ meshRef: meshRef, instant: !!instant });
  }

  const { backdropImageSize } = getRefs().global.main;

  function getSceneEngine() {
    const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);
    return getEngine();
    // if (!globalRefs.scenePlane) return getEngine();
    // return globalRefs.scenePlane.getEngine();
  }

  function getViewSize() {
    const engine = getSceneEngine();
    if (!engine) return defaultSize();
    return {
      width: engine.getRenderWidth(),
      height: engine.getRenderHeight(),
    };
  }

  function getScreenSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  function getPlaneSize(useGoalZoom = false) {
    const viewSize = getViewSize();

    const globalState = getState().global.main;
    const planeZoom = useGoalZoom ? globalState.planeZoomGoal : globalState.planeZoom;

    const viewAspectRatio = viewSize.width / viewSize.height;
    const planeAspectRatio = 16 / 9;

    const viewIsThinner = viewAspectRatio < planeAspectRatio;

    if (viewIsThinner) {
      return {
        width: planeZoom * viewSize.height * planeAspectRatio,
        height: planeZoom * viewSize.height,
      };
    } else {
      return {
        width: planeZoom * viewSize.width,
        height: (planeZoom * viewSize.width) / planeAspectRatio,
      };
    }
  }

  function viewCenterPoint() {
    const viewSize = getViewSize();

    const viewCenterPoint = {
      x: viewSize.width / 2,
      y: viewSize.height / 2,
    };
    return viewCenterPoint;
  }

  function fitScenePlaneToScreen(thePlane: Mesh) {
    // const planeSize = getPlaneSize();
    // thePlane.scaling.y = planeSize.height;
    // thePlane.scaling.x = planeSize.width;
  }

  // This is before ScnePlane's moved!
  // might need to store scenePlane position in miniworld
  function convertPointOnPlaneToUnmovedPointOnScreen(thePoint: { x: number; y: number }) {
    const sceneSize = backdropImageSize; // 1280x720 (the point is in here)
    const planeSize = getPlaneSize(); // fits to screen width or height (need to convert point to here) (same spect ratio as sceneSize)
    // const viewSize = getViewSize(); // screen width and height

    const sceneToPlaneSizeMultiplier = {
      width: planeSize.width / sceneSize.width,
      height: planeSize.height / sceneSize.height,
    };

    return {
      x: thePoint.x * sceneToPlaneSizeMultiplier.width,
      y: thePoint.y * sceneToPlaneSizeMultiplier.height,
    };
  }
  //

  // todo could maybe cleanup some of this plane stuff
  // TODO change it so pointOnPlane is normalized, and try to not invole 1280x720, maybe only 16x9
  function convertToSafePointOnPlane(pointOnPlane: Point2D) {
    // const planeSize = getPlaneSize();
    const sceneSize = backdropImageSize; // 1280x720 (the point is in here)

    const OUT_OF_FRAME_PADDING = 200;
    // const OUT_OF_FRAME_PADDING = 0;

    const pointSortOfIsInsidePlane = pointInsideRect(
      pointOnPlane,
      measurementToRect({
        width: sceneSize.width + OUT_OF_FRAME_PADDING,
        height: sceneSize.height + OUT_OF_FRAME_PADDING * 3, // Y is easier to go over the edges when the camera angle's low
        x: 0 - OUT_OF_FRAME_PADDING,
        y: 0 - OUT_OF_FRAME_PADDING * 3,
      })
    );
    return pointOnPlane;
  }

  function checkPointIsInsidePlane(pointOnPlane: Point2D) {
    // const planeSize = getPlaneSize();
    const sceneSize = backdropImageSize; // 1280x720 (the point is in here)

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

    const screenSize = { x: window.innerWidth, y: window.innerHeight };
    const planeSize = { x: 1280, y: 720 };

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
    // in WIDE mode the width is consistnat

    let positionOnScreen = {
      x: (transformedPoint.x + widthDifference) * pixelScaler,
      y: (transformedPoint.y + heightDifference) * pixelScaler,
    };

    return positionOnScreen;
  }

  //

  // NOTE WARNING this might not work chen rotating phoen or changing screen size,
  const cachedParams = {
    identityMatrix: null as null | Matrix,
    // scenePlaneCamTransformMatrix: null as null | Matrix,
  };

  function getScenePlanePositionOnScreen(thePosition: Vector3) {
    // if (!globalRefs.scenePlane) return new Vector3();
    const currentCamera = globalRefs.scenePlaneCamera;
    if (!currentCamera) return new Vector3();
    const viewSize = getViewSize();

    if (!cachedParams.identityMatrix) {
      cachedParams.identityMatrix = Matrix.Identity();
    }

    // if (!cachedParams.scenePlaneCamTransformMatrix) {
    //   cachedParams.scenePlaneCamTransformMatrix = currentCamera
    //     .getViewMatrix()
    //     .multiply(currentCamera.getProjectionMatrix());
    // }

    return Vector3.Project(
      thePosition,
      cachedParams.identityMatrix,
      currentCamera.getViewMatrix().multiply(currentCamera.getProjectionMatrix()),
      currentCamera.viewport.toGlobal(viewSize.width, viewSize.height)
    );
  }

  function getScenePlaneOverScreenEdgesAmount(newPosition: { x: number; y: number }) {
    // const zoomLevel = getState().global.main.zoomLevel;
    // if (!globalRefs.scenePlane) return { top: 0, bottom: 0, left: 0, right: 0 };

    const screenPosition = { x: 0, y: 0 };
    const viewSize = getViewSize();
    const planeSize = getPlaneSize();
    // const screenHalfSize = {
    //   x: viewSize.width / 2,
    //   y: viewSize.height / 2,
    // };
    const planeHalfSize = {
      x: planeSize.width / 2,
      y: planeSize.height / 2,
    };

    const planePositionOnScreenVector = getScenePlanePositionOnScreen(new Vector3(newPosition.x, newPosition.y, 0));
    const planePositionOnScreen = {
      x: planePositionOnScreenVector.x,
      y: planePositionOnScreenVector.y,
    };

    const planeEdgesOnScreen = {
      top: planePositionOnScreen.y - planeHalfSize.y,
      bottom: planePositionOnScreen.y + planeHalfSize.y,
      left: planePositionOnScreen.x - planeHalfSize.x,
      right: planePositionOnScreen.x + planeHalfSize.x,
    };

    const amountOverEdges = {
      top: shortenDecimals(screenPosition.y - planeEdgesOnScreen.top),
      bottom: shortenDecimals(planeEdgesOnScreen.bottom - viewSize.height),
      left: shortenDecimals(screenPosition.x - planeEdgesOnScreen.left),
      right: shortenDecimals(planeEdgesOnScreen.right - viewSize.width),
    };

    return amountOverEdges;
  }

  function getSafePlanePositionFocusedOnPointOnPlain(pointOnPlane: Point2D) {
    // const
    const planeSize = getPlaneSize();

    const planeCenterPoint = {
      x: planeSize.width / 2,
      y: planeSize.height / 2,
    };

    const scaledPointOnPlane = convertPointOnPlaneToUnmovedPointOnScreen(pointOnPlane);

    // once this works it should work for any point on the plane woo
    // also limiting it to the egdes
    // and zoom

    const newPlanePosition = {
      x: planeCenterPoint.x - scaledPointOnPlane.x,
      y: scaledPointOnPlane.y - planeCenterPoint.y,
    };
    // console.log(newPlanePosition);

    const amountOverEdges = getScenePlaneOverScreenEdgesAmount(newPlanePosition);

    if (amountOverEdges.bottom < 0) newPlanePosition.y += amountOverEdges.bottom;
    if (amountOverEdges.top < 0) newPlanePosition.y -= amountOverEdges.top;
    if (amountOverEdges.left < 0) newPlanePosition.x += amountOverEdges.left;
    if (amountOverEdges.right < 0) newPlanePosition.x -= amountOverEdges.right;

    // And also ideally take zoom into account somehow (keep a zoom level / scale variable to alter the xywidthheight stuff)
    // also have it smothely go towards it? spring? :)
    return newPlanePosition;
  }

  function applyPlanePosition(planePosition: { x: number; y: number }) {
    // if (!globalRefs.scenePlane) return;
    // And also ideally take zoom into account somehow (keep a zoom level / scale variable to alter the xywidthheight stuff)
    // fitScenePlaneToScreen(globalRefs.scenePlane);
    // also have it smothely go towards it? spring? :)
    // globalRefs.scenePlane.position.x = planePosition.x;
    // globalRefs.scenePlane.position.y = planePosition.y;
  }

  function convertScreenPointToPlaneScenePoint(theScreenPoint: { x: number; y: number }) {
    const viewSize = getViewSize();
    return {
      x: theScreenPoint.x - viewSize.width / 2,
      y: theScreenPoint.y - viewSize.height / 2,
    };
  }

  function convertPlaneScenePointToScreenPoint(thePlaneScenePoint: { x: number; y: number }) {
    const viewSize = getViewSize();
    return {
      x: thePlaneScenePoint.x + viewSize.width / 2,
      y: thePlaneScenePoint.y + viewSize.height / 2,
    };
  }

  // -----------
  // new
  function getShaderTransformStuff() {
    const { planeZoom } = getState().global.main;
    // const planeZoom = prendyStartOptions.zoomLevels.default;

    // NOTE engine.getRenderHeight will return the 'retina'/upscaled resolution
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // check the screen ratio, and compare that to the video ratio
    const videoRatio = 1280 / 720; // 16/9
    const screenRatio = screenWidth / screenHeight;

    const videoXDiff = 1280 / screenWidth;
    const videoYDiff = 720 / screenHeight;

    const ratioDiff = screenRatio / videoRatio;

    let stretchVideoX = 1;
    let stretchVideoY = 1;

    const screenIsThinnerThenVideo = screenRatio < videoRatio;

    // Changing width means same babylon camera zoom, but changing height zooms out,
    // because of camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;

    // the stretch for each is 1 for full stretch

    const editedPlaneZoomX = planeZoom / videoXDiff;
    const editedPlaneZoomY = planeZoom / videoYDiff;

    let editedPlaneSceneZoom = planeZoom;

    stretchVideoX = editedPlaneZoomY * Math.abs(videoXDiff);
    stretchVideoY = editedPlaneZoomY + (Math.abs(videoYDiff) - 1);

    if (screenIsThinnerThenVideo) {
      stretchVideoX = editedPlaneZoomY * Math.abs(videoXDiff);
      stretchVideoY = planeZoom;
    } else {
      stretchVideoX = planeZoom;
      stretchVideoY = editedPlaneZoomX * Math.abs(videoYDiff);
      editedPlaneSceneZoom = planeZoom * (screenRatio / videoRatio);
    }

    let stretchSceneX = editedPlaneSceneZoom / ratioDiff;
    let stretchSceneY = editedPlaneSceneZoom;

    const editedHardwareScaling = 1 / editedPlaneSceneZoom;

    return {
      stretchVideoX,
      stretchVideoY,
      stretchSceneX,
      stretchSceneY,
      editedPlaneSceneZoom,
      editedHardwareScaling,
    };
  }

  function getClampedPlanePosInfo(planePos: Point2D) {
    const planeSize = { x: 1280, y: 720 };

    const stretchVideoX = globalRefs.stretchVideoSize.x;
    const stretchVideoY = globalRefs.stretchVideoSize.y;

    let newShiftX = planePos.x;
    let newShiftY = planePos.y;

    const maxShiftX = (stretchVideoX - 1) / stretchVideoX / 2;
    const maxShiftY = (stretchVideoY - 1) / stretchVideoY / 2;

    if (newShiftX > maxShiftX) newShiftX = maxShiftX;
    if (newShiftX < -maxShiftX) newShiftX = -maxShiftX;
    if (newShiftY > maxShiftY) newShiftY = maxShiftY;
    if (newShiftY < -maxShiftY) newShiftY = -maxShiftY;

    const safeNumbersSafePlanePosition = {
      x: shortenDecimals(newShiftX),
      y: shortenDecimals(newShiftY),
    };

    const wasOutsideBoundary =
      safeNumbersSafePlanePosition.x !== planePos.x || safeNumbersSafePlanePosition.y !== planePos.y;

    return { newPlanePos: safeNumbersSafePlanePosition, wasOutsideBoundary };
  }

  return {
    getPositionOnPlane,
    updatePlanePositionToFocusOnMesh,
    focusScenePlaneOnFocusedDoll,
    getViewSize,
    getScreenSize,
    getPlaneSize,
    // planeCenterPoint,
    viewCenterPoint,
    fitScenePlaneToScreen,
    convertPointOnPlaneToUnmovedPointOnScreen,
    convertToSafePointOnPlane,
    convertPointOnPlaneToPointOnScreen,
    getScenePlaneOverScreenEdgesAmount,
    getSafePlanePositionFocusedOnPointOnPlain,
    applyPlanePosition,
    convertScreenPointToPlaneScenePoint,
    convertPlaneScenePointToScreenPoint,
    checkPointIsInsidePlane,
    //
    getShaderTransformStuff,
    //
    getClampedPlanePosInfo,
  };
}
