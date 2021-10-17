/// <reference types="react" />
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeSpeechBubble<ConcepFuncs extends BackdopConcepFuncs, CharacterName extends string>(concepFuncs: ConcepFuncs): ({ name }: {
    name: any;
}) => JSX.Element;
