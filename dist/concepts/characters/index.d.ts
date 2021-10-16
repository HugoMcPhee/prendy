import { CharacterOptionsPlaceholder } from "../typedConceptoFuncs";
export default function characters<CharacterName extends string, DollName extends string, FontName extends string, AnyTriggerName extends string, AnyCameraName extends string, CharacterOptions extends CharacterOptionsPlaceholder<CharacterName, DollName, FontName>>(characterNames: readonly CharacterName[], dollNames: readonly DollName[], characterOptions: CharacterOptions): {
    startStates: { [K_CharacterName in CharacterName]: {
        dollName: DollName;
        atTriggers: Partial<Record<AnyTriggerName, boolean>>;
        atCamCubes: Partial<Record<AnyCameraName, boolean>>;
        hasLeftFirstTrigger: boolean;
    }; };
    state: <T_CharacterName extends string, T_DollName extends DollName>(_characterName: T_CharacterName, dollName?: T_DollName) => {
        dollName: DollName;
        atTriggers: Partial<Record<AnyTriggerName, boolean>>;
        atCamCubes: Partial<Record<AnyCameraName, boolean>>;
        hasLeftFirstTrigger: boolean;
    };
    refs: <T_CharacterName_1 extends string>(_characterName: T_CharacterName_1) => {
        testRef: any;
    };
};
