import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ProfHide from './ProfHide';
import Resume from './Links/Resume';
import Projects from './Links/Projects';

function Second(props) {
  const [clicked, setClicked] = useState('block');
  const location = useLocation();

  const handleTextClick = () => {
    setClicked('none');
  };

  useEffect(() => {
    if (location.pathname === '/Portfolio/') {
      setClicked('block');
    } else {
      setClicked('none');
    }
  }, [location.pathname]);

  return (
    <div className="secondPage">
      <ul>
        <li>
          <Link to="/Portfolio/nav" className='link'> 
            <p className='text_link' style={{ cursor: 'pointer', display: clicked }} onClick={handleTextClick}>
              Hi, Welcome to my Portfolio !!! I hope you have already moved your cursor. If you haven't done it - do it! By clicking on this text, you may be redirected to my other pages, please try it now!
            </p>
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="/Portfolio/nav" element={<ProfHide />} />
        <Route path="/Portfolio/resume" element={<Resume />} />
        <Route path="/Portfolio/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default Second;
