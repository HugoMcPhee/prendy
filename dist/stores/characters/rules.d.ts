import { PrendyAssets, PrendyOptions, CharacterName } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeTyped_characterDynamicRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeTyped_startDynamicCharacterRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, CharacterDynamicRules extends ReturnType<typeof makeTyped_characterDynamicRules>>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], storeHelpers: StoreHelpers): () => () => void;
export declare function makeTyped_characterRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
