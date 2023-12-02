declare function connectKeyboardInputsToState(): void;
declare function disconnectKeyboardInputsToState(): void;
export declare const keyboardConnectRules: {
    startAll: typeof connectKeyboardInputsToState;
    stopAll: typeof disconnectKeyboardInputsToState;
};
export {};
