export function story_fake<ChapterName extends string, StoryPartName extends string>() {
  const state = () => {
    const initialState = {
      // screen stickers
      screenStickerIsVisible: false,
      screenStickerText: "🎵",
      screenStickerPosition: { x: 0.7, y: 0.3 },
      // to know what to start with when a place loads
      chapterName: "hallways" as ChapterName,
      storyPart: "010_before_start" as StoryPartName, // to know which part of the chapter is happening
    };

    // return initialState as typeof initialState & { [key: string]: any };
    return initialState as any;
  };

  const refs = () =>
    ({
      alienFollowInterval: null as null | ReturnType<typeof setInterval>,
      showSmellsTimeout: null as null | ReturnType<typeof setTimeout>,
    } as Record<string, any>);

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    main: state() as any,
  };

  const story = { startStates, state, refs };
  return story;
}
