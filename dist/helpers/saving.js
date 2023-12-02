import { getState, setState } from "repond";
import { point3dToVector3 } from "./babylonjs/vectors";
import { setDollPosition, springDollRotationY } from "./prendyHelpers/dolls";
import { goToNewPlace, showStoryView } from "./prendyHelpers/scene";
import { getGlobalState, setGlobalState } from "./prendyUtils/global";
import { waitForNextTick, waitForNowCamToChange, waitForPlaceFullyLoaded } from "./prendyUtils/scene";
export function savePrendyState() {
    const storeState = getState();
    const newSaveState = {
        global: {
            nowCamName: storeState.global.main.nowCamName,
            nowPlaceName: storeState.global.main.nowPlaceName,
            nowSegmentName: storeState.global.main.nowSegmentName,
            heldPickups: storeState.global.main.heldPickups,
            storyOverlayToggled: storeState.global.main.storyOverlayToggled,
            alarmTextIsVisible: storeState.global.main.alarmTextIsVisible,
            alarmText: storeState.global.main.alarmText,
            aSpeechBubbleIsShowing: storeState.global.main.aSpeechBubbleIsShowing,
            aConvoIsHappening: storeState.global.main.aConvoIsHappening,
        },
        dolls: Object.fromEntries(Object.entries(storeState.dolls).map(([dollName, doll]) => [
            dollName,
            {
                position: doll.position,
                rotationY: doll.rotationY,
                isVisible: doll.isVisible,
                // collisionsEnabled: doll.collisionsEnabled,
                toggledMeshes: doll.toggledMeshes,
                inRange: doll.inRange,
                nowAnimation: doll.nowAnimation,
                // animWeightsGoal: doll.animWeightsGoal,
            },
        ])),
        places: Object.fromEntries(Object.entries(storeState.places).map(([placeName, place]) => [
            placeName,
            {
                toggledWalls: place.toggledWalls,
            },
        ])),
        characters: Object.fromEntries(Object.entries(storeState.characters).map(([characterName, character]) => [
            characterName,
            {
                hasLeftFirstTrigger: character.hasLeftFirstTrigger,
            },
        ])),
        player: {
            animationNames: {
                walking: storeState.players.main.animationNames.walking,
                idle: storeState.players.main.animationNames.idle,
            },
        },
        miniBubbles: Object.fromEntries(Object.entries(storeState.miniBubbles).map(([miniBubbleName, miniBubble]) => [
            miniBubbleName,
            {
                isVisible: miniBubble.isVisible,
                text: miniBubble.text,
            },
        ])),
        speechBubbles: Object.fromEntries(Object.entries(storeState.speechBubbles).map(([speechBubbleName, speechBubble]) => [
            speechBubbleName,
            {
                isVisible: speechBubble.isVisible,
                goalText: speechBubble.goalText,
                nowVideoName: speechBubble.nowVideoName,
                font: speechBubble.font,
                stylesBySpecialText: speechBubble.stylesBySpecialText,
                forCharacter: speechBubble.forCharacter,
                typingFinished: speechBubble.typingFinished,
            },
        ])),
        storyState: { ...storeState.story.main }, // need to copy a new object, otherwise the reference is the same and the storyState is not saved
    };
    console.log("newSaveState", newSaveState);
    setGlobalState({ latestSave: newSaveState });
    // save newSaveState to localStorage
    localStorage.setItem("prendySaveState", JSON.stringify(newSaveState));
}
export async function loadPrendyState() {
    // const savedState: PrendySaveState = getGlobalState().latestSave;
    // get latest save state from localStorage
    const savedStateString = localStorage.getItem("prendySaveState");
    if (!savedStateString) {
        console.log("no saved state found in localStorage");
        return;
    }
    const savedState = JSON.parse(savedStateString);
    console.log("savedState", savedState);
    await waitForNextTick();
    await showStoryView(false);
    const camWillChange = savedState.global.nowCamName !== getGlobalState().nowCamName;
    // if the savedState.global.nowPlaceName is different from the current place, use the helepr to set the place
    const placeWillChange = savedState.global.nowPlaceName !== getGlobalState().nowPlaceName;
    if (placeWillChange) {
        goToNewPlace({
            toPlace: savedState.global.nowPlaceName,
            toSegment: savedState.global.nowSegmentName,
            toCam: savedState.global.nowCamName,
        });
        await waitForPlaceFullyLoaded(savedState.global.nowPlaceName);
    }
    else {
        if (camWillChange && !placeWillChange) {
            setState({
                global: { main: { goalCamName: savedState.global.nowCamName } },
            });
            await waitForNowCamToChange(savedState.global.nowCamName);
        }
    }
    // Set the doll positions manually, since setting the state will check for collisions
    Object.entries(savedState.dolls).forEach(([dollName, doll]) => {
        setDollPosition(dollName, point3dToVector3(doll.position));
        springDollRotationY(dollName, doll.rotationY);
    });
    // Set the store state to the saved state
    setState((state) => {
        return {
            global: {
                main: {
                    goalCamName: savedState.global.nowCamName,
                    goalPlaceName: savedState.global.nowPlaceName,
                    goalSegmentName: savedState.global.nowSegmentName,
                    heldPickups: savedState.global.heldPickups,
                    storyOverlayToggled: savedState.global.storyOverlayToggled,
                    alarmTextIsVisible: savedState.global.alarmTextIsVisible,
                    alarmText: savedState.global.alarmText,
                    aSpeechBubbleIsShowing: savedState.global.aSpeechBubbleIsShowing,
                    aConvoIsHappening: savedState.global.aConvoIsHappening,
                },
            },
            dolls: Object.fromEntries(Object.entries(savedState.dolls).map(([dollName, doll]) => [
                dollName,
                {
                    toggledMeshes: doll.toggledMeshes,
                    isVisible: doll.isVisible,
                    // collisionsEnabled: doll.collisionsEnabled,
                    inRange: doll.inRange,
                    nowAnimation: doll.nowAnimation,
                    // animWeightsGoal: doll.animWeightsGoal,
                },
            ])),
            places: Object.fromEntries(Object.entries(savedState.places).map(([placeName, place]) => [
                placeName,
                {
                    toggledWalls: place.toggledWalls,
                },
            ])),
            characters: Object.fromEntries(Object.entries(savedState.characters).map(([characterName, character]) => [
                characterName,
                {
                    hasLeftFirstTrigger: character.hasLeftFirstTrigger,
                },
            ])),
            players: {
                main: {
                    animationNames: {
                        ...state.players.main.animationNames,
                        walking: savedState.player.animationNames.walking,
                        idle: savedState.player.animationNames.idle,
                    },
                },
            },
            miniBubbles: Object.fromEntries(Object.entries(savedState.miniBubbles).map(([miniBubbleName, miniBubble]) => [
                miniBubbleName,
                {
                    // ...state.miniBubbles[miniBubbleName],
                    isVisible: miniBubble.isVisible,
                    text: miniBubble.text,
                },
            ])),
            speechBubbles: Object.fromEntries(Object.entries(savedState.speechBubbles).map(([speechBubbleName, speechBubble]) => [
                speechBubbleName,
                {
                    // ...state.speechBubbles[speechBubbleName],
                    isVisible: speechBubble.isVisible,
                    goalText: speechBubble.goalText,
                    nowVideoName: speechBubble.nowVideoName,
                    font: speechBubble.font,
                    stylesBySpecialText: speechBubble.stylesBySpecialText,
                    forCharacter: speechBubble.forCharacter,
                    typingFinished: speechBubble.typingFinished,
                },
            ])),
            story: { main: savedState.storyState },
        };
    }, () => {
        // setState({ global: { main: { latestLoadTime: Date.now() } } }, () => {
        showStoryView(true);
        // });
    });
}
