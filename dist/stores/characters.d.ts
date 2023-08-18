import { MyTypes } from "../declarations";
export default function characters<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    startStates: { [K_CharacterName in T_MyTypes["Main"]["CharacterName"]]: {
        dollName: T_MyTypes["Main"]["CharacterOptions"][K_CharacterName]["doll"];
        atTriggers: Partial<Record<T_MyTypes["Main"]["AnyTriggerName"], boolean>>;
        atCamCubes: Partial<Record<T_MyTypes["Main"]["AnyCameraName"], boolean>>;
        hasLeftFirstTrigger: boolean;
    }; };
    state: <T_CharacterName extends string, T_DollName extends T_MyTypes["Main"]["DollName"]>(_characterName: T_CharacterName, dollName?: T_DollName | undefined) => {
        dollName: T_DollName;
        atTriggers: Partial<Record<T_MyTypes["Main"]["AnyTriggerName"], boolean>>;
        atCamCubes: Partial<Record<T_MyTypes["Main"]["AnyCameraName"], boolean>>;
        hasLeftFirstTrigger: boolean;
    };
    refs: <T_CharacterName_1 extends string>(_characterName: T_CharacterName_1) => {
        testRef: null;
    };
};
