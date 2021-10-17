import { BackdopConcepFuncs, BackdopOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare function makeDollDynamicRules<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped, BackdopConcepts extends PlaceholderBackdopConcepts, StartState_Dolls extends BackdopConcepts["dolls"]["startStates"] & ReturnType<ConcepFuncs["getState"]>["dolls"], DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] & string, ModelName extends string, AnyAnimationName extends string, AnimationNameByModel extends Record<ModelName, AnyAnimationName>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopConcepts: BackdopConcepts, modelInfoByName: ModelInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<ConcepFuncs extends BackdopConcepFuncs, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, DollName extends string>(concepFuncs: ConcepFuncs, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<BackdopOptions extends BackdopOptionsUntyped, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, StartState_Dolls extends BackdopConcepts["dolls"]["startStates"] & ReturnType<ConcepFuncs["getState"]>["dolls"], DollName extends keyof StartState_Dolls & string, ModelName extends string, AnyAnimationName extends string, AnimationNameByModel extends Record<ModelName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<string>>(backdopStartOptions: BackdopOptions, dollDynamicRules: DollDynamicRules, concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, modelInfoByName: ModelInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
