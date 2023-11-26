export default function players(prendyAssets) {
    const { prendyOptions } = prendyAssets;
    const state = () => ({
        // player input stuff
        lastSafeInputAngle: 0,
        inputVelocity: { x: 0, y: 0 },
        isJumping: false,
        isOnGround: true,
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
            walking: prendyOptions.playerAnimations.walking,
            idle: prendyOptions.playerAnimations.idle,
        }, // maybe typed somehow, from player character?
    });
    const refs = () => ({
        topWalkSpeed: prendyOptions.walkSpeed,
        canJumpTimeout: null,
        canShowVirtualButtonsTimeout: null,
        canHideVirtualButtonsTimeout: null,
    });
    const startStates = { main: state() };
    return { startStates, state, refs };
}
