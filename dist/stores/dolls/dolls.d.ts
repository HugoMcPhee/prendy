import { MyTypes } from "../../declarations";
export default function dolls<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    startStates: { [K_DollName in T_MyTypes["Types"]["DollName"]]: any; };
    state: <T_DollName extends string, T_ModelName extends T_MyTypes["Types"]["ModelName"]>(_dollName: T_DollName, modelName?: T_ModelName | undefined) => any;
    refs: <T_DollName_1 extends T_MyTypes["Types"]["DollName"], T_ModelName_1 extends T_MyTypes["Types"]["ModelName"]>(dollName: T_DollName_1, itemState: any) => any;
};
