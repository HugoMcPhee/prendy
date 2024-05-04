import { addSubEvents, eventDo, makeEventTypes, runEvent, setLiveEventState, toDo } from "repond-events";
import { get2DAngleBetweenCharacters, getCharDollStuff } from "../helpers/prendyUtils/characters";
import { AnimationNameFromCharacter, CharacterName, DollName } from "../types";
import { Vector3 } from "@babylonjs/core";

// type CharacterAndAnimationPair =

export const characterEvents = makeEventTypes(({ event }) => ({
  setCharAnimation: event({
    run: ({ character, animation }, { liveId, isFirstAdd }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(character);
      addSubEvents(liveId, [toDo("doll", "setAnimation", { dollName, animation })]);
    },
    params: {
      character: "" as CharacterName,
      animation: "" as AnimationNameFromCharacter<CharacterName>, // AnimationNameFromModel might keep the type better
    },
  }),
  setCharPosition: event({
    run: ({ character, newPosition }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(character);
      addSubEvents(liveId, [toDo("doll", "setDollPosition", { dollName, newPosition })]);
    },
    params: { character: "" as CharacterName, newPosition: new Vector3(0, 0, 0) },
  }),
  setCharRotationY: event({
    run: ({ character, newRotationY }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(character);
      addSubEvents(liveId, [toDo("doll", "setDollRotationY", { dollName, newRotationY })]);
    },
    params: { character: "" as CharacterName, newRotationY: 0 },
  }),
  springCharRotation: event({
    run: ({ character, newRotationY }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(character);
      addSubEvents(liveId, [toDo("doll", "springDollRotationY", { dollName, newRotationY })]);
    },
    params: { character: "" as CharacterName, newRotationY: 0 },
  }),
  springAddToCharRotationY: event({
    run: ({ character, addedRotation }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(character);
      addSubEvents(liveId, [toDo("doll", "springAddToDollRotationY", { dollName, addedRotation })]);
    },
    params: { character: "" as CharacterName, addedRotation: 0 },
  }),
  lookAtOtherCharacter: event({
    run: ({ charA, charB }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(charB);
      const angle = get2DAngleBetweenCharacters(charB, charA);
      addSubEvents(liveId, [toDo("doll", "springDollRotationY", { dollName, angle })]);
    },
    params: { charA: "" as CharacterName, charB: "" as CharacterName },
  }),
  lookAtEachother: event({
    run: ({ characterA, characterB }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      addSubEvents(liveId, [
        toDo("doll", "lookAtOtherCharacter", { characterA, characterB }),
        toDo("doll", "lookAtOtherCharacter", { characterA: characterB, characterB: characterA }),
      ]);
    },
    params: { characterA: "" as CharacterName, characterB: "" as CharacterName },
  }),
  moveCharacterAt2DAngle: event({
    run: ({ charName, angle }, { isFirstAdd, liveId }) => {
      if (!isFirstAdd) return;
      const { dollName } = getCharDollStuff(charName);
      addSubEvents(liveId, [toDo("doll", "moveDollAt2DAngle", { dollName, angle })]);
    },
    params: { charName: "" as CharacterName, angle: 0 },
  }),
}));

// TOXO Add CustomEventParams type for
// - setCharAnimation
