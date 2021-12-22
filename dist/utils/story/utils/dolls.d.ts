import { DollName } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../concepts/typedStoreHelpers";
export declare function makeDollStoryUtils<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_DollName extends DollName = DollName>(storeHelpers: StoreHelpers): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<PrendyConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
};
