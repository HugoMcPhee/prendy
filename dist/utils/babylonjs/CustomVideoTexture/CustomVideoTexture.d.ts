import { Texture, Scene, Nullable } from "@babylonjs/core";
/**
 * Settings for finer control over video usage
 */
export interface VideoTextureSettings {
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    autoUpdateTexture: boolean;
    onVideoError?: () => void;
}
/**
 * If you want to display a video in your scene, this is the special texture for that.
 * This special texture works similar to other textures, with the exception of a few parameters.
 */
export declare class CustomVideoTexture extends Texture {
    /**
     * Tells whether textures will be updated automatically or user is required to call `updateTexture` manually
     */
    readonly autoUpdateTexture: boolean;
    /**
     * The video instance used by the texture internally
     */
    video: HTMLVideoElement;
    private _generateMipMaps;
    private _stillImageCaptured;
    private _settings;
    private _frameId;
    private _currentSrc;
    /**
     * Creates a video texture.
     * If you want to display a video in your scene, this is the special texture for that.
     * This special texture works similar to other textures, with the exception of a few parameters.
     * @see https://doc.babylonjs.com/how_to/video_texture
     * @param name optional name, will detect from video source, if not defined
     * @param src can be used to provide an url, array of urls or an already setup HTML video element.
     * @param scene is obviously the current scene.
     * @param generateMipMaps can be used to turn on mipmaps (Can be expensive for videoTextures because they are often updated).
     * @param invertY is false by default but can be used to invert video on Y axis
     * @param samplingMode controls the sampling method and is set to TRILINEAR_SAMPLINGMODE by default
     * @param settings allows finer control over video usage
     */
    constructor(name: Nullable<string>, src: HTMLVideoElement, scene: Nullable<Scene>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, settings?: VideoTextureSettings);
    private _getName;
    private _createInternalTexture;
    reset: () => void;
    /**
     * @hidden Internal method to initiate `update`.
     */
    _rebuild(): void;
    /**
     * Update Texture in the `auto` mode. Does not do anything if `settings.autoUpdateTexture` is false.
     */
    update(): void;
    /**
     * Update Texture in `manual` mode. Does not do anything if not visible or paused.
     * @param isVisible Visibility state, detected by user using `scene.getActiveMeshes()` or otherwise.
     */
    updateTexture(isVisible: boolean): void;
    protected _updateInternalTexture: () => void;
    updateVid(newVid: HTMLVideoElement): void;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
}
