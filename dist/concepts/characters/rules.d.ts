import { PrendyArt, PrendyOptions, CharacterName } from "../../declarations";
import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeCharacterDynamicRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeStartDynamicCharacterRulesForInitialState<ConcepFuncs extends PrendyConcepFuncs, CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], concepFuncs: ConcepFuncs): () => () => void;
export declare function makeCharacterRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
