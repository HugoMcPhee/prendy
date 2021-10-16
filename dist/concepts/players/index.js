export default function players(gameyStartOptions) {
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
        animationNames: {
            walking: gameyStartOptions.playerAnimations.walking,
            idle: gameyStartOptions.playerAnimations.idle,
        }, // maybe typed somehow, from player character?
    });
    const refs = () => ({
        walkSpeed: gameyStartOptions.walkSpeed,
        canJumpTimeout: null,
    });
    const startStates = { main: state() };
    return { startStates, state, refs };
}
