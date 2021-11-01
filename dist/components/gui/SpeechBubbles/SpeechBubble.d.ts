/// <reference types="react" />
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeSpeechBubble<ConcepFuncs extends BackdopConcepFuncs, CharacterName extends string, SpeechVidFiles extends Record<string, string>>(concepFuncs: ConcepFuncs, speechVidFiles: SpeechVidFiles): ({ name }: {
    name: keyof ReturnType<ConcepFuncs["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
