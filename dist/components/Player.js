import { breakableForEach } from "shutils/dist/loops";
import { makeSceneStoryHelpers } from "../utils/story/helpers/scene";
export function makePlayer(conceptoFuncs, gameyStartOptions, placeInfoByName, characterNames) {
    // type AnyToPlaceOption = {
    //   toPlace: PlaceName;
    //   toSpot: AnySpotName;
    //   toCam?: AnyCameraName;
    //   toSegment?: AnySegmentName;
    // };
    // type DoorsInfoLoose = Partial<
    //   Record<PlaceName, Partial<Record<AnyTriggerName, AnyToPlaceOption>>>
    // >;
    // type AnyToPlaceOption = {
    //   toPlace: PlaceName;
    //   toSpot: string;
    //   toCam?: string;
    //   toSegment?: string;
    // };
    const { useStoreItemPropsEffect, getState, setState, useStore, } = conceptoFuncs;
    const { goToNewPlace } = makeSceneStoryHelpers(conceptoFuncs, placeInfoByName, characterNames);
    return function Player(_props) {
        const { playerCharacter: charName } = useStore(({ global: { main } }) => main, {
            type: "global",
            name: "main",
            prop: ["playerCharacter"],
        });
        // TODO Move to story dynamic rules for the player character ?
        useStoreItemPropsEffect({ type: "characters", name: charName }, {
            atTriggers({ newValue: atTriggers }) {
                const { nowPlaceName } = getState().global.main;
                const { hasLeftFirstTrigger } = getState().characters[charName];
                // -------------------------------------------------------------------------------
                // Other story Triggers
                // if (atTriggers.)
                // -------------------------------------------------------------------------------
                // starting on a trigger
                if (!hasLeftFirstTrigger) {
                    // previousValue
                    let hasAnyCollision = false;
                    breakableForEach(placeInfoByName[nowPlaceName].triggerNames, (triggerName) => {
                        if (atTriggers[triggerName]) {
                            hasAnyCollision = true;
                            return true;
                        }
                    });
                    if (!hasAnyCollision) {
                        setState({
                            characters: { [charName]: { hasLeftFirstTrigger: true } },
                        });
                    }
                }
                else {
                    // going to new places at door triggers
                    breakableForEach(placeInfoByName[nowPlaceName].triggerNames, (triggerName) => {
                        var _a;
                        if (atTriggers[triggerName]) {
                            const toOption = (_a = gameyStartOptions.doorsInfo[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[triggerName];
                            if (toOption) {
                                goToNewPlace(toOption, charName);
                                return true; // break
                            }
                        }
                    });
                }
            },
        });
        return null;
    };
}
