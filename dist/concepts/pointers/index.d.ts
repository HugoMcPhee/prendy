export { makePointersConnectRules } from "./connect";
export default function pointers(): {
    state: () => {
        pointerPosition: import("shutils/dist/points2d").Point2D;
    };
    refs: () => {
        pointerId: string;
        firstInputPosition: import("shutils/dist/points2d").Point2D;
        isFirstMovement: boolean;
        offset: import("shutils/dist/points2d").Point2D;
    };
};
