export declare const playerRules: {
    start: (ruleName: "whenDirectionKeysPressed" | "whenInteractKeyPressed" | "whenJumpKeyPressed" | "whenJumpKeyReleased" | "whenJumpPressed" | "whenJumpReleased" | "whenJoystickMoves" | "whenVirtualControlsPressed" | "whenVirtualControlsReleased" | "onEachFrame" | "whenIsOnGroundChanges" | "whenAnimationNamesChange" | "whenCameraChanges" | "whenPlayerMovementPausedChanges") => void;
    stop: (ruleName: "whenDirectionKeysPressed" | "whenInteractKeyPressed" | "whenJumpKeyPressed" | "whenJumpKeyReleased" | "whenJumpPressed" | "whenJumpReleased" | "whenJoystickMoves" | "whenVirtualControlsPressed" | "whenVirtualControlsReleased" | "onEachFrame" | "whenIsOnGroundChanges" | "whenAnimationNamesChange" | "whenCameraChanges" | "whenPlayerMovementPausedChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenDirectionKeysPressed" | "whenInteractKeyPressed" | "whenJumpKeyPressed" | "whenJumpKeyReleased" | "whenJumpPressed" | "whenJumpReleased" | "whenJoystickMoves" | "whenVirtualControlsPressed" | "whenVirtualControlsReleased" | "onEachFrame" | "whenIsOnGroundChanges" | "whenAnimationNamesChange" | "whenCameraChanges" | "whenPlayerMovementPausedChanges")[];
    run: (ruleName: "whenDirectionKeysPressed" | "whenInteractKeyPressed" | "whenJumpKeyPressed" | "whenJumpKeyReleased" | "whenJumpPressed" | "whenJumpReleased" | "whenJoystickMoves" | "whenVirtualControlsPressed" | "whenVirtualControlsReleased" | "onEachFrame" | "whenIsOnGroundChanges" | "whenAnimationNamesChange" | "whenCameraChanges" | "whenPlayerMovementPausedChanges") => void;
    runAll: () => void;
};
