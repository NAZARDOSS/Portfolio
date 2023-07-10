import React, { useRef } from 'react'
import { useGLTF, ScrollControls, Scroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./scene.glb')
  const groupRef = useRef()
  const cameraRef = useRef()
  const { mouse } = useThree()

  useFrame(() => {
    const { x, y } = mouse
    const targetX = (x * window.innerWidth) / 20 // Уменьшаем диапазон перемещения
    const targetY = (y * window.innerHeight) / 20 // Уменьшаем диапазон перемещения
    const dx = targetX - groupRef.current.position.x
    const dy = targetY - groupRef.current.position.y

    const speed = 0.01 // Уменьшаем скорость
    groupRef.current.position.x += dx * speed
    groupRef.current.position.y += dy * speed

    groupRef.current.rotation.y += 0.001
  })

  return (
    <>
    <directionalLight position={[3, 3, 1.5]} intensity={3} /> 
      <group ref={groupRef} position={[-10, -10, -300]} scale= {[1.5,1.5,1.5]} dispose={null}>
      {/* {[5.5,5.5,5.5]} */}
         <mesh geometry={nodes.Sphere_6_M_0.geometry} material={materials.material}>
            <meshStandardMaterial  />
          </mesh>

        {/* <mesh geometry={nodes.Sphere_6_M_0.geometry} material={materials.material} />
        <mesh geometry={nodes.Sphere_6_A_1.geometry} material={materials.material_1} /> */}

      </group>
      <perspectiveCamera ref={cameraRef} position={[0, 0, 10]} />
    </>
  )
}

useGLTF.preload('./scene.glb')