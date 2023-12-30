import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ProfHide from './ProfHide';
import Resume from './Links/Resume';
import Projects from './Links/Projects';
import { animated } from 'react-spring';

function Second(props) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [opacityValue, setOpacityValue] = useState(0);
  const [zIndex, setZIndex] = useState(0);

  const handleTextClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      const interval = setInterval(() => {
        setOpacityValue(prevValue => prevValue + 0.01);
        setZIndex(10);
        if (opacityValue >= 1) {
          clearInterval(interval);

          setInterval(() => {
            navigate('/Portfolio/in');
          }, 100)
        }
      }, 20);
      return () => {
        clearInterval(interval);
      };
    }
  }, [clicked, opacityValue, navigate]);

  return (
    <div className="secondPage">
      <div className='dark_block' style={{ backgroundColor: `rgba(0, 0, 0, ${opacityValue})`, zIndex: zIndex }}>
      </div>
      <ul>
        <li>
          <Link className='link'>
            <p className='text_link' style={{ cursor: 'pointer', display: 'block' }} onClick={handleTextClick}>
              Hi, Welcome to my Portfolio !!! I hope you have already moved your cursor. If you haven't done it - do it! By clicking on this text, you may be redirected to my other pages, please try it now!
            </p>
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="/Portfolio/in" element={<Resume />} />
        <Route path="/Portfolio/resume" element={<Resume />} />
        <Route path="/Portfolio/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default Second;
