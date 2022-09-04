import { breakableForEach } from "chootils/dist/loops";
import { makeTyped_sceneStoryHelpers } from "../helpers/prendyHelpers/scene";
export function makeTyped_Player(storeHelpers, prendyStartOptions, prendyAssets) {
    const { placeInfoByName, characterNames } = prendyAssets;
    const { useStoreItemPropsEffect, getState, setState, useStore } = storeHelpers;
    const { goToNewPlace } = makeTyped_sceneStoryHelpers(storeHelpers, placeInfoByName, characterNames);
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
                            const toOption = (_a = prendyStartOptions.doorsInfo[nowPlaceName]) === null || _a === void 0 ? void 0 : _a[triggerName];
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
