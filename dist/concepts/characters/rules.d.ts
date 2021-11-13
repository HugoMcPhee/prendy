import { BackdopArt, BackdopOptions, CharacterName } from "../../declarations";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeCharacterDynamicRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeStartDynamicCharacterRulesForInitialState<ConcepFuncs extends BackdopConcepFuncs, CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], concepFuncs: ConcepFuncs): () => () => void;
export declare function makeCharacterRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
