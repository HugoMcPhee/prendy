import { breakableForEach } from "chootils/dist/loops";
import { goToNewPlace } from "../helpers/prendyHelpers/scene";
import { meta } from "../meta";
import { useStore, useStoreItemPropsEffect, getState, setState } from "repond";
export function Player(_props) {
    const { placeInfoByName, prendyOptions } = meta.assets;
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
                    if (atTriggers[triggerName]) {
                        const toOption = prendyOptions.doorsInfo[nowPlaceName]?.[triggerName];
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
}
