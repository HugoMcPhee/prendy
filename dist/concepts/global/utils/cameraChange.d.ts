import { AnyCameraName, PrendyArt } from "../../../declarations";
import { PrendyConcepFuncs } from "../../typedConcepFuncs";
export declare function makeCameraChangeUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyArt: PrendyArt): {
    getSafeCamName: {
        (cam: AnyCameraName): AnyCameraName;
        (cam: null): null;
    };
    getSafeSegmentName: <T_PlaceName extends string, T_CameraName extends string, T_SegmentName extends string>({ cam, place, segment, useStorySegmentRules, }: {
        place: T_PlaceName;
        cam: T_CameraName;
        segment: T_SegmentName;
        useStorySegmentRules?: boolean | undefined;
    }) => T_SegmentName;
    updateTexturesForNowCamera: (newCameraName: AnyCameraName, didChangePlace?: boolean) => void;
    updateNowStuffWhenSectionChanged: () => void;
};
