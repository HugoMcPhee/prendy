export default function keyboards(): {
    startStates: {
        main: {
            KeyW: boolean;
            KeyA: boolean;
            KeyS: boolean;
            KeyD: boolean;
            ArrowLeft: boolean;
            ArrowRight: boolean;
            ArrowUp: boolean;
            ArrowDown: boolean;
            KeyQ: boolean;
            KeyE: boolean;
            ShiftLeft: boolean;
            ControlLeft: boolean;
            Space: boolean;
            Enter: boolean;
            KeyZ: boolean;
            KeyM: boolean;
            KeyP: boolean;
        };
    };
    state: () => {
        KeyW: boolean;
        KeyA: boolean;
        KeyS: boolean;
        KeyD: boolean;
        ArrowLeft: boolean;
        ArrowRight: boolean;
        ArrowUp: boolean;
        ArrowDown: boolean;
        KeyQ: boolean;
        KeyE: boolean;
        ShiftLeft: boolean;
        ControlLeft: boolean;
        Space: boolean;
        Enter: boolean;
        KeyZ: boolean;
        KeyM: boolean;
        KeyP: boolean;
    };
    refs: () => {};
};
