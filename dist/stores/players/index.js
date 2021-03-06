export default function players(prendyStartOptions) {
    const state = () => ({
        // player input stuff
        lastSafeInputAngle: 0,
        inputVelocity: { x: 0, y: 0 },
        isJumping: false,
        isOnGround: false,
        canJump: true,
        interactButtonPressTime: Date.now(),
        jumpButtonPressTime: Date.now(),
        jumpButtonReleaseTime: Date.now(),
        pickupButtonPressTime: Date.now(),
        //
        virtualControlsPressTime: Date.now(),
        virtualControlsReleaseTime: Date.now(),
        canShowVirtualButtons: false,
        //
        animationNames: {
            walking: prendyStartOptions.playerAnimations.walking,
            idle: prendyStartOptions.playerAnimations.idle,
        }, // maybe typed somehow, from player character?
    });
    const refs = () => ({
        walkSpeed: prendyStartOptions.walkSpeed,
        canJumpTimeout: null,
        canShowVirtualButtonsTimeout: null,
        canHideVirtualButtonsTimeout: null,
    });
    const startStates = { main: state() };
    return { startStates, state, refs };
}
