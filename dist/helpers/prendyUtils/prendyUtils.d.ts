import { MyTypes } from "../../declarations";
export declare function makePrendyStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], _prendyStores: T_MyTypes["Stores"]): {
    getUsefulStoryStuff: () => {
        storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
        storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
        globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
        nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
        nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
        nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
        placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
        placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
        camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
        camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
    };
    getSpotPosition: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place]) => import("@babylonjs/core").Vector3;
    getSpotRotation: <T_Place_1 extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place_1, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_1]) => import("@babylonjs/core").Vector3;
    getSegmentFromStoryRules: <T_Place_2 extends T_MyTypes["Main"]["PlaceName"], T_Cam extends T_MyTypes["Main"]["CameraNameByPlace"][T_Place_2]>(place: T_Place_2, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: T_MyTypes["Main"]["AnySegmentName"], callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"], callback: () => void) => string | null;
    waitForNowPlaceToChange: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    waitForPlaceFullyLoaded: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    waitForNowCamToChange: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"]) => Promise<void>;
    waitForNextTick: () => Promise<unknown>;
    getModelNameFromDoll: <T_DollName extends T_MyTypes["Main"]["DollName"]>(dollName: T_DollName) => NonNullable<NonNullable<T_MyTypes["Stores"]["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleFromDollToSpot: <T_Place_3 extends T_MyTypes["Main"]["PlaceName"]>(dollA: T_MyTypes["Main"]["DollName"], place: T_Place_3, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_3]) => number;
    get2DAngleBetweenDolls: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => number;
    get2DAngleFromCharacterToSpot: <T_Place_4 extends T_MyTypes["Main"]["PlaceName"]>(character: T_MyTypes["Main"]["CharacterName"], place: T_Place_4, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_4]) => number;
    get2DAngleBetweenCharacters: (charA: T_MyTypes["Main"]["CharacterName"], charB: T_MyTypes["Main"]["CharacterName"]) => number;
};
