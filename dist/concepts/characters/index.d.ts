import { BackdopArt } from "../../declarations";
export default function characters(backdopArt: BackdopArt): {
    startStates: {
        [x: string]: {
            dollName: string;
            atTriggers: Partial<Record<string, boolean>>;
            atCamCubes: Partial<Record<string, boolean>>;
            hasLeftFirstTrigger: boolean;
        };
    };
    state: <T_CharacterName extends string, T_DollName extends string>(_characterName: T_CharacterName, dollName?: T_DollName | undefined) => {
        dollName: string;
        atTriggers: Partial<Record<string, boolean>>;
        atCamCubes: Partial<Record<string, boolean>>;
        hasLeftFirstTrigger: boolean;
    };
    refs: <T_CharacterName_1 extends string>(_characterName: T_CharacterName_1) => {
        testRef: null;
    };
};
