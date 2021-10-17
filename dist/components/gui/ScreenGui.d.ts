/// <reference types="react" />
import { BackdopConcepFuncs, PickupsInfoPlaceholder } from "../../concepts/typedConcepFuncs";
export declare function makeScreenGui<ConcepFuncs extends BackdopConcepFuncs, CharacterName extends string, PickupName extends string, PickupsInfo extends PickupsInfoPlaceholder<PickupName>>(concepFuncs: ConcepFuncs, characterNames: readonly CharacterName[], pickupsInfo: PickupsInfo): (_: {}) => JSX.Element;
