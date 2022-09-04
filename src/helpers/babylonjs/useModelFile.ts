import {
  AnimationGroup,
  AssetContainer,
  Camera,
  Mesh,
  PBRMaterial,
  Scene,
  SceneLoader,
  Skeleton,
  Texture,
  TransformNode,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { keyBy } from "chootils/dist/arrays";
import { useEffect } from "react";
import usePromise from "react-promise-suspense";
import { makeTyped_getSceneOrEngineUtils } from "./getSceneOrEngineUtils";

export function makeTyped_useModelFile<StoreHelpers extends PrendyStoreHelpers>(
  // storeHelpers: StoreHelpers
  getScene: () => Scene | null
) {
  // const { getScene } = makeGetSceneOrEngineUtils(storeHelpers);

  return function useModelFile<
    T_Names extends {
      meshes: any;
      materials: any;
      animationGroups: any;
      textures: any;
      transformNodes: any;
      skeletons: any;
      cameras: any;
    }
  >(modelFile: string) {
    const scene = getScene();

    const container: AssetContainer = usePromise(SceneLoader.LoadAssetContainerAsync, [modelFile, undefined, scene]);

    useEffect(() => {
      // trying to get this more declarative

      container.addAllToScene();
      return () => container.removeAllFromScene();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const meshes: Record<T_Names["meshes"], Mesh> = keyBy(container.meshes) as Record<T_Names["meshes"], Mesh>;
    const materials: Record<T_Names["materials"], PBRMaterial> = keyBy(container.materials as PBRMaterial[]);
    const textures: Record<T_Names["textures"], Texture> = keyBy(container.textures) as Record<
      T_Names["textures"],
      Texture
    >;
    const transformNodes: Record<T_Names["transformNodes"], TransformNode> = keyBy(container.transformNodes);

    const animationGroups: Record<T_Names["animationGroups"], AnimationGroup> = keyBy(container.animationGroups);
    const skeletons: Record<T_Names["skeletons"], Skeleton> = keyBy(container.skeletons);
    const cameras: Record<T_Names["cameras"], Camera> = keyBy(container.cameras);

    return {
      meshes,
      materials,
      textures,
      transformNodes,
      animationGroups,
      skeletons,
      cameras,
      container,
    };
  };
}
