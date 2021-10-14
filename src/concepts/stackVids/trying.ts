// import { startItemEffect, stopEffect, setState } from "concepts";

export function makeTrySafeStackVid() {}
//
// export function tryingSafeStackVid() {
//   setState({
//     stackVids: {
//       windynest_a: {
//         // videoSource: placeInfoByName.house.videoFiles.color,
//         wantToLoad: true,
//       },
//     },
//   });
//
//   const ruleName = `temp_windynest_a_test`;
//   startItemEffect({
//     name: ruleName,
//     onItemEffect: ({ newValue: vidState }) => {
//       if (vidState === "play") {
//         stopEffect(ruleName);
//         console.log("LOADED");
//
//         setTimeout(() => {
//           setState({ stackVids: { windynest_a: { wantToPause: true } } });
//         }, 3000);
//         setTimeout(() => {
//           setState({
//             stackVids: { windynest_a: { wantedSeekTime: 10 } },
//           });
//         }, 6000);
//         setTimeout(() => {
//           setState({ stackVids: { windynest_a: { wantToPlay: true } } });
//         }, 9000);
//       }
//     },
//     check: {
//       type: "stackVids",
//       prop: "vidState",
//       name: "windynest_a",
//     },
//   });
// }
