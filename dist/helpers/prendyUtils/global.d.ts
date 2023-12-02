import { AllState } from "repond";
export declare function setGlobalState<GlobalItemState extends AllState["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: AllState["global"]["main"]) => PartialGlobalState), callback?: () => void): void;
export declare function getGlobalState(): any;
