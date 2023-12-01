import { getState, setState } from "repond";

function handleKeyDown(event: KeyboardEvent) {
  const keyboardState = getState().keyboards.main;
  const keyName = event.code as keyof typeof keyboardState;
  if (keyboardState[keyName] !== undefined && keyboardState[keyName] === false) {
    event.preventDefault();
    setState({ keyboards: { main: { [keyName]: true } } });
  }
}
function handleKeyUp(event: KeyboardEvent) {
  const keyboardState = getState().keyboards.main;
  const keyName = event.code as keyof typeof keyboardState;
  if (keyboardState[keyName] !== undefined && keyboardState[keyName] === true) {
    setState({ keyboards: { main: { [keyName]: false } } });
  }
}

function connectKeyboardInputsToState() {
  document.addEventListener("keydown", handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, false);
}
function disconnectKeyboardInputsToState() {
  document.removeEventListener("keydown", handleKeyDown, false);
  document.removeEventListener("keyup", handleKeyUp, false);
}

export const keyboardConnectRules = {
  startAll: connectKeyboardInputsToState,
  stopAll: disconnectKeyboardInputsToState,
};
