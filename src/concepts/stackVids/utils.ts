import { ConceptsHelperTypes } from "concep";
import { VidState } from "../../concepts/safeVids";
import { StackVidState } from ".";
import { BackdopConcepFuncs } from "../typedConcepFuncs";

export function makeStackVidStoreUtils<
  ConcepFuncs extends BackdopConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const {
    getState,

    setState,
    startEffect,
    startItemEffect,
    stopEffect,
  } = concepFuncs;

  type ItemType = keyof ReturnType<BackdopConcepFuncs["getState"]> &
    keyof ReturnType<BackdopConcepFuncs["getRefs"]>;
  type HelperType<T extends ItemType> = ConceptsHelperTypes<
    BackdopConcepFuncs["getState"],
    BackdopConcepFuncs["getRefs"],
    T
  >;
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  function doWhenStackVidStateChanges(
    stackVidId: string,
    checkShouldRun: (newVidState: StackVidState) => boolean,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    const initialVidState = getState().stackVids[stackVidId].vidState;
    if (checkInitial && checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName = "doWhenStackVidStateChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      onItemEffect: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "stackVids", prop: "vidState", name: stackVidId },
      whenToRun: "subscribe",
      flow: "stackVidStateUpdates",
    });
    return ruleName;
  }

  // the same but waits for checkShouldRun to be false before checking for true

  // function doWhenStackVidStateChangesSafer(
  //   stackVidId: string,
  //   checkShouldRun: (newVidState: StackVidState) => boolean,
  //   callback: () => void
  // ) {
  //   return doWhenStackVidStateChanges(
  //     stackVidId,
  //     (newState) => !checkShouldRun(newState),
  //     () =>
  //       doWhenStackVidStateChanges(
  //         stackVidId,
  //         (newState) => checkShouldRun(newState),
  //         callback
  //       )
  //   );
  // }

  function doWhenStackVidStateReady(
    stackVidId: string,
    vidStateToCheck: StackVidState,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenStackVidStateChanges(
      stackVidId,
      (newState) => newState === vidStateToCheck,
      callback,
      checkInitial
    );
  }

  function doWhenStackVidStateReadyOrInstant(
    stackVidId: string,
    vidStateToCheck: StackVidState,
    callback: () => void
  ) {
    return doWhenStackVidStateChanges(
      stackVidId,
      (newState) => newState === vidStateToCheck,
      callback
    );
  }

  function doWhenStackVidPlay(
    stackVidId: string,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenStackVidStateReady(stackVidId, "play", callback, checkInitial);
  }

  function doWhenStackVidPlayOrPause(
    stackVidId: string,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenStackVidStateChanges(
      stackVidId,
      (newState) => newState === "play" || newState === "pause",
      callback,
      checkInitial
    );
  }

  // safe vids

  // when both the safe vids for the stack vid  change
  function doWhenBothSafeVidsChange(
    stackVidId: string,
    checkShouldRun: (newVidState: VidState) => boolean,
    callback: () => void,
    shouldCheckInstant: boolean = true
  ) {
    const { vidAId, vidBId } = getState().stackVids[stackVidId];
    if (vidAId === null || vidBId === null) return;
    // TODO? Check initial state?

    // NOTE checking initial state might not be ideal?OR need to wait for not playing first
    const initialVidState_a = getState().safeVids[vidAId].vidState;
    const initialVidState_b = getState().safeVids[vidBId].vidState;

    if (
      shouldCheckInstant &&
      checkShouldRun(initialVidState_a) &&
      checkShouldRun(initialVidState_b)
    ) {
      callback();
      return null;
    }

    const ruleName =
      "doWhenBothSafeVidsForStackChanges" + stackVidId + Math.random();

    startEffect({
      name: ruleName,
      onEffect: (_diffInfo) => {
        const vidState_a = getState().safeVids[vidAId].vidState;
        const vidState_b = getState().safeVids[vidBId].vidState;

        if (checkShouldRun(vidState_a) && checkShouldRun(vidState_b)) {
          stopEffect(ruleName);
          callback();
        }
      },
      check: { type: ["safeVids"], prop: ["vidState"], name: [vidAId, vidBId] },
      flow: "safeVidStateUpdates",
      whenToRun: "subscribe",
    });
  }

  // the same but waits for checkShouldRun to be false before checking for true
  // function doWhenBothSafeVidsForStackChangesSafer(
  //   stackVidId: string,
  //   checkShouldRun: (newVidState: VidState) => boolean,
  //   callback: () => void
  // ) {
  //   doWhenBothSafeVidsChange(
  //     stackVidId,
  //     (newVidState) => !checkShouldRun(newVidState),
  //     () => {
  //       doWhenBothSafeVidsChange(
  //         stackVidId,
  //         (newState) => checkShouldRun(newState),
  //         callback
  //       );
  //     }
  //   );
  // }

  function doWhenBothSafeVidsReady(
    stackVidId: string,
    vidStateToCheck: VidState,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    doWhenBothSafeVidsChange(
      stackVidId,
      (newState) => newState === vidStateToCheck,
      callback,
      checkInitial
    );
  }

  function doWhenBothSafeVidsForStackPlayOrPause(
    stackVidId: string,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    doWhenBothSafeVidsChange(
      stackVidId,
      (newState) => newState === "play" || newState === "pause",
      callback,
      checkInitial
    );
  }

  // export function doWhenBothSafeVidsForStackPlayOrPauseSafer(
  //   stackVidId: string,
  //   callback: () => void
  // ) {
  //   doWhenBothSafeVidsForStackChangesSafer(
  //     stackVidId,
  //     (newState) => newState === "play" || newState === "pause",
  //     callback
  //   );
  // }

  function setBothSafeVidsState(
    stackVidId: string,
    newState: Partial<ItemState<"stackVids">>
  ) {
    const { vidAId, vidBId } = getState().stackVids[stackVidId];
    if (vidAId === null || vidBId === null) return;

    setState({ safeVids: { [vidAId]: newState, [vidBId]: newState } });
  }

  return {
    doWhenStackVidStateReady,
    doWhenStackVidStateReadyOrInstant,
    doWhenStackVidPlay,
    doWhenStackVidPlayOrPause,
    doWhenBothSafeVidsReady,
    doWhenBothSafeVidsForStackPlayOrPause,
    setBothSafeVidsState,
  };
}
