import { getState } from "repond";
import { getGlobalState } from "../../helpers/prendyUtils/global";
import { meta } from "../../meta";

export function getBackdropFrameInfo() {
  const { placeInfoByName } = meta.assets!;
  const { nowPlaceName, nowSegmentName, nowCamName } = getGlobalState();
  const { segmentTimesByCamera, cameraNames, backdropsByCamera } = placeInfoByName[nowPlaceName];
  const backdropInfo = backdropsByCamera[nowCamName][nowSegmentName];
  const maxFramesPerRow = backdropInfo.maxFramesPerRow;
  const maxFramesPerColumn = backdropInfo.maxFramesPerRow; // Because it's a square
  const maxFramesForTexture = maxFramesPerRow * maxFramesPerColumn;
  const totalFrames = backdropInfo.totalFrames;
  const framesPerRow = Math.min(totalFrames, maxFramesPerRow);
  const framesPerColumn = Math.ceil(totalFrames / maxFramesPerRow);
  const frameSize = { x: 1 / framesPerRow, y: 1 / framesPerColumn };
  const texutresAmount = backdropsByCamera[nowCamName][nowSegmentName].textures.length;

  return {
    frameSize,
    framesPerRow,
    framesPerColumn,
    maxFramesForTexture,
    texutresAmount,
  };
}

export function getNowBackdropFrameInfo() {
  const { frameSize, framesPerRow, framesPerColumn, maxFramesForTexture, texutresAmount } = getBackdropFrameInfo();
  const { slatePos, slatePosGoal, slateZoom, backdropFrame } = getState().global.main;

  // There can be multiple atlas textures, so we need to calculate the correct frame for the current texture
  // And also which texture should be used, based on the current frame and the max frames per texture
  let nowTextureIndex = Math.floor(backdropFrame / maxFramesForTexture);
  const backdropFrameForNowTexture = backdropFrame % maxFramesForTexture;
  // limit the texture index to the number of textures available
  nowTextureIndex = Math.min(nowTextureIndex, texutresAmount - 1);

  return {
    frameSize,
    framesPerRow,
    framesPerColumn,
    maxFramesForTexture,
    nowTextureIndex,
    backdropFrameForNowTexture,
  };
}
