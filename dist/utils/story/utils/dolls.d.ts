import { DollName, PlaceName, SpotNameByPlace } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
export declare function makeTyped_dollStoryUtils<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<NonNullable<PrendyStores["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleFromDollToSpot: <T_Place extends A_PlaceName>(dollA: A_DollName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
};
