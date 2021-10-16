// import { makeRules } from "concepts";
// Not used at the moment
// export const keyboardRules = makeRules((addItemEffect) => ({
//   ifLeftControlKeyChanged: addItemEffect({
//     // onItemEffect({ newValue: controlKeyPressed }) {
//     onItemEffect() {
//       // console.log("controlKeyPressed");
//       // console.log(controlKeyPressed);
//       // setState({
//       //   global: {
//       //     main: {
//       //       navigationOn: controlKeyPressed,
//       //       canDoOnePointerPanForAllSections: controlKeyPressed,
//       //     },
//       //   },
//       // });
//     },
//     check: {
//       prop: "ControlLeft",
//       type: "keyboards",
//       name: "main",
//     },
//   }),
// }));
export function addKeyboardRules() {
    // startEffect({
    //   if: "ShiftLeft",
    //   in: "keyboards",
    //   name: "keyboardA",
    //   becomes: "different",
    //   then({ newValue: shiftKeyPressed }) {
    //     setState({
    //       global: {
    //         main: { canDoOnePointerPanForAllSections: shiftKeyPressed },
    //       },
    //     });
    //   },
    // });
    // TODO: A loop through each keyboard is better here
    //  otherwise all keyboard subscribers would update
    // addTrickyRule({
    //   listenerType: "subscriber",
    //   name: "keysToPreviousKeys",
    //   changesToCheck:
    //     {
    //       itemTypes: "keyboards"
    //     }
    //   whatToDo() {
    //     const keyboardsState = getState().keyboards;
    //
    //     forEach(keyboardIds, (keyboardId: string) => {
    //       // used to set previousKeyboards here , but hopefully don't need to now with the diff checking stuff
    //       // setState({ previousKeyboards: { keyboardA: { [keyName]: false } } });
    //       // setShared(["frame", "previousKeyboards", keyboardId], {
    //       //   ...keyboardsState[keyboardId]
    //       // });
    //     });
    //   }
    // });
}
