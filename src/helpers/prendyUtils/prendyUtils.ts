import { MyTypes } from "../../declarations";
import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";
import { get_characterStoryUtils } from "./characters";
import { get_dollStoryUtils } from "./dolls";
import { get_sceneStoryUtils } from "./scene";
import { get_spotStoryUtils } from "./spots";

export function makePrendyStoryUtils<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["StoreHelpers"],
  _prendyStores: T_MyTypes["Stores"]
) {
  return {
    ...get_characterStoryUtils<T_MyTypes>(storeHelpers),
    ...get_dollStoryUtils<T_MyTypes>(storeHelpers),
    ...get_sceneStoryUtils<T_MyTypes>(storeHelpers),
    ...get_spotStoryUtils<T_MyTypes>(storeHelpers),
    getUsefulStoryStuff: get_getUsefulStoryStuff(storeHelpers),
  };
}
