// import "../../Engines/Extensions/engine.videoTexture";
// import "../../Engines/Extensions/engine.dynamicTexture";
import { Texture, Tools } from "@babylonjs/core";
/**
 * If you want to display a video in your scene, this is the special texture for that.
 * This special texture works similar to other textures, with the exception of a few parameters.
 */
export class CustomVideoTexture extends Texture {
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
    constructor(name, src, scene, generateMipMaps = false, invertY = false, samplingMode = Texture.TRILINEAR_SAMPLINGMODE, settings = {
        autoPlay: false,
        loop: true,
        autoUpdateTexture: true,
    }) {
        super(null, scene, !generateMipMaps, invertY);
        this._stillImageCaptured = false;
        this._frameId = -1;
        this._currentSrc = null;
        this._createInternalTexture = () => {
            if (this._texture != null) {
                return;
            }
            if (!this._getEngine().needPOTTextures ||
                (Tools.IsExponentOfTwo(this.video.videoWidth) &&
                    Tools.IsExponentOfTwo(this.video.videoHeight))) {
                this.wrapU = Texture.WRAP_ADDRESSMODE;
                this.wrapV = Texture.WRAP_ADDRESSMODE;
            }
            else {
                this.wrapU = Texture.CLAMP_ADDRESSMODE;
                this.wrapV = Texture.CLAMP_ADDRESSMODE;
                this._generateMipMaps = false;
            }
            this._texture = this._getEngine().createDynamicTexture(this.video.videoWidth, this.video.videoHeight, this._generateMipMaps, 
            // false,
            this.samplingMode);
            if (!this.video.autoplay) {
                // let oldHandler = this.video.onplaying;
                // let error = false;
                // let oldMuted = this.video.muted;
                // this.video.muted = true;
                // this.video.onplaying = () => {
                //   this.video.muted = oldMuted;
                //   this.video.onplaying = oldHandler;
                //   this._updateInternalTexture();
                //   if (!error) {
                //     // this.video.pause();
                //   }
                //   if (this.onLoadObservable.hasObservers()) {
                //     this.onLoadObservable.notifyObservers(this);
                //   }
                // };
                // var playing = this.video.play();
                // if (playing) {
                //   playing
                //     .then(() => {
                //       // Everything is good.
                //     })
                //     .catch(() => {
                //       error = true;
                //       // On Chrome for instance, new policies might prevent playing without user interaction.
                //       this._settings.onVideoError?.();
                //     });
                // } else {
                //   this.video.onplaying = oldHandler;
                //   this._updateInternalTexture();
                //   if (this.onLoadObservable.hasObservers()) {
                //     this.onLoadObservable.notifyObservers(this);
                //   }
                // }
            }
            else {
                this._updateInternalTexture();
                if (this.onLoadObservable.hasObservers()) {
                    this.onLoadObservable.notifyObservers(this);
                }
            }
        };
        // private reset = (): void => {
        this.reset = () => {
            if (this._texture == null) {
                return;
            }
            this._texture.dispose();
            this._texture = null;
        };
        this._updateInternalTexture = () => {
            if (this._texture == null) {
                return;
            }
            if (this.video.readyState < this.video.HAVE_CURRENT_DATA) {
                return;
            }
            let frameId = this.getScene().getFrameId();
            if (this._frameId === frameId) {
                return;
            }
            this._frameId = frameId;
            this._getEngine().updateVideoTexture(this._texture, this.video, this._invertY);
        };
        this._generateMipMaps = generateMipMaps;
        this._initialSamplingMode = samplingMode;
        this.autoUpdateTexture = settings.autoUpdateTexture;
        this._currentSrc = src;
        this.name = name || this._getName(src);
        this.video = src;
        this._settings = settings;
        if (settings.autoPlay !== undefined) {
            this.video.autoplay = settings.autoPlay;
        }
        if (settings.loop !== undefined) {
            this.video.loop = settings.loop;
        }
        if (settings.muted !== undefined) {
            this.video.muted = settings.muted;
        }
        this.video.setAttribute("playsinline", "");
        this.video.addEventListener("playing", this._updateInternalTexture); // custom
        this.video.addEventListener("paused", this._updateInternalTexture);
        this.video.addEventListener("seeked", this._updateInternalTexture);
        this.video.addEventListener("emptied", this.reset);
        this.video.addEventListener("canplay", this._createInternalTexture);
        if (settings.autoPlay) {
            this.video.play();
        }
        const videoHasEnoughData = this.video.readyState >= this.video.HAVE_CURRENT_DATA;
        if (videoHasEnoughData) {
            this._createInternalTexture();
        }
    }
    _getName(src) {
        if (src instanceof HTMLVideoElement) {
            return src.currentSrc;
        }
        if (typeof src === "object") {
            return src.toString();
        }
        return src;
    }
    /**
     * @hidden Internal method to initiate `update`.
     */
    _rebuild() {
        this.update();
    }
    /**
     * Update Texture in the `auto` mode. Does not do anything if `settings.autoUpdateTexture` is false.
     */
    update() {
        if (!this.autoUpdateTexture) {
            // Expecting user to call `updateTexture` manually
            return;
        }
        this.updateTexture(true);
    }
    /**
     * Update Texture in `manual` mode. Does not do anything if not visible or paused.
     * @param isVisible Visibility state, detected by user using `scene.getActiveMeshes()` or otherwise.
     */
    updateTexture(isVisible) {
        if (!isVisible) {
            return;
        }
        if (this.video.paused && this._stillImageCaptured) {
            return;
        }
        this._stillImageCaptured = true;
        this._updateInternalTexture();
    }
    updateVid(newVid) {
        // if (this.video === newVid) {
        //   return;
        // }
        // dispose some video stuff
        this._currentSrc = null;
        this.video.removeEventListener("playing", this._updateInternalTexture); // custom
        this.video.removeEventListener("canplay", this._createInternalTexture);
        this.video.removeEventListener("paused", this._updateInternalTexture);
        this.video.removeEventListener("seeked", this._updateInternalTexture);
        this.video.removeEventListener("emptied", this.reset);
        //
        this.video = newVid;
        this._currentSrc = newVid;
        // readd some stuff
        this.video.setAttribute("playsinline", "");
        this.video.addEventListener("playing", this._updateInternalTexture); // custom
        this.video.addEventListener("paused", this._updateInternalTexture);
        this.video.addEventListener("seeked", this._updateInternalTexture);
        this.video.addEventListener("emptied", this.reset);
        this.video.addEventListener("canplay", this._createInternalTexture);
        this._updateInternalTexture();
        if (this.onLoadObservable.hasObservers()) {
            this.onLoadObservable.notifyObservers(this);
        }
    }
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose() {
        super.dispose();
        this._currentSrc = null;
        this.video.removeEventListener("playing", this._updateInternalTexture); // custom
        this.video.removeEventListener("canplay", this._createInternalTexture);
        this.video.removeEventListener("paused", this._updateInternalTexture);
        this.video.removeEventListener("seeked", this._updateInternalTexture);
        this.video.removeEventListener("emptied", this.reset);
        // this.video.pause();
    }
}
