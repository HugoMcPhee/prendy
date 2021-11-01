TODO

v0.5.0

- supports speech bubble vids
- mobile jump and interact buttons!
- added hasInteracting and hasJumping options
- added callback to setGLobalState
- simpler and safer setCamera and setSegment story helpers
- always allow gravity, and allow walking up steeper slopes

v0.4.9

- added makeCamLeaveRules story helper
- better types for makeGetCharDollStuff

v0.4.8

- fixed getGlobalState type

v0.4.7

- stop gravity while checkCollisions is false
- fix show story view

v0.4.6

- more types in makeGetUsefulStoryStuff
- fix types for place refs
- added makeOtherUsefulBackdopUtils
- supports nullable types
- better types for setCharAnimation and setDollAnimation and dolls nowAnimation

v0.4.1

- fixed types for story helpers (and parts using typeof getState)

v0.4.0

- reamed gamey and concepto stuff to backdop and cocnep
- more things exported from index :)

v0.3.13

- supports playerAnimations option
- fixes changing place
- alarm text working

v0.3.9

- includes built package so no installing needed

v0.3.8

- supports children

v0.3.7

- supports auto making dolls and characters

v0.3.6

- types fixes etc

v0.3.0

- moving everything to work as an importable package

v0.2.8

- added solidParticleSystems to global refs (so the lights can update)

v0.2.7

- prevented checking camera segment rules for all camera changes (to fix changing segment)
- reorganized utils and helpers :)
- replaced some timeouts with onNextTick, which seems to work (now that the flows are ordered?)

v0.2.6

- small type error fixes (global/rules/video and storyRuleMakers)
- supports styled or colored text in speech bubbles
- moved fontNames to art/options
- added setDollRotation
- setDollToSpot also sets the rotation :)
- startGameyRules returns stopGameyRules :)
- added ScreenSticker to show positionable animated sticker
- added some padding to determine if the character is off the screen
- can skip speech by pressing pickup button

v0.2.5

- remove places using specific doll names
- allows story rules (like makeOnInteractToTalk) to work with typescript with only one doll
- fixes typo in setDollPosition postionGoal
- adds options for headHeightOffset , and animationSpeed

v0.2.4

- removed import for removed 'modelNamesByPlace'

v0.2.3

- SpeechBubble components get added based on characterNames

v0.2.2

- added doorsInfo and modelNamesByPlace to GAMEY_START_OPTIONS

v0.2.1

- added walkSpeed to GAMEY_START_OPTIONS

v0.2.0

- added all gamey stuff to here
