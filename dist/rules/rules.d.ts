export declare function makeStartPrendyMainRules(): () => () => void;
export type SubscribableRules = Record<any, any> & {
    startAll: () => void;
    stopAll: () => void;
};
export declare function rulesToSubscriber(rules: SubscribableRules[]): () => () => void;
export declare function combineSubscribers(subscribers: (() => () => void)[]): () => () => void;
export declare function makeStartPrendyRules(customRules: SubscribableRules[]): () => () => void;
export declare function makeStartAndStopRules(customRules: SubscribableRules[]): () => null;
