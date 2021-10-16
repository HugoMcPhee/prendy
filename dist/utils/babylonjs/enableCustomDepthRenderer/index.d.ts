import { Nullable, Camera, Scene } from "@babylonjs/core";
import { DepthRendererWithSize } from "./DepthRendererWithSize";
import { Size } from "shutils/dist/sizes";
export declare function enableCustomDepthRenderer(scene: Scene, depthRenderSize: Size, camera?: Nullable<Camera>, storeNonLinearDepth?: boolean): DepthRendererWithSize;
export declare function disableCustomDepthRenderer(customDepthRenderer: DepthRendererWithSize): void;
