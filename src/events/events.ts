import { BasicEventParameters, basicEvents } from "./basic";
import { characterEvents, CharacterEventParameters } from "./characters";
import { DollEventParameters, dollEvents } from "./dolls";
import { playerEvents } from "./players";
import { SceneEventParameters, sceneEvents } from "./scene";
import { soundEvents } from "./sound";
import { speechEvents } from "./speech";
import { stickerEvents } from "./stickers";

export const prendyEventGroups = {
  basicEvents,
  characterEvents,
  dollEvents,
  playerEvents,
  sceneEvents,
  soundEvents,
  speechEvents,
  stickerEvents,
};

export type PrendyEventParameters<T_Group, T_Event, T_GenericParamA> =
  | BasicEventParameters<T_Group, T_Event, T_GenericParamA>
  | CharacterEventParameters<T_Group, T_Event, T_GenericParamA>
  | DollEventParameters<T_Group, T_Event, T_GenericParamA>
  | SceneEventParameters<T_Group, T_Event, T_GenericParamA>;
