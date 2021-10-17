export function makeKeyboardConnectRules(concepFuncs) {
    const { setState, getState } = concepFuncs;
    function handleKeyDown(event) {
        const keyboardState = getState().keyboards.main;
        const keyName = event.code;
        if (keyboardState[keyName] !== undefined &&
            keyboardState[keyName] === false) {
            event.preventDefault();
            setState({ keyboards: { main: { [keyName]: true } } });
        }
    }
    function handleKeyUp(event) {
        const keyboardState = getState().keyboards.main;
        const keyName = event.code;
        if (keyboardState[keyName] !== undefined &&
            keyboardState[keyName] === true) {
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
    return {
        startAll: connectKeyboardInputsToState,
        stopAll: disconnectKeyboardInputsToState,
    };
}
