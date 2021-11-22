import { Vector3 } from "@babylonjs/core";
import { shortenDecimals } from "chootils/dist/numbers";
export function point3dToVector3(thePoint) {
    return new Vector3(thePoint.x, thePoint.y, thePoint.z);
}
export function vector3ToPoint3d(theVector3) {
    return { x: theVector3.x, y: theVector3.y, z: theVector3.z };
}
export function vector3ToSafePoint3d(theVector3) {
    return {
        x: shortenDecimals(theVector3.x),
        y: shortenDecimals(theVector3.y),
        z: shortenDecimals(theVector3.z),
    };
}
