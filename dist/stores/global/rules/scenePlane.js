import { makeScenePlaneUtils } from "../../../utils/babylonjs/scenePlane";
import { makeRunMovers } from "pietem-movers";
import { copyPoint } from "chootils/dist/points2d";
import { makeGlobalStoreUtils } from "../utils";
export function makeGlobalScenePlaneRules(storeHelpers, prendyStartOptions) {
    const { getScenePlaneOverScreenEdgesAmount, focusScenePlaneOnFocusedDoll, } = makeScenePlaneUtils(storeHelpers, prendyStartOptions);
    const { setGlobalState } = makeGlobalStoreUtils(storeHelpers);
    const { makeRules } = storeHelpers;
    const { runMover, runMover2d } = makeRunMovers(storeHelpers);
    return makeRules(({ itemEffect }) => ({
        whenPlanePositionChanges: itemEffect({
            run({ newValue: planePos }) {
                const amountOverEdges = getScenePlaneOverScreenEdgesAmount(planePos);
                // FIXME ?Might be better to set the target x an y position based on a safe level for the target zoom
                // to prevents sliding at the edges when zooming out
                if (!(amountOverEdges.top < 0 ||
                    amountOverEdges.bottom < 0 ||
                    amountOverEdges.left < 0 ||
                    amountOverEdges.right < 0)) {
                    return;
                }
                const newPlanePos = copyPoint(planePos);
                if (amountOverEdges.bottom < 0)
                    newPlanePos.y += amountOverEdges.bottom;
                if (amountOverEdges.top < 0)
                    newPlanePos.y -= amountOverEdges.top;
                if (amountOverEdges.left < 0)
                    newPlanePos.x += amountOverEdges.left;
                if (amountOverEdges.right < 0)
                    newPlanePos.x -= amountOverEdges.right;
                setGlobalState({ planePos: newPlanePos });
            },
            check: { prop: "planePos", type: "global" },
            atStepEnd: false,
            step: "planePosition",
        }),
        whenPlanePositionGoalChanges: itemEffect({
            run: () => setGlobalState({ planePosIsMoving: true }),
            check: { prop: "planePosGoal", type: "global" },
            atStepEnd: true,
            step: "planePosition",
        }),
        whenPlanePosIsMoving: itemEffect({
            run({ itemName }) {
                runMover2d({ name: itemName, type: "global", mover: "planePos" });
            },
            check: { prop: "planePosIsMoving", type: "global", becomes: true },
            atStepEnd: true,
            step: "planePositionStartMovers",
        }),
        whenPlaneZoomGoalChanges: itemEffect({
            run: () => setGlobalState({ planeZoomIsMoving: true }),
            check: { prop: "planeZoomGoal", type: "global" },
            atStepEnd: true,
            step: "planePosition",
        }),
        whenPlaneZoomIsMoving: itemEffect({
            run({ itemName }) {
                runMover({ name: itemName, type: "global", mover: "planeZoom" });
            },
            check: { prop: "planeZoomIsMoving", type: "global", becomes: true },
            atStepEnd: true,
            step: "planePositionStartMovers",
        }),
        whenPlaneZoomGoalChangesToUpdatePlanePan: itemEffect({
            run: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "planeZoomGoal", type: "global" },
            atStepEnd: true,
            step: "planePosition",
        }),
        whenPlaneZoomChangesToUpdatePlanePan: itemEffect({
            run: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "planeZoom", type: "global" },
            // atStepEnd: true,
            step: "planePosition",
        }),
        whenFocusedDollChanges: itemEffect({
            run: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "focusedDoll", type: "global" },
            step: "planePosition",
        }),
        whenScreenResizes: itemEffect({
            run: () => focusScenePlaneOnFocusedDoll("instant"),
            check: { prop: "timeScreenResized", type: "global" },
            // atStepEnd: true,
            step: "planePosition",
        }),
        whenNowCamChanges: itemEffect({
            run: () => focusScenePlaneOnFocusedDoll("instant"),
            check: { prop: "nowCamName", type: "places" },
            // atStepEnd: true,
            step: "planePosition",
        }),
    }));
}
