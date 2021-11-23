/// <reference types="react" />
import { PrendyConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { SpeechVidFiles } from "../../../declarations";
export declare function makeSpeechBubble<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, speechVidFiles: SpeechVidFiles): ({ name }: {
    name: keyof ReturnType<ConcepFuncs["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
