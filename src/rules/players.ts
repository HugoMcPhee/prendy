import { Ray, RayHelper, TargetCamera, Vector3 } from "@babylonjs/core";
import { defaultPosition, pointIsZero } from "chootils/dist/points2d";
import { getShortestAngle, getSpeedAndAngleFromVector, getVectorAngle } from "chootils/dist/speedAngleDistance2d";
import { MyTypes } from "../declarations";
import { get_getSceneOrEngineUtils } from "../helpers/babylonjs/getSceneOrEngineUtils";
import { get_getCharDollStuff } from "../helpers/prendyUtils/characters";
import { clearTimeoutSafe } from "../helpers/utils";

const LEAVE_GROUND_CANT_JUMP_DELAY = 100; // ms

const downRay = new Ray(Vector3.Zero(), Vector3.Zero());
const downRayHelper = new RayHelper(downRay);
const downRayDirection = new Vector3(0, -1, 0);
const downRayRelativeOrigin = new Vector3(0, 3, 0);

// Forward ray is actually a down ray but slightly infront of the player
const RAY_FRONT_DIST = 0.25;
const frontRay = new Ray(Vector3.Zero(), Vector3.Zero());
const frontRayHelper = new RayHelper(frontRay);
const frontRayDirection = downRayDirection;
const frontRayRelativeOrigin = new Vector3(
  // dollPosRefs.velocity.x * 0.1,
  0,
  3,
  RAY_FRONT_DIST
  // dollPosRefs.velocity.z * 0.1
);

