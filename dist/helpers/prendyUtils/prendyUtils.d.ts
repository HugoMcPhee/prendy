import { AnyCameraName, AnySegmentName, CameraNameByPlace, CharacterName, DollName, PlaceName, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function makePrendyStoryUtils<A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers, _prendyStores: A_PrendyStores): {
    get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
    get2DAngleFromCharacterToSpot: <T_Place extends A_PlaceName>(character: A_CharacterName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<NonNullable<A_PrendyStores["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
    get2DAngleFromDollToSpot: <T_Place_1 extends A_PlaceName>(dollA: A_DollName, place: T_Place_1, spot: A_SpotNameByPlace[T_Place_1]) => number;
    doWhenNowCamChanges: (checkingCamName: A_AnyCameraName, callback: () => void) => string | null;
    doWhenNowSegmentChanges: (checkingSegmentName: A_AnySegmentName, callback: () => void) => string | null;
    getSegmentFromStoryRules: <T_Place_2 extends A_PlaceName, T_Cam extends A_CameraNameByPlace[T_Place_2]>(place: T_Place_2, cam: T_Cam) => any;
    waitForNowPlaceToChange: (checkingPlaceName: A_PlaceName) => Promise<void>;
    waitForPlaceFullyLoaded: (checkingPlaceName: A_PlaceName) => Promise<void>;
    waitForNowCamToChange: (checkingCamName: A_AnyCameraName) => Promise<void>;
    waitForNextTick: () => Promise<unknown>;
    getUsefulStoryStuff: () => {
        storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
        storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
        globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
        nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
        nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
        nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
        placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
        placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
        camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
        camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
    };
    getSpotPosition: <T_Place_3 extends A_PlaceName>(place: T_Place_3, spot: A_SpotNameByPlace[T_Place_3]) => import("@babylonjs/core").Vector3;
    getSpotRotation: <T_Place_4 extends A_PlaceName>(place: T_Place_4, spot: A_SpotNameByPlace[T_Place_4]) => import("@babylonjs/core").Vector3;
};
