import { breakableForEach } from "chootils/dist/loops";
import { get_sceneStoryHelpers } from "../helpers/prendyHelpers/scene";
export function get_Player(prendyAssets, storeHelpers) {
    const { placeInfoByName, characterNames, prendyOptions } = prendyAssets;
    const { useStoreItemPropsEffect, getState, setState, useStore } = storeHelpers;
    const { goToNewPlace } = get_sceneStoryHelpers(prendyAssets, storeHelpers);
    return function Player(_props) {
        const { playerCharacter: charName } = useStore(({ global: { main } }) => main, {
            type: "global",
            name: "main",
            prop: ["playerCharacter"],
        });
        // TODO Move to story dynamic rules for the player character ?
        useStoreItemPropsEffect({ type: "characters", name: charName }, {
            atTriggers({ newValue: atTriggers }) {
                // if atTriggers changes, respond here
                const { nowPlaceName } = getState().global.main;
                const { hasLeftFirstTrigger } = getState().characters[charName];
                // When starting on a trigger, mark when they have left the first trigger
                if (!hasLeftFirstTrigger) {
                    let hasAnyCollision = false;
                    breakableForEach(placeInfoByName[nowPlaceName].triggerNames, (triggerName) => {
                        if (atTriggers[triggerName]) {
                            hasAnyCollision = true;
                            return true;
                        }
                    });
                    if (!hasAnyCollision) {
                        setState({ characters: { [charName]: { hasLeftFirstTrigger: true } } });
                    }
                }
                else {
                    // If has left the first trigger
                    // Check for going to new places at door triggers
                    // TODO move to a rule
                    breakableForEach(placeInfoByName[nowPlaceName].triggerNames, (triggerName) => {
                        var _a;
                        if (atTriggers[triggerName]) {
                            const toOption = (_a = prendyOptions.doorsInfo[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[triggerName];
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