export function get_playerRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type CharacterName = T_MyTypes["Main"]["CharacterName"];
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { getRefs, getState, makeRules, setState } = storeHelpers;
  const { placeInfoByName, prendyOptions } = prendyAssets;

  const globalRefs = getRefs().global.main;

  const { getScene } = get_getSceneOrEngineUtils(storeHelpers);
  const getCharDollStuff = get_getCharDollStuff(storeHelpers);

  return makeRules(({ itemEffect, effect }) => ({
    whenDirectionKeysPressed: effect({
      run() {
        const { ArrowDown, ArrowLeft, ArrowUp, ArrowRight, KeyW, KeyA, KeyS, KeyD } = getState().keyboards.main;

        const rightPressed = ArrowRight || KeyD;
        const upPressed = ArrowUp || KeyW;
        const leftPressed = ArrowLeft || KeyA;
        const downPressed = ArrowDown || KeyS;

        const newInputVelocity = { x: 0, y: 0 };

        if (downPressed) newInputVelocity.y = 1;
        if (upPressed) newInputVelocity.y = -1;
        if (leftPressed) newInputVelocity.x = -1;
        if (rightPressed) newInputVelocity.x = 1;

        // if moving diagonally, reduce the velocity , so its like limited to a joystick
        if (newInputVelocity.x != 0 && newInputVelocity.y !== 0) {
          newInputVelocity.x *= 0.75;
          newInputVelocity.y *= 0.75;
        }

        // Temporarily disabled because of issue with key held down at next camera
        setState({ players: { main: { inputVelocity: newInputVelocity } } });
      },
      step: "input",
      check: {
        type: "keyboards",
        name: "main",
        prop: ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "KeyW", "KeyA", "KeyS", "KeyD"],
      },
    }),
    whenInteractKeyPressed: itemEffect({
      run() {
        setState({
          players: { main: { interactButtonPressTime: Date.now() } },
        });
      },
      step: "input",
      check: {
        type: "keyboards",
        name: "main",
        // prop: ["Space", "Enter", "KeyZ"],
        // prop: ["Space", "Enter"],
        prop: ["KeyE", "Enter"],
        becomes: true,
      },
    }),
    whenJumpKeyPressed: itemEffect({
      run() {
        if (!prendyOptions.hasJumping) return;
        setState({ players: { main: { jumpButtonPressTime: Date.now() } } });
      },
      step: "input",
      check: { type: "keyboards", prop: ["Space"], becomes: true },
    }),
    whenJumpKeyReleased: itemEffect({
      run() {
        if (!prendyOptions.hasJumping) return;
        setState({ players: { main: { jumpButtonReleaseTime: Date.now() } } });
      },
      step: "input",
      check: { type: "keyboards", prop: ["KeyM"], becomes: false },
    }),

    //
    whenJumpPressed: itemEffect({
      run({ itemState: playerState, frameDuration }) {
        const { playerCharacter, playerMovingPaused, gravityValue } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } = getCharDollStuff(playerCharacter as CharacterName) ?? {};

        const { isOnGround, canJump } = playerState;
        const { scene } = globalRefs;

        const activeCamera = scene?.activeCamera;

        if (!dollRefs || !dollState || !dollName || !activeCamera) return;

        if (playerMovingPaused || !canJump) return;

        dollRefs.positionMoverRefs.velocity.y = 10;

        setState({
          dolls: {
            [dollName as string]: {
              // nowAnimation: newAnimationName,
              positionMoveMode: "push",
              positionIsMoving: true,
            },
          },
          players: { main: { isJumping: true, isOnGround: false } },
        });
      },
      step: "input",
      check: { type: "players", name: "main", prop: ["jumpButtonPressTime"] },
    }),
    whenJumpReleased: itemEffect({
      run() {
        setState({ players: { main: { jumpButtonReleaseTime: Date.now() } } });
      },
      step: "input",
      check: { type: "players", name: "main", prop: ["jumpButtonPressTime"] },
    }),

    whenJoystickMoves: itemEffect({
      run({ newValue: inputVelocity, itemState: playerState, itemRefs: playerRefs }) {
        const { playerCharacter, playerMovingPaused, gravityValue } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } = getCharDollStuff(playerCharacter as CharacterName) ?? {};

        const { scene } = globalRefs;

        const activeCamera = scene?.activeCamera;

        if (!dollRefs || !dollState || !dollName || !activeCamera) return;
        const { lastSafeInputAngle } = playerState;
        let shouldChangeAngle = true;

        if (lastSafeInputAngle !== null) {
          const {
            angle: newInputAngle,
            // speed: newInputSpeed,
          } = getSpeedAndAngleFromVector(inputVelocity);
          const rotationYDifference = Math.abs(getShortestAngle(lastSafeInputAngle, newInputAngle));
          shouldChangeAngle = rotationYDifference > 25;
        }

        if (!shouldChangeAngle) return;

        // if (!walkerRefs.meshRef) return;
        //assuming we're only using the single camera:
        const camera = activeCamera as TargetCamera;

        let currentYRotation = dollState.rotationYGoal;
        let newYRotation = currentYRotation;
        let newAnimationName = dollState.nowAnimation;
        let newIsMoving = dollState.positionIsMoving;
        let newPositionMoveMode = dollState.positionMoveMode;

        const forward = camera.getFrontPosition(-1).subtract(camera.position);
        const right = camera.upVector.cross(forward);

        //project forward and right vectors on the horizontal plane (y = 0)
        forward.y = 0;
        right.y = 0;
        forward.normalize();
        right.normalize();

        //this is the direction in the world space we want to move:
        let desiredMoveDirection = forward
          .multiplyByFloats(inputVelocity.y, inputVelocity.y, inputVelocity.y)
          .add(right.multiplyByFloats(-inputVelocity.x, -inputVelocity.x, -inputVelocity.x));

        if (!pointIsZero(inputVelocity) && !playerMovingPaused) {
          newAnimationName = playerState.animationNames.walking;
          newIsMoving = true;

          newYRotation = getVectorAngle({
            x: -desiredMoveDirection.z,
            y: -desiredMoveDirection.x,
          });
        } else {
          if (newAnimationName === playerState.animationNames.walking) {
            newAnimationName = playerState.animationNames.idle;
          }
          // newIsMoving = false;
        }

        if (playerMovingPaused) {
          desiredMoveDirection = new Vector3(0, 0, 0);
          // newIsMoving = false;
        }

        //now we can apply the movement:
        // * frameDuration * 0.1

        dollRefs.positionMoverRefs.velocity.x = desiredMoveDirection.x * playerRefs.walkSpeed * timerSpeed;
        dollRefs.positionMoverRefs.velocity.z = desiredMoveDirection.z * playerRefs.walkSpeed * timerSpeed;

        // dollRefs.positionMoverRefs.velocity.y = -gravityValue * timerSpeed;

        // if (shouldChangeAngle) {

        if (!playerMovingPaused) newPositionMoveMode = "push";

        if (playerMovingPaused) {
          dollRefs.positionMoverRefs.velocity.x = 0;
          dollRefs.positionMoverRefs.velocity.z = 0;

          setState({
            dolls: {
              [dollName]: {
                nowAnimation: newAnimationName,
              },
            },
            players: { main: { lastSafeInputAngle: null } },
          });

          return;
        }

        setState({
          dolls: {
            [dollName]: {
              // inputVelocity: newInputVelocity,
              rotationYGoal: newYRotation,
              // nowAnimation: playerMovingPaused ? undefined : newAnimationName,
              nowAnimation: newAnimationName,
              positionMoveMode: newPositionMoveMode,
              positionIsMoving: newIsMoving,
              // positionIsMoving: true,
            },
          },
          players: { main: { lastSafeInputAngle: null } },
        });

        // }
      },
      check: { type: "players", prop: "inputVelocity" },
      step: "input",
      atStepEnd: true,
    }),

    whenVirtualControlsPressed: itemEffect({
      run({ itemRefs: playerRefs, itemName: playerName }) {
        clearTimeoutSafe(playerRefs.canShowVirtualButtonsTimeout);
        playerRefs.canShowVirtualButtonsTimeout = setTimeout(() => {
          const { virtualControlsPressTime, virtualControlsReleaseTime } = getState().players[playerName];
          if (virtualControlsReleaseTime > virtualControlsPressTime) return;
          setState({
            players: { [playerName]: { canShowVirtualButtons: true } },
          });
        }, 200); // wait 200 milliseconds, to prevent buttons showing from small mouse clicks
      },
      check: { type: "players", prop: "virtualControlsPressTime" },
      step: "input",
      atStepEnd: true,
    }),
    whenVirtualControlsReleased: itemEffect({
      run({ itemRefs: playerRefs, itemName: playerName }) {
        clearTimeoutSafe(playerRefs.canHideVirtualButtonsTimeout);
        playerRefs.canHideVirtualButtonsTimeout = setTimeout(() => {
          const { virtualControlsPressTime, virtualControlsReleaseTime } = getState().players[playerName];
          if (virtualControlsPressTime > virtualControlsReleaseTime) return;
          setState({
            players: { [playerName]: { canShowVirtualButtons: false } },
          });
        }, 5000); // wait 5 seconds
      },
      check: { type: "players", prop: ["virtualControlsReleaseTime"] },
      step: "input",
      atStepEnd: true,
    }),

    // Jumping
    onEachFrame: itemEffect({
      run({
        // newValue: inputVelocity,
        // itemState: playerState,
        // itemRefs: playerRefs,
        frameDuration,
      }) {
        // console.log(parseInt(frameDuration));
        // return false;
        // NOTE should be a dynamic rule for each player listening to frame
        const { playerCharacter, playerMovingPaused, gravityValue, nowPlaceName } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } = getCharDollStuff(playerCharacter as CharacterName) ?? {};

        const dollPosRefs = dollRefs.positionMoverRefs;
        const { isJumping, isOnGround, inputVelocity } = getState().players.main;

        // if (!dollRefs.canCollide) return;

        // const { scene } = globalRefs;
        const { meshRef } = dollRefs;
        const scene = getScene();
        const activeCamera = scene?.activeCamera;

        const placeInfo = placeInfoByName[nowPlaceName];

        const floorNames = placeInfo.floorNames as readonly string[];
        const wallNames = placeInfo.wallNames as readonly string[];

        if (!dollRefs || !dollState || !dollName || !activeCamera || !meshRef || !scene) return;

        // console.log("player move mode", dollState.positionMoveMode);

        let newIsOnGround = isOnGround;

        let currentYRotation = dollState.rotationYGoal;
        let newAnimationName = dollState.nowAnimation;
        let newIsMoving = dollState.positionIsMoving;

        let newPositionMoveMode = dollState.positionMoveMode;
        let newIsJumping = isJumping;

        const {
          // angle: newInputAngle,
          speed: dollSpeed,
        } = getSpeedAndAngleFromVector({ x: meshRef?.velocity?.x ?? 0, y: meshRef?.velocity?.z ?? 0 });

        // dollPosRefs.velocity.y -=
        //   (gravityValue * frameDuration) / 160;

        // const isGoinDownOrStill = dollPosRefs.velocity.y < 0;
        // const isGoinDownOrStill =
        //   dollPosRefs.velocity.y < 100000000;
        const isGoingDownOrStill = dollPosRefs.velocity.y <= 0;

        // console.log("dollPosRefs.velocity.y", dollPosRefs.velocity.y);

        // if (isGoinDownOrStill ) {
        let slopeUnderPlayer = 0;
        let slope = 0;

        let isAboveDownSlope = false;
        let isAboveUpSlope = false;
        let isAboveASlope = false;

        if (isGoingDownOrStill) {
          downRayHelper.attachToMesh(
            /*mesh*/ meshRef,
            /*direction*/ downRayDirection,
            /*relativeOrigin*/ downRayRelativeOrigin, // used to be (0, -1, 0), when the character model origins were higher,but now the character orig should be at the bottom
            // /*length*/ 2 // 0.25 meant the bird in eggventure couldn't climb the ~45degree pan, 0.3 meant the player couldn't climb the cave in rodont
            /*length*/ 10 // 0.25 meant the bird in eggventure couldn't climb the ~45degree pan, 0.3 meant the player couldn't climb the cave in rodont
          );
          // For stacked floors, I think it's picking the bottom floor, which is bad

          const centerPick = scene.pickWithRay(
            downRay,
            (mesh) => {
              return floorNames.includes(mesh.name) || wallNames.includes(mesh.name);
            },
            false // if true, then it can pick the bottom  of overlapping floors, which is bad
          );

          if (centerPick) {
            let distance = 1000000;

            if (centerPick.pickedPoint && meshRef.position) {
              const pickedPointY = centerPick.pickedPoint?.y;
              const meshYPosition = meshRef.position.y;

              distance = Math.abs(pickedPointY - meshYPosition);
            }

            const isWalking = Math.abs(dollPosRefs.velocity.x) > 0.1 || Math.abs(dollPosRefs.velocity.z) > 0.1;

            if (isWalking) {
              const RAY_FORWARD_DIST = 0.25;

              frontRayHelper.attachToMesh(/*mesh*/ meshRef, frontRayDirection, frontRayRelativeOrigin, /*length*/ 10);

              const frontPick = scene.pickWithRay(
                frontRay,
                (mesh) => floorNames.includes(mesh.name) || wallNames.includes(mesh.name),
                true
              );

              if (frontPick?.hit) {
                const heightDiff = (frontPick?.pickedPoint?.y || 0) - (centerPick?.pickedPoint?.y || 0);

                // In degrees, negative is down
                slopeUnderPlayer = getVectorAngle({
                  x: RAY_FORWARD_DIST,
                  y: heightDiff,
                });
              }
            }

            slope = slopeUnderPlayer;

            // maybe put in prendy assets options
            const SLOPE_LIMIT = 45;

            isAboveDownSlope = slope < -1 && slope > -SLOPE_LIMIT;
            isAboveUpSlope = slope > 1 && slope < SLOPE_LIMIT;
            isAboveASlope = isAboveDownSlope || isAboveUpSlope;

            newIsOnGround = distance < 0.1; // 0.21
          }
        }

        const safeSlopeDivider = Math.max(Math.abs(slope) * 0.7, 1);
        const slopeFallSpeed = (1 / safeSlopeDivider) * frameDuration;

        if (isAboveDownSlope && newIsOnGround) {
          dollPosRefs.velocity.y = -slopeFallSpeed * 4; // need to multiply by player walk speed
        }

        if (newIsOnGround) {
          if (!isAboveDownSlope) {
            dollPosRefs.velocity.y = Math.max(0, dollPosRefs.velocity.y);
          }
          if (!isAboveUpSlope) {
            // this stops the y velocity from being kept after doing a springDollToSpot
            dollPosRefs.velocity.y = Math.min(0, dollPosRefs.velocity.y);
            // before it would keep a small y up velocity, but still record isOnGround as true
            // may be a better way to cleat the y velocity after a springDollToSpot ends
            // wait this might break walking up slopes

            // it happened in hug-report when hugging the statue
            // maybe its also combined with disabling movement
          }
        } else {
          // is falling
          dollPosRefs.velocity.y -= (gravityValue / 160) * frameDuration;
        }

        if (dollPosRefs.velocity.y !== 0) newIsMoving = true;

        // if (!playerMovingPaused) newPositionMoveMode = "push";
        newPositionMoveMode = "push";

        setState({
          players: {
            main: {
              isOnGround: newIsOnGround,
              positionMoveMode: newPositionMoveMode,
              positionIsMoving: newIsMoving,
            },
          },
        });
      },
      check: { type: "global", prop: "frameTick" },
      step: "input",
      atStepEnd: true,
    }),

    whenIsOnGroundChanges: itemEffect({
      run({ newValue: isOnGround, previousValue: prevIsOnGround, itemState: playerState, itemRefs: playerRefs }) {
        clearTimeoutSafe(playerRefs.canJumpTimeout);

        const { isJumping } = playerState;

        const justLeftTheGround = prevIsOnGround && !isOnGround;
        const justHitTheGround = !prevIsOnGround && isOnGround;

        if (justHitTheGround) {
          setState({ players: { main: { canJump: true, isJumping: false } } });
        }

        if (justLeftTheGround) {
          if (isJumping) {
            setState({ players: { main: { canJump: false } } });
          } else {
            // allow jumping for a short time after leaving the ground
            playerRefs.canJumpTimeout = setTimeout(() => {
              setState({ players: { main: { canJump: false } } });
            }, LEAVE_GROUND_CANT_JUMP_DELAY);
          }
        }
      },
      check: { type: "players", prop: "isOnGround" },
      step: "positionReaction",
      atStepEnd: false,
    }),
    whenAnimationNamesChange: itemEffect({
      run({ newValue: newAnimationNames, itemState: playerState }) {
        const { playerCharacter, playerMovingPaused } = getState().global.main;
        const { inputVelocity } = playerState;
        const { dollName } = getCharDollStuff(playerCharacter as CharacterName) ?? {};

        if (!dollName) return;

        let newAnimationName = newAnimationNames.idle;
        if (!pointIsZero(inputVelocity) && !playerMovingPaused) {
          newAnimationName = newAnimationNames.walking;
        }

        setState({
          dolls: { [dollName]: { nowAnimation: newAnimationName } },
        });
      },
      step: "input",
      check: { type: "players", prop: "animationNames" },
      atStepEnd: true,
    }),
    whenCameraChanges: itemEffect({
      run() {
        setState((state) => ({
          players: {
            main: {
              lastSafeInputAngle: getSpeedAndAngleFromVector(state.players.main.inputVelocity).angle,
            },
          },
        }));
      },
      step: "cameraChange",
      check: { type: "global", prop: "nowCamName" },
    }),
    whenPlayerMovementPausedChanges: itemEffect({
      run({ newValue: playerMovingPaused }) {
        const { playerCharacter } = getState().global.main;
        const playerState = getState().players.main;
        const { dollRefs, dollName, dollState } = getCharDollStuff(playerCharacter as CharacterName);

        let newAnimationName = dollState.nowAnimation;

        if (playerMovingPaused) {
          if (newAnimationName === playerState.animationNames.walking) {
            newAnimationName = playerState.animationNames.idle;
          }
          dollRefs.positionMoverRefs.velocity.x = 0;
          dollRefs.positionMoverRefs.velocity.y = 0;
          dollRefs.positionMoverRefs.velocity.z = 0;
          setState({
            dolls: {
              [dollName]: {
                nowAnimation: newAnimationName,
                // positionMoveMode: "push",
                positionIsMoving: false,
              },
            },
            players: {
              main: {
                // lastSafeInputAngle: null,
                inputVelocity: defaultPosition(),
              },
            },
          });
        }

        // setState((state) => ({
        //   players: {
        //     main: {
        //       lastSafeInputAngle: getSpeedAndAngleFromVector(
        //         state.players.main.inputVelocity
        //       ).angle,
        //     },
        //   },
        // }));
      },
      // step: "default",
      check: { type: "global", prop: "playerMovingPaused" },
      step: "storyReaction", // runs at storyReaction flow so it can react after story rules setting playerMovingPaused
      // atStepEnd: true,
    }),
  }));
}
