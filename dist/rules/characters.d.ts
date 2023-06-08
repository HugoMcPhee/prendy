import { CharacterName, PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../declarations";
export declare function get_characterDynamicRules(storeHelpers: PrendyStoreHelpers, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function get_startDynamicCharacterRulesForInitialState<CharacterDynamicRules extends ReturnType<typeof get_characterDynamicRules>>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], storeHelpers: PrendyStoreHelpers): () => () => void;
export declare function get_characterRules(storeHelpers: PrendyStoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
