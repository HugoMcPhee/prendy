export default "default";

// doorsInfo
// stairy (placename)
//   to_downstairs (trigger name)
//     toPlace: basement
//     toSpot: upstairs spot
// Basement

// import { ModelName } from "art/models";
// import {
//   PlaceName,
//   SpotNameByPlace,
//   TriggerNameByPlace,
//   AnySpotName,
//   AnyTriggerName,
//   AnyCameraName,
//   CameraNameByPlace,
//   AnySegmentName,
//   SegmentNameByPlace,
// } from "art/places";

// type ToNewOption<T_PlaceName extends PlaceName> = {
//   [P_PlaceName in Exclude<PlaceName, T_PlaceName>]: {
//     toPlace: P_PlaceName;
//     toSpot: SpotNameByPlace[P_PlaceName];
//     toCam?: CameraNameByPlace[P_PlaceName];
//     toSegment?: SegmentNameByPlace[P_PlaceName];
//   };
// }[Exclude<PlaceName, T_PlaceName>];

// export type DoorsInfo = Partial<
//   {
//     [P_PlaceName in PlaceName]: Partial<
//       {
//         [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: ToNewOption<P_PlaceName>;
//       }
//     >;
//   }
// >;

// type DoorsInfoLoose = {
//   [P_PlaceName in PlaceName]: {
//     [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: {
//       toPlace: PlaceName;
//       toSpot: AnySpotName;
//     };
//   };
// };

// export type AnyToPlaceOption = {
//   toPlace: PlaceName;
//   toSpot: AnySpotName;
//   // NOTE might be able to make this auto if the first spot is inside a cam collider?
//   toCam?: AnyCameraName;
//   toSegment?: AnySegmentName;
// };

// export type ToPlaceOption<T_PlaceName extends PlaceName> = {
//   toPlace: T_PlaceName;
//   toSpot: SpotNameByPlace[T_PlaceName];
//   // NOTE might be able to make this auto if the first spot is inside a cam collider?
//   toCam?: CameraNameByPlace[T_PlaceName];
//   toSegment?: SegmentNameByPlace[T_PlaceName]; // could use nicer type like SegmentNameFromCamAndPlace,  or a new SegmentNameFromPlace?
// };

// export type ToPlaceOptionByPlace = {
//   [P_PlaceName in PlaceName]: {
//     toPlace: P_PlaceName;
//     toSpot: SpotNameByPlace[P_PlaceName];
//     toCam?: CameraNameByPlace[P_PlaceName];
//     toSegment?: SegmentNameByPlace[P_PlaceName];
//   };
// };

// export type DoorsInfoLoose = Partial<
//   Record<PlaceName, Partial<Record<AnyTriggerName, AnyToPlaceOption>>>
// >;

// export type ModelNamesByPlaceLoose = Record<PlaceName, ModelName[]>;
