import { AbstractMesh, Camera, Matrix, Mesh, Vector3 } from "@babylonjs/core";
import { makeTyped_globalUtils } from "../prendyUtils/global";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../../stores/typedStoreHelpers";
import { shortenDecimals } from "chootils/dist/numbers";
import { defaultPosition, Point2D } from "chootils/dist/points2d";
import { measurementToRect, pointInsideRect } from "chootils/dist/rects";
import { defaultSize } from "chootils/dist/sizes";

export function makeTyped_scenePlaneUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions) {
  const { getRefs, getState } = storeHelpers;

  const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
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

    if (!globalRefs.scenePlane) return new Vector3();

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
    // position = setting where a mesh is,
    // point = a point

    const meshPointOnPlane = getPositionOnPlane(meshRef);
    // const meshSafePointOnPlane = convertToSafePointOnPlane(meshPointOnPlane);

    const safePlanePosition = getSafePlanePositionFocusedOnPointOnPlain(meshPointOnPlane);

    const safeNumbersSafePlanePosition = {
      x: shortenDecimals(safePlanePosition.x),
      y: shortenDecimals(safePlanePosition.y),
    };

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
    if (!globalRefs.scenePlane) return;
    return globalRefs.scenePlane.getEngine();
  }

  function getViewSize() {
    const engine = getSceneEngine();
    if (!engine) return defaultSize();
    return {
      width: engine.getRenderWidth(),
      height: engine.getRenderHeight(),
    };
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

  function planeCenterPoint() {
    const planeUnzoomedSize = backdropImageSize;

    const planeCenterPoint = {
      x: planeUnzoomedSize.width / 2,
      y: planeUnzoomedSize.height / 2,
    };
    return planeCenterPoint;
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
    const planeSize = getPlaneSize();

    thePlane.scaling.y = planeSize.height;
    thePlane.scaling.x = planeSize.width;
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
    // if (!pointSortOfIsInsidePlane) {
    //   return planeCenterPoint();
    // }
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
    planePosition, // plane position is 0 when centered, then its the amount of offset in pixels
  }: {
    pointOnPlane: Point2D;
    planePosition: Point2D;
  }) {
    if (!planePosition) return defaultPosition();
    const viewSize = getViewSize();
    const planeSize = getPlaneSize();

    const unmovedPointOnScreen = convertPointOnPlaneToUnmovedPointOnScreen(pointOnPlane);

    const amountClippedView = {
      x: planeSize.width - viewSize.width,
      y: planeSize.height - viewSize.height,
    };

    const pointOnScreen = {
      x: unmovedPointOnScreen.x + planePosition.x - amountClippedView.x / 2,
      y: unmovedPointOnScreen.y + -planePosition.y - amountClippedView.y / 2,
    };

    // maybe just get point on plane, then add the plane position?

    return pointOnScreen;
  }

  //

  // NOTE WARNING this might not work chen rotating phoen or changing screen size,
  const cachedParams = {
    identityMatrix: null as null | Matrix,
    // scenePlaneCamTransformMatrix: null as null | Matrix,
  };

  function getScenePlanePositionOnScreen(thePosition: Vector3) {
    if (!globalRefs.scenePlane) return new Vector3();
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
    if (!globalRefs.scenePlane) return { top: 0, bottom: 0, left: 0, right: 0 };

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

    if (amountOverEdges.bottom < 0) {
      newPlanePosition.y += amountOverEdges.bottom;
    }
    if (amountOverEdges.top < 0) {
      newPlanePosition.y -= amountOverEdges.top;
    }
    if (amountOverEdges.left < 0) {
      newPlanePosition.x += amountOverEdges.left;
    }
    if (amountOverEdges.right < 0) {
      newPlanePosition.x -= amountOverEdges.right;
    }

    // And also ideally take zoom into account somehow (keep a zoom level / scale variable to alter the xywidthheight stuff)
    // also have it smothely go towards it? spring? :)
    return newPlanePosition;
  }

  function applyPlanePosition(planePosition: { x: number; y: number }) {
    if (!globalRefs.scenePlane) return;
    // And also ideally take zoom into account somehow (keep a zoom level / scale variable to alter the xywidthheight stuff)
    fitScenePlaneToScreen(globalRefs.scenePlane);
    // also have it smothely go towards it? spring? :)
    globalRefs.scenePlane.position.x = planePosition.x;
    globalRefs.scenePlane.position.y = planePosition.y;
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

  return {
    getPositionOnPlane,
    updatePlanePositionToFocusOnMesh,
    focusScenePlaneOnFocusedDoll,
    getViewSize,
    getPlaneSize,
    planeCenterPoint,
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
  };
}
