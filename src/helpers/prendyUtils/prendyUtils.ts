import { MyTypes } from "../../declarations";

export function makePrendyStoryUtils<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["Repond"],
  _prendyStores: T_MyTypes["Stores"]
) {
  // return {
  //   ...get_characterStoryUtils<T_MyTypes>(storeHelpers),
  //   ...get_dollStoryUtils<T_MyTypes>(storeHelpers),
  //   ...get_sceneStoryUtils<T_MyTypes>(storeHelpers),
  //   ...get_spotStoryUtils<T_MyTypes>(storeHelpers),
  //   getUsefulStoryStuff: get_getUsefulStoryStuff(storeHelpers),
  // };
}
