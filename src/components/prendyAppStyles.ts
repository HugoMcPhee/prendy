export const prendyAppStyles = `
.App {
  width: 100vw;
  height: 100vh;
}

html {
  background: black;
}

/* html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
} */

* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  /* doesn't seem to work */
  /* box-sizing: border-box !important; */

}

/* #scene-canvas {
  width: 320px;
  height: 180px;
} */
/* #scene-canvas {
  width: 480px;
  height: 272px;
} */
#scene-canvas {
  /* width: 0vw; */
  /* height: 0vh; */
  width: 100vw;
  height: 100vh;
  /* width: 50vw; */
  /* height: 50vh; */
  /* width: 1280px; */
  /* height: 720px; */
  /* width: 480px; */
  /* height: 272px; */
}
#scene-canvas:focus {
  outline: none;
}

button.babylonUnmuteIcon#babylonUnmuteIconBtn {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  /* padding-top: 10px; */
  background-position: center;
  background-position-y: 62%;
}

`;
