import { AnimationGroup, AssetContainer, Camera, Mesh, PBRMaterial, Skeleton, Texture, TransformNode } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { GameyConceptoFuncs } from "../../concepts/typedConceptoFuncs";
export declare function makeUseModelFile<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): <T_Names extends {
    meshes: any;
    materials: any;
    animationGroups: any;
    textures: any;
    transformNodes: any;
    skeletons: any;
    cameras: any;
}>(modelFile: string) => {
    meshes: Record<T_Names["meshes"], Mesh>;
    materials: Record<T_Names["materials"], PBRMaterial>;
    textures: Record<T_Names["textures"], Texture>;
    transformNodes: Record<T_Names["transformNodes"], TransformNode>;
    animationGroups: Record<T_Names["animationGroups"], AnimationGroup>;
    skeletons: Record<T_Names["skeletons"], Skeleton>;
    cameras: Record<T_Names["cameras"], Camera>;
    container: AssetContainer;
};