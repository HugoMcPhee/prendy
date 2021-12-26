/// <reference types="react" />
import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { PrendyOptions, SpeechVidFiles } from "../../../declarations";
export declare function makeSpeechBubble<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, speechVidFiles: SpeechVidFiles): ({ name }: {
    name: keyof ReturnType<StoreHelpers["getState"]>["speechBubbles"] & string;
}) => JSX.Element;
