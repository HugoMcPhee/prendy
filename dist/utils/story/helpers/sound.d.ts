import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { MusicFiles, MusicName } from "../../../declarations";
export declare function makeSoundStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName>(concepFuncs: ConcepFuncs, musicNames: readonly A_MusicName[], musicFiles: A_MusicFiles): {
    playNewMusic: (newMusicName: A_MusicName) => void;
    stopAllMusic: () => void;
};
