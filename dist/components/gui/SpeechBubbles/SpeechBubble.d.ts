/// <reference types="react" />
import { PrendyConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { PrendyOptions, SpeechVidFiles } from "../../../declarations";
export declare function makeSpeechBubble<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyStartOptions: PrendyOptions, speechVidFiles: SpeechVidFiles): ({ name }: {
    name: keyof ReturnType<ConcepFuncs["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
