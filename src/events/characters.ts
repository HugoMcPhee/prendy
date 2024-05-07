import { addSubEvents, eventDo, makeEventTypes, runEvent, setLiveEventState, II } from "repond-events";
import {
  get2DAngleBetweenCharacters,
  get2DAngleFromCharacterToSpot,
  getCharDollStuff,
} from "../helpers/prendyUtils/characters";
import { AnimationNameFromCharacter, CharacterName, DollName, PlaceName, SpotNameByPlace } from "../types";
import { Vector3 } from "@babylonjs/core";
import { getState, setState } from "repond";

// type whor =

export const characterEvents = makeEventTypes(({ event }) => ({
  setAnimation: event({
    run: ({ who, to }, { liveId, isFirstAdd }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "setAnimation", { which: dollName, to })]);
    },
    params: {
      who: "" as CharacterName,
      to: "" as AnimationNameFromCharacter<CharacterName>, // AnimationNameFromModel might keep the type better
    },
  }),
  setPosition: event({
    run: ({ who, to }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "setPosition", { which: dollName, to })]);
    },
    params: { who: "" as CharacterName, to: new Vector3(0, 0, 0) },
  }),
  setRotationY: event({
    run: ({ who, to: to }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "setRotationY", { which: dollName, to })]);
    },
    params: { who: "" as CharacterName, to: 0 },
  }),
  springRotation: event({
    run: ({ who, to }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "springRotationY", { which: dollName, to })]);
    },
    params: { who: "" as CharacterName, to: 0 },
  }),
  springAddToRotationY: event({
    run: ({ who, addedRotation }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "springAddToRotationY", { which: dollName, addedRotation })]);
    },
    params: { who: "" as CharacterName, addedRotation: 0 },
  }),
  lookAtOther: event({
    run: ({ whoA: whoA, whoB }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(whoB);
      const angle = get2DAngleBetweenCharacters(whoB, whoA);
      addSubEvents(liveId, [II("doll", "springRotationY", { which: dollName, angle })]);
    },
    params: { whoA: "" as CharacterName, whoB: "" as CharacterName },
  }),
  lookAtEachother: event({
    run: ({ whoA, whoB }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      addSubEvents(liveId, [
        II("character", "lookAtOther", { whoA, whoB }),
        II("character", "lookAtOther", { whoA: whoB, whoB: whoA }),
      ]);
    },
    params: { whoA: "" as CharacterName, whoB: "" as CharacterName },
  }),
  lookAtSpot: event({
    run: async ({ place, spot, who }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { playerCharacter } = getState().global.main;
      const character = who ?? (playerCharacter as CharacterName);
      const { dollName } = getCharDollStuff(character);

      addSubEvents(liveId, [II("doll", "lookAtSpot", { which: dollName, place, spot })]);
    },
    params: {
      place: "" as PlaceName,
      spot: "" as SpotNameByPlace[PlaceName],
      who: undefined as undefined | CharacterName,
    },
  }),
  moveAt2DAngle: event({
    run: ({ who, angle }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(who);
      addSubEvents(liveId, [II("doll", "moveAt2DAngle", { which: dollName, angle })]);
    },
    params: { who: "" as CharacterName, angle: 0 },
  }),
}));

// Special types

type CharacterSetAnimationParams<T_Character extends CharacterName> = {
  who: T_Character;
  to: AnimationNameFromCharacter<CharacterName>;
};

type CharacterLookAtSpotParams<T_Place extends PlaceName> = {
  who: CharacterName;
  place: T_Place;
  to: SpotNameByPlace[T_Place];
};

export type CharacterEventParameters<T_Group, T_Event, T_GenericParamA> = T_Group extends "character"
  ? T_Event extends "setAnimation"
    ? CharacterSetAnimationParams<T_GenericParamA & CharacterName>
    : T_Event extends "lookAtSpot"
    ? CharacterLookAtSpotParams<T_GenericParamA & PlaceName>
    : never
  : never;
