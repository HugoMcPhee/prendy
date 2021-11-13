import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeBackdopStoryUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    get2DAngleBetweenCharacters: (charA: string, charB: string) => number;
    get2DAngleFromCharacterToSpot: <T_Place extends string>(character: string, place: T_Place, spot: any) => number;
    getModelNameFromDoll: <T_DollName extends string>(dollName: T_DollName) => NonNullable<BackdopConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
    doWhenNowCamChanges: (checkingCamName: string, callback: () => void) => string | null;
    doWhenNowSegmentChanges: (checkingSegmentName: string, callback: () => void) => string | null;
    getSegmentFromStoryRules: <T_Place_1 extends string, T_Cam extends unknown>(place: T_Place_1, cam: T_Cam) => any;
    getSpotPosition: <T_Place_2 extends string>(place: T_Place_2, spot: any) => any;
    getSpotRotation: <T_Place_3 extends string>(place: T_Place_3, spot: any) => any;
};
