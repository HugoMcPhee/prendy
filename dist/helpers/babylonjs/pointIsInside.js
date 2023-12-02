import { Axis, 
// Mesh,
Ray, Vector3, } from "@babylonjs/core";
// Check When a Point is Inside a Mesh
// from https://doc.babylonjs.com/toolsAndResources/utilities/IsInside
const RAY_LIMIT = 100;
const SCALE_DOWN_AMOUNT = 0.00001; // originally 0.00000001 but caused too many iterations
const ray = new Ray(Vector3.Zero(), Axis.X, 2);
export default function pointIsInside(point, mesh) {
    // return false;
    let boundInfo = mesh.getBoundingInfo();
    // let max = boundInfo.maximum;
    // let min = boundInfo.minimum;
    let diameter = 2 * boundInfo.boundingSphere.radius;
    // if (point.x < min.x || point.x > max.x) {
    //   return false;
    // }
    // if (point.y < min.y || point.y > max.y) {
    //   return false;
    // }
    // if (point.z < min.z || point.z > max.z) {
    //   return false;
    // }
    if (!mesh.intersectsPoint(point))
        return false;
    let pointFound = false;
    // let d = 0;
    let hitCount = 0;
    // let gap = 0;
    // let distance = 0;
    let ray = new Ray(Vector3.Zero(), Axis.X, diameter);
    let pickInfo;
    let direction = point.clone();
    let refPoint = point.clone();
    // let rayDistance = null as null | number;
    hitCount = 0;
    ray.origin = refPoint;
    ray.direction = direction;
    ray.length = diameter;
    pickInfo = ray.intersectsMesh(mesh);
    while (pickInfo.hit && hitCount < RAY_LIMIT) {
        hitCount++;
        pickInfo.pickedPoint?.addToRef(direction.scale(SCALE_DOWN_AMOUNT), refPoint);
        ray.origin = refPoint;
        pickInfo = ray.intersectsMesh(mesh);
    }
    if (hitCount % 2 === 1)
        pointFound = true;
    return pointFound;
}
