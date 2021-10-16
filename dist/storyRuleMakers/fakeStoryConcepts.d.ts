export declare function story_fake<ChapterName extends string, StoryPartName extends string>(): {
    startStates: {
        main: any;
    };
    state: () => any;
    refs: () => Record<string, any>;
};
