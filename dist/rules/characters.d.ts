import { MyTypes } from "../declarations";
export declare function get_characterDynamicRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function get_startDynamicCharacterRulesForInitialState<CharacterDynamicRules extends ReturnType<typeof get_characterDynamicRules>, T_MyTypes extends MyTypes = MyTypes>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly T_MyTypes["Main"]["CharacterName"][], storeHelpers: T_MyTypes["StoreHelpers"]): () => () => void;
export declare function get_characterRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
