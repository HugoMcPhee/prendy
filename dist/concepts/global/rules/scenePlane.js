import { makeScenePlaneUtils } from "../../../utils/babylonjs/scenePlane";
import { makeRunMovers } from "concep-movers";
import { copyPoint } from "chootils/dist/points2d";
import { makeGlobalStoreUtils } from "../utils";
export function makeGlobalScenePlaneRules(concepFuncs, backdopStartOptions) {
    const { getScenePlaneOverScreenEdgesAmount, focusScenePlaneOnFocusedDoll, } = makeScenePlaneUtils(concepFuncs, backdopStartOptions);
    const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const { makeRules } = concepFuncs;
    const { runMover, runMover2d } = makeRunMovers(concepFuncs);
    return makeRules((addItemEffect) => ({
        whenPlanePositionChanges: addItemEffect({
            onItemEffect({ newValue: planePos }) {
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
            whenToRun: "derive",
            flow: "planePosition",
        }),
        whenPlanePositionGoalChanges: addItemEffect({
            onItemEffect: () => setGlobalState({ planePosIsMoving: true }),
            check: { prop: "planePosGoal", type: "global" },
            whenToRun: "subscribe",
            flow: "planePosition",
        }),
        whenPlanePosIsMoving: addItemEffect({
            onItemEffect({ itemName }) {
                runMover2d({ name: itemName, type: "global", mover: "planePos" });
            },
            check: { prop: "planePosIsMoving", type: "global", becomes: "true" },
            whenToRun: "subscribe",
            flow: "planePositionStartMovers",
        }),
        whenPlaneZoomGoalChanges: addItemEffect({
            onItemEffect: () => setGlobalState({ planeZoomIsMoving: true }),
            check: { prop: "planeZoomGoal", type: "global" },
            whenToRun: "subscribe",
            flow: "planePosition",
        }),
        whenPlaneZoomIsMoving: addItemEffect({
            onItemEffect({ itemName }) {
                runMover({ name: itemName, type: "global", mover: "planeZoom" });
            },
            check: { prop: "planeZoomIsMoving", type: "global", becomes: "true" },
            whenToRun: "subscribe",
            flow: "planePositionStartMovers",
        }),
        whenPlaneZoomGoalChangesToUpdatePlanePan: addItemEffect({
            onItemEffect: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "planeZoomGoal", type: "global" },
            whenToRun: "subscribe",
            flow: "planePosition",
        }),
        whenPlaneZoomChangesToUpdatePlanePan: addItemEffect({
            onItemEffect: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "planeZoom", type: "global" },
            // whenToRun: "subscribe",
            flow: "planePosition",
        }),
        whenFocusedDollChanges: addItemEffect({
            onItemEffect: () => focusScenePlaneOnFocusedDoll(),
            check: { prop: "focusedDoll", type: "global" },
            flow: "planePosition",
        }),
        whenScreenResizes: addItemEffect({
            onItemEffect: () => focusScenePlaneOnFocusedDoll("instant"),
            check: { prop: "timeScreenResized", type: "global" },
            // whenToRun: "subscribe",
            flow: "planePosition",
        }),
        whenNowCamChanges: addItemEffect({
            onItemEffect: () => focusScenePlaneOnFocusedDoll("instant"),
            check: { prop: "nowCamName", type: "places" },
            // whenToRun: "subscribe",
            flow: "planePosition",
        }),
    }));
}
