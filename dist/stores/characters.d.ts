import { CharacterName, DollName, AnyTriggerName, AnyCameraName, CharacterOptions, PrendyAssets } from "../declarations";
export default function characters<A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_PrendyAssets extends PrendyAssets = PrendyAssets>(prendyAssets: A_PrendyAssets): {
    startStates: { [K_CharacterName in A_CharacterName]: {
        dollName: string;
        atTriggers: Partial<Record<A_AnyTriggerName, boolean>>;
        atCamCubes: Partial<Record<A_AnyCameraName, boolean>>;
        hasLeftFirstTrigger: boolean;
    }; };
    state: <T_CharacterName extends string, T_DollName extends A_DollName>(_characterName: T_CharacterName, dollName?: T_DollName | undefined) => {
        dollName: string;
        atTriggers: Partial<Record<A_AnyTriggerName, boolean>>;
        atCamCubes: Partial<Record<A_AnyCameraName, boolean>>;
        hasLeftFirstTrigger: boolean;
    };
    refs: <T_CharacterName_1 extends string>(_characterName: T_CharacterName_1) => {
        testRef: null;
    };
};
