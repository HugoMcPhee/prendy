import { Nullable, Camera, Scene, Constants } from "@babylonjs/core";
import { DepthRendererWithSize } from "./DepthRendererWithSize";
import { Size } from "chootils/dist/sizes";

export function enableCustomDepthRenderer(
  scene: Scene,
  depthRenderSize: Size,
  camera?: Nullable<Camera>,
  storeNonLinearDepth = false
): DepthRendererWithSize {
  camera = camera || scene.activeCamera;
  if (!camera) {
    throw new Error("No camera available to enable depth renderer");
  }
  var textureType = 0;
  if (scene.getEngine().getCaps().textureHalfFloatRender) {
    textureType = Constants.TEXTURETYPE_HALF_FLOAT;
  } else if (scene.getEngine().getCaps().textureFloatRender) {
    textureType = Constants.TEXTURETYPE_FLOAT;
  } else {
    textureType = Constants.TEXTURETYPE_UNSIGNED_BYTE;
  }

  const newDepthRenderer = new DepthRendererWithSize(
    scene,
    textureType,
    camera,
    storeNonLinearDepth,
    depthRenderSize
  );

  return newDepthRenderer;
}

export function disableCustomDepthRenderer(
  customDepthRenderer: DepthRendererWithSize
): void {
  customDepthRenderer.dispose();
}
