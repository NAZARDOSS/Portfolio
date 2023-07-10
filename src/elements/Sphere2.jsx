import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Sphere2 (props) {
  const { nodes } = useGLTF("../assets/hex2/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 0.189, -0.043]}
      />
    </group>
  );
}

useGLTF.preload("../assets/hex2/scene.gltf");