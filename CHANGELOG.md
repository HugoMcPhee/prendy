TODO

new things

- add save load and clear save buttons to the top of the screen , and only reveal when tapping near the top
- maybe put those in a pause menu, that only appears when tapping near the top
- maybe support invisible controls, like inside

fixes

- fix particles not showing (some small particles show in atleast the first alley in smelldog)
- (ios) large fonts can have overflow cut off
- video can play through a bit extra on ios (only when first loading?)
- (ios) support returning from sleep, video pauses and doesn't play again
- video is blank white in iphone, but works on ipad

v 0.9.14

- add a npx prendy-init script to update tsconfig to use the src ts types, so declaration merging can work without needing factory functions with generic type parameters
- TODO will start removing the factory functions and start making helpers directly importable

v 0.9.13

- Cleaned up types to use a single MyTypes type
- added prendyOptions to prendyAssets so there's less options to pass around
- added helper and types for defining dolls and characters
- Removed imports of other types from declarations.ts

v 0.9.12

- small fix for player velocity going up after springDollToSpot, y up velocity gets cleared in the parts check isOnGround, there might be a better way to clear the y velocity from springDollToSpot, or update isOnGround when moving up to be false

v 0.9.11

- fixed compiled types for makeCamChangeRules makeCamLeaveRules

v 0.9.10

- fixed types not working with compiled .d.ts files
- updated better type for character.dollName
- updated to typescript 5.1.6

v 0.9.9

- added saving and loading
- uses new repond rule maker helpers like makeRuleMaker
- added helpers to wait for place to load
- types for toggledMeshes and animationWeights are typed per dolls now
- fixing walking over two floors ontop of eachother (raycast could hit the floor below)
- added toggledWalls to toggle walls on and off in state, so it works with saving
- fixed doll inRange not updating when a doll becomes invisible
- allows setting speech bubble height (head y offsets) per character (model)
- slanted speech bubbles, and added line height
- nicer style for GUI buttons, and more faded gui
- fixed sometimes video looping to other slice every frame
- fixed interact button being pressed when tapping pickup
- fixed video issue when returning to tab (and maybe another seek issue)
- centered speech bubble text
- added listener for when the app is focused

v0.9.8

- updated to use repond and updated packages
- more predictable logic for loading and playing videos
- better walking on slopes and jumping
- renamed safeVids to stateVids and sectionVids to sliceVids, and reanmed wanted/next state properties to goal
- fix jump button not handling holding on andorid and ios
- changed nowCamName to be global instead of per place
- change 'scene plane' to 'slate
- fixes pressing pickups and jump on touchscreens without also pressign the joystick
- removed unneeded generic types, and replaced with reliable declaration merging
- simplified getting prendy helpers into one function
- simplified initialisaing everything with makePrendyApp

v0.9.7

v0.9.6

v0.9.5

v0.9.3

- lots of performance improvements
- changed from using a plane object showing the scene, to panning and zooming in a post process shader

v0.9.2

- organized code to be more understandable and fit a newer pietem pattern

v0.9.1

- renamed wrapped functions with makeTyped\_ to be more understandable
- fixed issue with activeCamera not being defined at the start
- updated babylonjs and react-babylonjs

v0.9.0

- rename prendyArt to prendyAssets and concepts to stores

v0.8.4

- update libraries (babylonjs react +)
- fix dolls moving with collisions

v0.8.1

- trigger rules support different characters
- changing playerCharacter works :)
- alarm text has a shadow
- mini bubbles work for all characters
- player rotates in direction they're moving when sliding along a wall
- better walking on slopes :)

v0.8.0

- lots of changes need to update this

v0.7.20

- updated pietem to 0.8.3
- renamed makePrendyConcepts to makePrendyStores
- renamed concepts folder to "stores"

v0.7.16

- uses updated pietem names

v0.7.15

- uses renamed pietem packages

v0.7.14

- fixes animation stopping when player movement's disabled
- fixes releasing virtual stick not working

v0.7.13

- shrunk AlarmText to fit smaller screens

v0.7.12

- speech bubbles for focused characters stay in view
- and fixes camera panning to center when player goes out of view
- fixes error about no keys for SpeechBubbles
- removed some console.logs

v0.7.9

- fixes setCamera not working if setting to the same camera
- changes setSegment to always default to setting at loop
- maybe fixed segment not changing rom segment rule when the camera changes

v0.7.8

- renamed variables from backdop to prendy
- fixes issue with dolls nested child meshes not showing

v0.7.6

- renamed prendy
- published to npm!
- uses other packages from npm
- renamed shutils to chootils

v0.7.5

- fixes setting player start position for new place (doesn't collide with walls)
- and removes setPlayerToStartSpot and setFirstPlayerPosition heleprs/utils and
- fixes speech bubble text fading out then hidden, and not always zoomign and more
- allows walking up slightly steeper slopes /

v0.7.4

- fixes changing camera depth
- fixes player moving while movement's paused
- fixes alarm text not working

v0.7.2

- fixes concept types being lost :)
- fixes types lost for helpers and rule makers (and makeBackdopStoryUtils)

v0.7.0

- simpler setup with more automatic types, and passing BACKDOP_ART

v0.6.2

- fixes styles with typo in cnavas id, and sets styles in a simpler way
- fixes unanimated dolls animating :skull: :dolls: :dancers:

v0.6.0

- performance on mobile!
- uses one video for color and depth (no more stack vids)
- uses inline shaders and styles so files don't need to be included in projects

v0.5.3

- fix issue with undefined doll meshes in cameraChange (global/utils)

v0.5.2

- uses only one scene!
- doesn't dispose and recreate render target related stuff on camera changes
- tries to freeze meshes and the slate material if possible
- runs react-spring in the same concep requestAnimationFrame
- prevents setting doll mesh position if position didn't change
- concep update that runs onNextTick at the end of the same frame
- updated babylonjs to alpha 60 (except gui)

v0.5.1

- fixes showSpeech character type

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
