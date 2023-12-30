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
  { url: gigagram, link: 'https://nazardoss.github.io/MAIN-PROJECT-GIGAGRAM/', description: 'Social Media Network for Developers' },
  { url: flappy, link: 'https://nazardoss.github.io/KPIFlappy/', description: 'Game with AI implementation' },
  { url: figma1, link: 'https://nazardoss.github.io/First-connection-with-Figma/', description: 'first try with Figma' },
  { url: dashboard2, link: 'https://nazardoss.github.io/Dashboard/', description: 'Simple Dashboard for my own education process'  },
  { url: dashboard1, link: 'https://nazardoss.github.io/First-Redux/', description: 'First experiance with Redux' },
  { url: bgStyles, link: 'https://nazardoss.github.io/Nav-BgStyle---React/', description: 'Simple Navigation page' },
  { url: landRover, link: 'https://nazardoss.github.io/LandRover/', description: 'Old LandRover Website using Bootstrap + mobile' },
  { url: zIndex, link: 'https://nazardoss.github.io/Z-index-Modal/', description: 'Christmas Modal windows'},
  { url: regexp, link: 'https://nazardoss.github.io/Regexp/', description: 'Login/SignIn Form + Regexp in use' },
];

const Projects = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className='p'>
      <div className='title_block'>
        <h1 className='projects_title'>My Works</h1>
        <p className='projects_title_text'>Projects | Collaborations | Explorations</p>
      </div>

      <div className="projects">
        {photoData.map((data, index) => (
          <div
            key={index}
            className="project-block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-content">
              <img
                onClick={() => navigate(data.link, { replace: true, force: true })}
                src={data.url}
                alt={`Project ${index}`}
              />
              <div className={`project-description ${hoveredItem === index ? 'show' : ''}`}>
  {hoveredItem !== null && (
    <>
      <p>{photoData[hoveredItem].description}</p>
    </>
  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

