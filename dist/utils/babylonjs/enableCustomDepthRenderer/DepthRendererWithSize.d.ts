import { RenderTargetTexture, Scene, Camera, Nullable, SubMesh } from "@babylonjs/core";
/**
 * This represents a depth renderer in Babylon.
 * A depth renderer will render to it's depth map every frame which can be displayed or used in post processing
 */
export declare class DepthRendererWithSize {
    private _scene;
    private _depthMap;
    private _effect;
    private readonly _storeNonLinearDepth;
    private readonly _clearColor;
    /** Get if the depth renderer is using packed depth or not */
    readonly isPacked: boolean;
    private _cachedDefines;
    private _camera;
    /** Enable or disable the depth renderer. When disabled, the depth texture is not updated */
    enabled: boolean;
    /**
     * Specifiess that the depth renderer will only be used within
     * the camera it is created for.
     * This can help forcing its rendering during the camera processing.
     */
    useOnlyInActiveCamera: boolean;
    /** @hidden */
    static _SceneComponentInitialization: (scene: Scene) => void;
    /**
     * Instantiates a depth renderer
     * @param scene The scene the renderer belongs to
     * @param type The texture type of the depth map (default: Engine.TEXTURETYPE_FLOAT)
     * @param camera The camera to be used to render the depth map (default: scene's active camera)
     * @param storeNonLinearDepth Defines whether the depth is stored linearly like in Babylon Shadows or directly like glFragCoord.z
     */
    constructor(scene: Scene, type: number | undefined, camera: Nullable<Camera> | undefined, storeNonLinearDepth: boolean | undefined, customSize: {
        width: number;
        height: number;
    });
    /**
     * Creates the depth rendering effect and checks if the effect is ready.
     * @param subMesh The submesh to be used to render the depth map of
     * @param useInstances If multiple world instances should be used
     * @returns if the depth renderer is ready to render the depth map
     */
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    /**
     * Gets the texture which the depth map will be written to.
     * @returns The depth map texture
     */
    getDepthMap(): RenderTargetTexture;
    /**
     * Disposes of the depth renderer.
     */
    dispose(): void;
}
