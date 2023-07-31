import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { VideoTexture, LinearFilter, RGBAFormat } from 'three';
import cosmo from '../assets/cosmo.jpg';

const Sphere = () => {
  const sphereRef = useRef();
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [cosmoTexture, setCosmoTexture] = useState(null);

  useEffect(() => {
    let video;
    const playVideo = () => {
      video.play();
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('click', playVideo);
    };

    const initVideo = () => {
      video = document.createElement('video');
      video.src = cosmo;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;

      const texture = new VideoTexture(video);
      texture.minFilter = LinearFilter;
      texture.format = RGBAFormat;

      setCosmoTexture(texture);

      window.addEventListener('touchstart', playVideo);
      window.addEventListener('click', playVideo);
    };

    initVideo();

    return () => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, []);

  useFrame(({ mouse }) => {
    const { x, y } = mouse;
    const smoothness = 0.1;
    setTargetPosition({ x, y });

    sphereRef.current.position.x = sphereRef.current.position.x + (targetPosition.x - sphereRef.current.position.x) * smoothness;
    sphereRef.current.position.y = sphereRef.current.position.y + (targetPosition.y - sphereRef.current.position.y) * smoothness;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        {cosmoTexture && <meshStandardMaterial emissive={'blue'} map={cosmoTexture} />}
      </mesh>
    </>
  );
};

export default Sphere;
