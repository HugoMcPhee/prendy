import { Nullable, Camera, Scene, Constants, DepthRenderer } from "@babylonjs/core";
import { DepthRendererWithSize } from "./DepthRendererWithSize";
import { Size } from "chootils/dist/sizes";

// NOTE this may be able to use the standard enableDepthRenderer again

export function enableCustomDepthRenderer(
  scene: Scene,
  depthRenderSize: number,
  camera?: Nullable<Camera>,
  storeNonLinearDepth = false
): DepthRenderer {
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

  const newDepthRenderer = new DepthRenderer(scene, textureType, camera, storeNonLinearDepth);

  return newDepthRenderer;
}

export function disableCustomDepthRenderer(customDepthRenderer: DepthRendererWithSize): void {
  customDepthRenderer.dispose();
}
