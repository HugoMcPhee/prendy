import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeSpotStoryUtils<ConceptoFuncs extends GameyConceptoFuncs, PlaceName extends string, SpotNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs): {
    getSpotPosition: <T_Place extends PlaceName>(place: T_Place, spot: SpotNameByPlace[T_Place]) => any;
    getSpotRotation: <T_Place_1 extends PlaceName>(place: T_Place_1, spot: SpotNameByPlace[T_Place_1]) => any;
};
