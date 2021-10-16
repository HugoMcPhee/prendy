import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeSoundStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs, MusicName extends string, MusicFiles extends Record<MusicName, string>>(conceptoFuncs: ConceptoFuncs, musicNames: readonly MusicName[], musicFiles: MusicFiles): {
    playNewMusic: (newMusicName: MusicName) => void;
    stopAllMusic: () => void;
};
