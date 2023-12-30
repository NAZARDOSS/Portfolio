import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import me from "../../../assets/me.jpg";
import { useLoader } from '@react-three/fiber';
import { TextureLoader} from 'three';
import { meshBasicMaterial } from 'three';

function Plane({ mousePosition }) {
  const planeRef = useRef();

  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.rotation.x = -mousePosition.y / 8;
      planeRef.current.rotation.y = mousePosition.x / 8;
    }
  });

  const texture = useLoader(TextureLoader, me);

  return (
    <mesh ref={planeRef} position={[-1.2, 0, -1.5]}>
      <planeGeometry args={[6, 8]} />
      <meshBasicMaterial color={0xffffff} map={texture} />
    </mesh>
  );
}


function Resume(props) {
  const { resume, setResume } = props;

  function openResumeInNewTab() {
    const url = "https://docs.google.com/document/d/1ybuhsWSfWBjdR8cjgFpD_KSeZOgw4Ynnix_S25fyzgo/edit?usp=sharing";
    window.open(url, "_blank");
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth - 0.5) * 4,
      y: (event.clientY / window.innerHeight - 0.5) * 4,
    });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      handleMouseMove(event);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  
  return (
    <div
     className={`resume ${'display' === 'none' ? 'hidden' : ''}`}
      style={{display: resume}}
      onMouseMove={handleMouseMove}
    > 
    <div className="title_block">
      <h1 className='projects_title'>Resume</h1>
      <p className="resume_title_text">Bio | Experiance | Education | Languages</p>
    </div>
      
      <div className='resume_block'>
        <Canvas style={{height: '750px', maxWidth: '900px', minWidth: '750px'}}>
        <Plane mousePosition={mousePosition} position="absolute" top="0" left="0" width="100%" height="100%" />
        </Canvas>
        <button className='button_resume' onClick={openResumeInNewTab} >Go to Resume</button>
      </div>
      
    </div>
  );
}

export default Resume;

