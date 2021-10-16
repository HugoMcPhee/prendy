export function makeVideoElementFromPath(filepath) {
    const videoElement = document.createElement("video");
    videoElement.controls = false;
    videoElement.muted = true; // allow playing without interaction
    videoElement.playsInline = true;
    videoElement.loop = true;
    videoElement.src = filepath;
    const randomVideoId = Math.random().toString();
    videoElement.id = randomVideoId;
    return videoElement;
}
