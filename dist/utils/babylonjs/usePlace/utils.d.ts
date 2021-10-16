import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConceptoFuncs";
export declare function makeUsePlaceUtils<ConceptoFuncs extends GameyConceptoFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, CharacterName extends string, AnyCameraName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    loadVideoBlob: (filepath: string) => Promise<Blob>;
    setFirstCharacterPosition: ({ characterName, placeName, }: {
        characterName: CharacterName;
        placeName: PlaceName;
    }) => void;
    testAppendVideo: (theVideo: HTMLVideoElement, id: string, elementTag?: string) => void;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
