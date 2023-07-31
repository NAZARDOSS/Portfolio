import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import me from "../../../assets/me.png";
import { useLoader } from '@react-three/fiber';
import { TextureLoader} from 'three';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
      <meshMatcapMaterial map={texture} color={'aliceblue'} />
    </mesh>
  );
}


function Resume(props) {
  const navigate = useNavigate();
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

  function close() {
    document.querySelector('.resume').classList.add('closing');

    setTimeout(() => {
      setMousePosition(0,0)
      navigate('/nav');
    }, 500);
  }

  return (
    <div
     className={`resume ${'display' === 'none' ? 'hidden' : ''}`}
      style={{display: resume}}
      onMouseMove={handleMouseMove}
    >
      <Canvas>
        <Plane mousePosition={mousePosition} />
      </Canvas>
      <button className='button_resume' onClick={openResumeInNewTab} >Go to Resume</button>
      
     <span className='close' onClick={close}> <CloseIcon/> </span>
    </div>
  );
}

export default Resume;

