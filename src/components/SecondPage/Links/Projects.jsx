import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import CloseIcon from '@mui/icons-material/Close';
import gigagram from '../../../assets/projects/gigagram.png';
import figma1 from '../../../assets/projects/figma1.png'
import figma2 from '../../../assets/projects/figma2.png'
import dashboard1 from '../../../assets/projects/dashboard1.png'
import dashboard2 from '../../../assets/projects/dashboard2.png'
import bgStyles from '../../../assets/projects/bgstyles.png'
import flappy from '../../../assets/projects/flappy.png'
import landRover from '../../../assets/projects/landRover.png'
import zIndex from '../../../assets/projects/zIndex.png'
import regexp from '../../../assets/projects/regexp.png'

import { useNavigate } from 'react-router-dom';

const photoData = [
  { url: gigagram, link: 'https://nazardoss.github.io/MAIN-PROJECT-GIGAGRAM/' },
  { url: flappy, link: 'https://nazardoss.github.io/KPIFlappy/' },
  { url: figma1, link: 'https://nazardoss.github.io/First-connection-with-Figma/' },
  { url: figma2, link: 'https://nazardoss.github.io/Figma2/' },
  { url: dashboard2, link: 'https://nazardoss.github.io/Dashboard/' },
  { url: dashboard1, link: 'https://nazardoss.github.io/First-Redux/' },
  { url: bgStyles, link: 'https://nazardoss.github.io/Nav-BgStyle---React/' },
  { url: landRover, link: 'https://nazardoss.github.io/LandRover/' },
  { url: zIndex, link: 'https://nazardoss.github.io/Z-index-Modal/' },
  { url: regexp, link: 'https://nazardoss.github.io/Regexp/' },
];

function Plane({ mousePosition, index }) {
  const planeRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (planeRef.current && isHovered) {
      planeRef.current.rotation.x = mousePosition.y / 8;
      planeRef.current.rotation.y = -mousePosition.x / 8;
    }
  });

  useEffect(() => {
    if (planeRef.current) {
      // Store the initial rotation of the plane
      setInitialRotation({
        x: planeRef.current.rotation.x,
        y: planeRef.current.rotation.y,
      });
    }
  }, []);

  const texture = useLoader(TextureLoader, photoData[index].url);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (planeRef.current) {
      // Reset the rotation to the initial values when the mouse leaves the control zone
      planeRef.current.rotation.x = initialRotation.x;
      planeRef.current.rotation.y = initialRotation.y;
    }
  };
  const handleClick = () => {
    // Check if the index is within the range of the photoData array
    if (index >= 0 && index < photoData.length) {
      const linkUrl = photoData[index].link;
      // Open the link in a new tab
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <mesh
      ref={planeRef}
      position={[0, 0, 0]}
      onPointerEnter={handleHover}
      onPointerLeave={handleLeave}
      onClick={handleClick} // Add the click event handler
    >
      <planeGeometry args={[12, 8]} />
      <meshMatcapMaterial map={texture} color={'aliceblue'} />
    </mesh>
  );
}

function Projects(props) {
  const navigate = useNavigate()

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectRefs = useRef([]);
  const [inView, setInView] = useState({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.current.indexOf(entry.target);
        if (index !== -1) {
          setInView((prevInView) => ({
            ...prevInView,
            [index]: entry.isIntersecting, // Set inView to true when intersecting, false otherwise
          }));
        }
      });
    }, observerOptions);

    projectRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [projectRefs]);

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // Normalize mouse X position
    const y = (event.clientY - rect.top) / rect.height; // Normalize mouse Y position
  
    // Scale the normalized mouse position to be between -1 and 1
    setMousePosition({
      x: (x * 2 - 1) * 0.5,
      y: (y * 2 - 1) * 0.5,
    });
  };
  


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function close() {
    document.querySelector('.projects').classList.add('closing');

    setTimeout(() => {
      navigate("/Portfolio/nav")
      setMousePosition({ x: 0, y: 0 });
    }, 500);
  }

  return (
    <div
      className={`projects ${'display' === 'none' ? 'hidden' : ''}`}
      style={{ display: 'block' }}
    >
      <div className="grid-container">
        {photoData.map((url, index) => (
          <div key={index} className="grid-item" ref={(ref) => (projectRefs.current[index] = ref)}>
            {/* Render the Canvas only if inView is true */}
            {inView[index] && (
              <Canvas>
                <Plane index={index} mousePosition={mousePosition} />
              </Canvas>
            )}
          </div>
        ))}
      </div>
      <span className='close' onClick={close}> <CloseIcon /> </span>
    </div>
  );
}

export default Projects;
