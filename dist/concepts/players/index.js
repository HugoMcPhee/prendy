export default function players(backdopStartOptions) {
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
            walking: backdopStartOptions.playerAnimations.walking,
            idle: backdopStartOptions.playerAnimations.idle,
        }, // maybe typed somehow, from player character?
    });
    const refs = () => ({
        walkSpeed: backdopStartOptions.walkSpeed,
        canJumpTimeout: null,
    });
    const startStates = { main: state() };
    return { startStates, state, refs };
}
