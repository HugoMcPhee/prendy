import { DollName, PlaceName, SpotNameByPlace } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../stores/typedStoreHelpers";
export declare function makeDollStoryUtils<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<PrendyConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
    get2DAngleFromDollToSpot: <T_Place extends A_PlaceName>(dollA: A_DollName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
};
