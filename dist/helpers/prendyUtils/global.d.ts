import { MyTypes } from "../../declarations";
export declare function setGlobalState<GlobalItemState extends ReturnType<MyTypes["Repond"]["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void): void;
export declare function getGlobalState(): Record<any, any>;
