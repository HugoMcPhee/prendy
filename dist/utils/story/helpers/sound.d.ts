import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { MusicFiles, MusicName } from "../../../declarations";
export declare function makeSoundStoryHelpers<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, musicNames: readonly MusicName[], musicFiles: MusicFiles): {
    playNewMusic: (newMusicName: MusicName) => void;
    stopAllMusic: () => void;
};
