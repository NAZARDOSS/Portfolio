import React, { useRef, useContext } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model(props) {

  const { nodes, materials } = useGLTF('../Portfolio/scene.glb')
  const groupRef = useRef()
  const cameraRef = useRef()
  const { mouse } = useThree()

  useFrame(() => {
    const { x, y } = mouse
    const targetX = (x * window.innerWidth) / 40 
    const targetY = (y * window.innerHeight) / 40 
    const dx = targetX - groupRef.current.position.x
    const dy = targetY - groupRef.current.position.y + 100

    const speed = 0.01 
    groupRef.current.position.x += dx * speed
    groupRef.current.position.y += dy * speed

    groupRef.current.rotation.y += 0.001
  })
  

  return (
    <>
    <directionalLight position={[3, 2, 1]} intensity={3} /> 
      <group ref={groupRef} position={[-400, -100, -300]} scale= {[1,0.9,1]} dispose={null}>
         <mesh geometry={nodes.Sphere_6_M_0.geometry} material={materials.material}>
            <meshStandardMaterial  color={'darkblue'}/>
          </mesh>
          <mesh geometry={nodes.Sphere_6_M_0.geometry}>
            <meshBasicMaterial color={'blue'} side={THREE.BackSide} />
          </mesh>
      </group>
      <perspectiveCamera ref={cameraRef} position={[0, 0, 0]} />
    </>
  )
}

useGLTF.preload('./Portfolio/scene.glb')
