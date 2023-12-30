import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Desktop(props) {
  const { nodes, materials } = useGLTF("../Portfolio/desktop.glb");
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useGLTF.preload("./Portfolio/desktop.glb");

  useEffect(() => {
    setIsModelLoaded(true);
  }, []);

  return (
    <>
      {isModelLoaded && (
        <>
          {/* Добавьте расположение (position) для размещения модели в пространстве */}
          <group position={[8.4, -4, 7]}rotation={[0, 0.1, 0]}>
            {/* Явно добавьте каждый объект */}
            
            <primitive
              object={nodes["Sketchfab_model"]}
              material={materials["Sketchfab_model"]}
            />
            
          </group>

          {/* Добавьте свет для освещения модели */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
        </>
      )}
    </>
  );
}
