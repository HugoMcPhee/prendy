import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";
import { get_characterStoryUtils } from "./characters";
import { get_dollStoryUtils } from "./dolls";
import { get_sceneStoryUtils } from "./scene";
import { get_spotStoryUtils } from "./spots";
export function makePrendyStoryUtils(storeHelpers, _prendyStores) {
    return {
        ...get_characterStoryUtils(storeHelpers),
        ...get_dollStoryUtils(storeHelpers),
        ...get_sceneStoryUtils(storeHelpers),
        ...get_spotStoryUtils(storeHelpers),
        getUsefulStoryStuff: get_getUsefulStoryStuff(storeHelpers),
    };
}
