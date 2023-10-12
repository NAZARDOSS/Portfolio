import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Resume from './Links/Resume';
import Projects from './Links/Projects';



function ProfHide(props) {
  const location = useLocation();

  const isNavRoute = location.pathname === '/Portfolio/nav';

  return (
   <div className={`prof${isNavRoute ? '' : '_clicked'}`}>\
   <nav>
      <ul>
        <li>
          <Link to="/Portfolio/resume">Resume</Link>
        </li>
        <li>
          <Link to="/Portfolio/projects">Projects</Link>
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
   </nav>

      <Routes>
        <Route path="/Portfolio/resume" element={<Resume />} />
        <Route path="/Portfolio/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default ProfHide