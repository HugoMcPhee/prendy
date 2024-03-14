import { getRefs, onNextTick } from "repond";
import { CameraNameFromPlace, PlaceName, SegmentNameFromCameraAndPlace } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

type CamSegmentRulesOptionsUntyped = Partial<{
  [P_PlaceName in PlaceName]: Partial<{
    [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
      usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
    ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
  }>;
}>;

type CamSegmentRulesOptions = Partial<{
  [P_PlaceName in PlaceName]: Partial<{
    [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
      usefulStuff: ReturnType<typeof getUsefulStoryStuff>
    ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
  }>;
}>;

export function initCamSegmentEffects(callbacksMap: CamSegmentRulesOptions) {
  onNextTick(() => {
    getRefs().global.main.camSegmentRulesOptions = callbacksMap as CamSegmentRulesOptionsUntyped;
  });
  // return {
  //   startAll() {
  //     // This sets an options object in global refs that gets checked when changing segment,
  //     // so no rules are actually started here, but it uses the same format as the other rule makers
  //     getRefs().global.main.camSegmentRulesOptions = callbacksMap as CamSegmentRulesOptionsUntyped;
  //   },
  //   stopAll() {
  //     /* nothing to stop */
  //   },
  // };
}
