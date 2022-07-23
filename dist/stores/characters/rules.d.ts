import { PrendyAssets, PrendyOptions, CharacterName } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeCharacterDynamicRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeStartDynamicCharacterRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], storeHelpers: StoreHelpers): () => () => void;
export declare function makeCharacterRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
