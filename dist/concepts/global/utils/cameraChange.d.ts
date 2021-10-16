import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../../typedConceptoFuncs";
export declare function makeCameraChangeUtils<ConceptoFuncs extends GameyConceptoFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, AnyCameraName extends string, PlaceName extends string, DollName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    getSafeCamName: {
        (cam: AnyCameraName): AnyCameraName;
        (cam: null): null;
    };
    getSafeSegmentName: <T_PlaceName extends PlaceName, T_CameraName extends CameraNameByPlace[T_PlaceName] & AnyCameraName, T_SegmentName extends SegmentNameByPlace[T_PlaceName]>({ cam, place, segment, useStorySegmentRules, }: {
        place: T_PlaceName;
        cam: T_CameraName;
        segment: T_SegmentName;
        useStorySegmentRules?: boolean;
    }) => any;
    updateTexturesForNowCamera: (newCameraName: AnyCameraName) => void;
    updateNowStuffWhenSectionChanged: () => void;
};
