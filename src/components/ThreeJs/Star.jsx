import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';

export default function Star() {

  const pointsRef = useRef();
  const { mouse } = useThree();

  useEffect(() => {
    const geometry = new BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = MathUtils.randFloatSpread(3000);
      const y = MathUtils.randFloatSpread(3000);
      const z = MathUtils.randFloatSpread(3000);
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    pointsRef.current.geometry = geometry;
  }, []);

  useFrame(() => {
    const { x, y } = mouse;
    const targetX = (x * window.innerWidth) / 5;
    const targetY = (y * window.innerHeight) / 5;
    const dx = targetX - pointsRef.current.position.x;
    const dy = targetY - pointsRef.current.position.y;

    const speed = 0.01;
    pointsRef.current.position.x += dx * speed;
    pointsRef.current.position.y += dy * speed;

    pointsRef.current.rotation.x += 0.0006;
    pointsRef.current.rotation.y += 0.0006;
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial attach="material" size={1.5}  sizeAttenuation={false} />
    </points>
  );
}
