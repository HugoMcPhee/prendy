import { GameyConceptoFuncs, GameyStartOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderGameyConcepts } from "../typedConceptoFuncs";
export declare function makeDollDynamicRules<ConceptoFuncs extends GameyConceptoFuncs, GameyStartOptions extends GameyStartOptionsUntyped, GameyConcepts extends PlaceholderGameyConcepts, StartState_Dolls extends GameyConcepts["dolls"]["startStates"] & ReturnType<ConceptoFuncs["getState"]>["dolls"], DollName extends keyof ReturnType<ConceptoFuncs["getState"]>["dolls"] & string, ModelName extends string, AnyAnimationName extends string, AnimationNameByModel extends Record<ModelName, AnyAnimationName>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions, gameyConcepts: GameyConcepts, modelInfoByName: ModelInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<ConceptoFuncs extends GameyConceptoFuncs, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, DollName extends string>(conceptoFuncs: ConceptoFuncs, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<GameyStartOptions extends GameyStartOptionsUntyped, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, StartState_Dolls extends GameyConcepts["dolls"]["startStates"] & ReturnType<ConceptoFuncs["getState"]>["dolls"], DollName extends keyof StartState_Dolls & string, ModelName extends string, AnyAnimationName extends string, AnimationNameByModel extends Record<ModelName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<string>>(gameyStartOptions: GameyStartOptions, dollDynamicRules: DollDynamicRules, conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, modelInfoByName: ModelInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
