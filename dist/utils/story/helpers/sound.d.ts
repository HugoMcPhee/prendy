import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeSoundStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, MusicName extends string, MusicFiles extends Record<MusicName, string>>(concepFuncs: ConcepFuncs, musicNames: readonly MusicName[], musicFiles: MusicFiles): {
    playNewMusic: (newMusicName: MusicName) => void;
    stopAllMusic: () => void;
};
