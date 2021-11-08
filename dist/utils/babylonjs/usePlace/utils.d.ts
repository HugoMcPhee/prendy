import { Camera, Scene, TargetCamera } from "@babylonjs/core";
import { BackdopConcepFuncs, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag?: string): void;
export declare function makeUsePlaceUtils<ConcepFuncs extends BackdopConcepFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, CharacterName extends string, AnyCameraName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    loadVideoBlob: (filepath: string) => Promise<Blob>;
    setFirstCharacterPosition: ({ characterName, placeName, }: {
        characterName: CharacterName;
        placeName: PlaceName;
    }) => void;
    testAppendVideo: typeof testAppendVideo;
    loadNowVideosForPlace: () => Promise<boolean>;
    loadProbeImagesForPlace: (placeName: PlaceName) => Promise<void>;
    makeCameraFromModel: (theCamera: Camera, scene: Scene) => TargetCamera;
};
