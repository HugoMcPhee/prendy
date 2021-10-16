import { Constants } from "@babylonjs/core";
import { DepthRendererWithSize } from "./DepthRendererWithSize";
export function enableCustomDepthRenderer(scene, depthRenderSize, camera, storeNonLinearDepth = false) {
    camera = camera || scene.activeCamera;
    if (!camera) {
        throw new Error("No camera available to enable depth renderer");
    }
    var textureType = 0;
    if (scene.getEngine().getCaps().textureHalfFloatRender) {
        textureType = Constants.TEXTURETYPE_HALF_FLOAT;
    }
    else if (scene.getEngine().getCaps().textureFloatRender) {
        textureType = Constants.TEXTURETYPE_FLOAT;
    }
    else {
        textureType = Constants.TEXTURETYPE_UNSIGNED_BYTE;
    }
    const newDepthRenderer = new DepthRendererWithSize(scene, textureType, camera, storeNonLinearDepth, depthRenderSize);
    return newDepthRenderer;
}
export function disableCustomDepthRenderer(customDepthRenderer) {
    customDepthRenderer.dispose();
}
