import { PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function makePrendyStoryUtils(storeHelpers: PrendyStoreHelpers, _prendyStores: PrendyStores): {
    get2DAngleBetweenCharacters: (charA: string, charB: string) => number;
    get2DAngleFromCharacterToSpot: <T_Place extends string>(character: string, place: T_Place, spot: string) => number;
    getModelNameFromDoll: <T_DollName extends string>(dollName: T_DollName) => any;
    get2DAngleBetweenDolls: (dollA: string, dollB: string) => number;
    get2DAngleFromDollToSpot: <T_Place_1 extends string>(dollA: string, place: T_Place_1, spot: string) => number;
    doWhenNowCamChanges: (checkingCamName: string, callback: () => void) => string | null;
    doWhenNowSegmentChanges: (checkingSegmentName: string, callback: () => void) => string | null;
    getSegmentFromStoryRules: <T_Place_2 extends string, T_Cam extends string>(place: T_Place_2, cam: T_Cam) => any;
    getSpotPosition: <T_Place_3 extends string>(place: T_Place_3, spot: string) => import("@babylonjs/core").Vector3;
    getSpotRotation: <T_Place_4 extends string>(place: T_Place_4, spot: string) => import("@babylonjs/core").Vector3;
};
