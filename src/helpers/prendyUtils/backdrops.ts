import { getState } from "repond";
import { getGlobalState } from "../../helpers/prendyUtils/global";
import { meta } from "../../meta";

export function getNowBackdropFrameInfo() {
  const { placeInfoByName } = meta.assets!;
  const { nowPlaceName, nowSegmentName, nowCamName } = getGlobalState();
  const { backdropsByCamera } = placeInfoByName[nowPlaceName];
  const backdropInfo = backdropsByCamera[nowCamName][nowSegmentName];

  const maxFramesPerRow = backdropInfo.maxFramesPerRow;
  const totalFrames = backdropInfo.totalFrames;
  const texturesAmount = backdropInfo.textures.length;

  const maxFramesForTexture = maxFramesPerRow * maxFramesPerRow; // Assuming square grid for full textures

  const { backdropFrame } = getState().global.main;

  // Calculate the current texture index
  let nowTextureIndex = Math.floor(backdropFrame / maxFramesForTexture);
  nowTextureIndex = Math.min(nowTextureIndex, texturesAmount - 1);

  // Calculate the frame index within the current texture
  const backdropFrameForNowTexture = backdropFrame - nowTextureIndex * maxFramesForTexture;

  // Determine the number of frames in the current texture
  let framesInCurrentTexture;
  if (nowTextureIndex < texturesAmount - 1) {
    // Full texture
    framesInCurrentTexture = maxFramesForTexture;
  } else {
    // Last texture (might have fewer frames)
    framesInCurrentTexture = totalFrames - maxFramesForTexture * (texturesAmount - 1);
  }

  // Calculate framesPerColumn for the current texture
  const framesPerRow = maxFramesPerRow;
  const framesPerColumn = Math.ceil(framesInCurrentTexture / framesPerRow);

  // Calculate frame size in UV coordinates
  const frameSize = {
    x: 1 / framesPerRow,
    y: 1 / framesPerColumn,
  };

  return {
    frameSize,
    framesPerRow,
    framesPerColumn,
    nowTextureIndex,
    backdropFrameForNowTexture,
  };
}
