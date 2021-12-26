export declare type ConvoAnswer<T_ConvoItemName extends string> = {
    text: string;
    next: T_ConvoItemName;
};
export declare type ConvoChosenAnswers<T_ConvoItemName extends string> = Record<T_ConvoItemName, // Question convo name
T_ConvoItemName>;
