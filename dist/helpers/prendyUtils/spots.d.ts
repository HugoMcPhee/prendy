import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
type PlaceName = MyTypes["Types"]["PlaceName"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];
export declare function getSpotPosition<T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]): Vector3;
export declare function getSpotRotation<T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]): Vector3;
export {};
