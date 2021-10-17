import { BackdopConcepFuncs, ModelInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare function makeModelRules<ConcepFuncs extends BackdopConcepFuncs, ModelName extends string, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(concepFuncs: ConcepFuncs, modelInfoByName: ModelInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
