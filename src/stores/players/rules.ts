import { Ray, RayHelper, TargetCamera, Vector3 } from "@babylonjs/core";
import { defaultPosition, pointIsZero } from "chootils/dist/points2d";
import {
  getShortestAngle,
  getSpeedAndAngleFromVector,
  getVectorAngle,
} from "chootils/dist/speedAngleDistance2d";
import { makeGetCharDollStuff } from "../../stores/characters/utils";
import { PrendyArt, CharacterName } from "../../declarations";
import { clearTimeoutSafe } from "../../utils";
import { makeGetSceneOrEngineUtils } from "../../utils/babylonjs/getSceneOrEngine";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../typedStoreHelpers";

const LEAVE_GROUND_CANT_JUMP_DELAY = 100; // ms

export function makePlayerRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(
  storeHelpers: StoreHelpers,
  PRENDY_OPTIONS: PrendyOptions,
  prendyArt: PrendyArt
) {
  const { getRefs, getState, makeRules, setState } = storeHelpers;
  const { placeInfoByName } = prendyArt;

  const globalRefs = getRefs().global.main;

  const { getScene } = makeGetSceneOrEngineUtils(storeHelpers);
  const getCharDollStuff = makeGetCharDollStuff(storeHelpers);

  return makeRules(({ itemEffect, effect }) => ({
    whenDirectionKeysPressed: effect({
      run() {
        const {
          ArrowDown,
          ArrowLeft,
          ArrowUp,
          ArrowRight,
          KeyW,
          KeyA,
          KeyS,
          KeyD,
        } = getState().keyboards.main;

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
        prop: [
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
        ],
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
        if (!PRENDY_OPTIONS.hasJumping) return;
        setState({ players: { main: { jumpButtonPressTime: Date.now() } } });
      },
      step: "input",
      check: { type: "keyboards", prop: ["Space"], becomes: true },
    }),
    whenJumpKeyReleased: itemEffect({
      run() {
        if (!PRENDY_OPTIONS.hasJumping) return;
        setState({ players: { main: { jumpButtonReleaseTime: Date.now() } } });
      },
      step: "input",
      check: { type: "keyboards", prop: ["KeyM"], becomes: false },
    }),

    //
    whenJumpPressed: itemEffect({
      run({ itemState: playerState, frameDuration }) {
        const {
          playerCharacter,
          playerMovingPaused,
          gravityValue,
        } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } =
          getCharDollStuff(playerCharacter as CharacterName) ?? {};

        const { isOnGround, canJump } = playerState;
        const { scenes } = globalRefs;

        // const activeCamera = scenes?.main?.activeCamera;
        const activeCamera = globalRefs?.sceneRenderTarget?.activeCamera;

        if (!dollRefs || !dollState || !dollName || !activeCamera) return;

        if (playerMovingPaused || !canJump) return;

        dollRefs.positionMoverRefs.velocity.y = 10;

        setState({
          dolls: {
            [dollName]: {
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
      run({
        newValue: inputVelocity,
        itemState: playerState,
        itemRefs: playerRefs,
      }) {
        const {
          playerCharacter,
          playerMovingPaused,
          gravityValue,
        } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } =
          getCharDollStuff(playerCharacter as CharacterName) ?? {};

        const { scenes } = globalRefs;

        // const activeCamera = scenes?.main?.activeCamera;
        const activeCamera = globalRefs?.sceneRenderTarget?.activeCamera;

        if (!dollRefs || !dollState || !dollName || !activeCamera) return;
        const { lastSafeInputAngle } = playerState;
        let shouldChangeAngle = true;

        if (lastSafeInputAngle !== null) {
          const {
            angle: newInputAngle,
            // speed: newInputSpeed,
          } = getSpeedAndAngleFromVector(inputVelocity);
          const rotationYDifference = Math.abs(
            getShortestAngle(lastSafeInputAngle, newInputAngle)
          );
          shouldChangeAngle = rotationYDifference > 25;
        }

        if (!shouldChangeAngle) return;

        // if (!walkerRefs.meshRef) return;
        //assuming we only using the single camera:
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
          .add(
            right.multiplyByFloats(
              -inputVelocity.x,
              -inputVelocity.x,
              -inputVelocity.x
            )
          );

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
          newIsMoving = false;
        }

        if (playerMovingPaused) {
          desiredMoveDirection = new Vector3(0, 0, 0);
          newIsMoving = false;
        }

        //now we can apply the movement:
        // * frameDuration * 0.1

        dollRefs.positionMoverRefs.velocity.x =
          desiredMoveDirection.x * playerRefs.walkSpeed * timerSpeed;
        dollRefs.positionMoverRefs.velocity.z =
          desiredMoveDirection.z * playerRefs.walkSpeed * timerSpeed;

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
          const {
            virtualControlsPressTime,
            virtualControlsReleaseTime,
          } = getState().players[playerName];
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
          const {
            virtualControlsPressTime,
            virtualControlsReleaseTime,
          } = getState().players[playerName];
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
        newValue: inputVelocity,
        itemState: playerState,
        itemRefs: playerRefs,
        frameDuration,
      }) {
        // NOTE should be a dynamic rule for each player listening to frame
        const {
          playerCharacter,
          playerMovingPaused,
          gravityValue,
          nowPlaceName,
        } = getState().global.main;
        const { timerSpeed } = globalRefs;
        const { dollRefs, dollState, dollName } =
          getCharDollStuff(playerCharacter as CharacterName) ?? {};
        const { isJumping, isOnGround } = getState().players.main;

        // if (!dollRefs.checkCollisions) return;

        const { scenes } = globalRefs;
        const { meshRef } = dollRefs;
        const scene = getScene();
        // const activeCamera = scene?.activeCamera;
        const activeCamera = globalRefs?.sceneRenderTarget?.activeCamera;

        const placeInfo = placeInfoByName[nowPlaceName];

        const floorNames = placeInfo.floorNames as readonly string[];
        const wallNames = placeInfo.wallNames as readonly string[];

        if (
          !dollRefs ||
          !dollState ||
          !dollName ||
          !activeCamera ||
          !meshRef ||
          !scene
        )
          return;

        // console.log("player move mode", dollState.positionMoveMode);

        let newIsOnGround = isOnGround;

        let currentYRotation = dollState.rotationYGoal;
        let newAnimationName = dollState.nowAnimation;
        let newIsMoving = dollState.positionIsMoving;
        let newPositionMoveMode = dollState.positionMoveMode;
        let newIsJumping = isJumping;

        dollRefs.positionMoverRefs.velocity.y -=
          (gravityValue * frameDuration) / 160;

        // const isGoinDownOrStill = dollRefs.positionMoverRefs.velocity.y < 0;
        const isGoinDownOrStill =
          dollRefs.positionMoverRefs.velocity.y < 100000000;

        // if (isGoinDownOrStill ) {

        // if (!newIsOnGround) {
        if (dollRefs.positionMoverRefs.velocity.y < 0) {
          // console.log("falling");
          // fall faster than going up
          dollRefs.positionMoverRefs.velocity.y -=
            (gravityValue * frameDuration) / 160;

          // check if they've reached the ground
          const ray = new Ray(Vector3.Zero(), Vector3.Zero());
          const rayHelper = new RayHelper(ray);
          rayHelper.attachToMesh(
            /*mesh*/ meshRef,
            /*direction*/ new Vector3(0, -0.995, 0),
            /*relativeOrigin*/ new Vector3(0, -1, 0),
            /*length*/ 0.33 // 0.25 meant the bird in eggventure couldn't climb the ~45degree pan, 0.3 meant the player couldn't climb the cave in rodont
          );

          const pick = scene.pickWithRay(
            ray,
            (mesh) => {
              return (
                floorNames.includes(mesh.name) || wallNames.includes(mesh.name)
              );
            },
            true
          );
          if (pick) newIsOnGround = pick.hit;
          if (pick) {
            // console.log("hit ground", pick.hit);
          }
        } else if (dollRefs.positionMoverRefs.velocity.y > 0) {
          // console.log("going up");
        }
        // }

        // }

        if (newIsOnGround) {
          dollRefs.positionMoverRefs.velocity.y = Math.max(
            0,
            dollRefs.positionMoverRefs.velocity.y
          );
        }

        // if (!playerMovingPaused) newPositionMoveMode = "push";
        newPositionMoveMode = "push";

        setState({ players: { main: { isOnGround: newIsOnGround } } });
      },
      check: { type: "global", prop: "frameTick" },
      step: "input",
      atStepEnd: true,
    }),

    whenIsOnGroundChanges: itemEffect({
      run({
        newValue: isOnGround,
        previousValue: prevIsOnGround,
        itemState: playerState,
        itemRefs: playerRefs,
      }) {
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
        const { dollName } =
          getCharDollStuff(playerCharacter as CharacterName) ?? {};

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
              lastSafeInputAngle: getSpeedAndAngleFromVector(
                state.players.main.inputVelocity
              ).angle,
            },
          },
        }));
      },
      step: "cameraChange",
      check: { type: "places", prop: "nowCamName" },
    }),
    whenPlayerMovementPausedChanges: itemEffect({
      run({ newValue: playerMovingPaused }) {
        const { playerCharacter } = getState().global.main;
        const playerState = getState().players.main;
        const { dollRefs, dollName, dollState } = getCharDollStuff(
          playerCharacter as CharacterName
        );

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