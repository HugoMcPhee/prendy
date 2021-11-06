import { BackdopConcepFuncs, PlaceInfoByNamePlaceholder } from "../../typedConcepFuncs";
export declare function makeCameraChangeUtils<ConcepFuncs extends BackdopConcepFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, AnyCameraName extends string, PlaceName extends string, DollName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    getSafeCamName: {
        (cam: AnyCameraName): AnyCameraName;
        (cam: null): null;
    };
    getSafeSegmentName: <T_PlaceName extends PlaceName, T_CameraName extends CameraNameByPlace[T_PlaceName] & AnyCameraName, T_SegmentName extends SegmentNameByPlace[T_PlaceName]>({ cam, place, segment, useStorySegmentRules, }: {
        place: T_PlaceName;
        cam: T_CameraName;
        segment: T_SegmentName;
        useStorySegmentRules?: boolean | undefined;
    }) => T_SegmentName;
    updateTexturesForNowCamera: (newCameraName: AnyCameraName, didChangePlace?: boolean) => void;
    updateNowStuffWhenSectionChanged: () => void;
};
