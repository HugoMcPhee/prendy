/// <reference types="react" />
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { SpeechVidFiles } from "../../../declarations";
export declare function makeSpeechBubble<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, speechVidFiles: SpeechVidFiles): ({ name }: {
    name: keyof ReturnType<ConcepFuncs["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
