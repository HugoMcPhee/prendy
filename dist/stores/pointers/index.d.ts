export { makePointersConnectRules } from "./connect";
export default function pointers(): {
    state: () => {
        pointerPosition: import("chootils/dist/points2d").Point2D;
    };
    refs: () => {
        pointerId: string;
        firstInputPosition: import("chootils/dist/points2d").Point2D;
        isFirstMovement: boolean;
        offset: import("chootils/dist/points2d").Point2D;
    };
};
