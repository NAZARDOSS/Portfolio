import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Resume from './Links/Resume';
import Projects from './Links/Projects';

function ProfHide(props) {
  return (
    <div className="prof" style={props.style}>
      <ul>
        <li>
          <Link to="resume">Resume</Link>
        </li>
        <li>
          <Link to="projects">Projects</Link>
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <Routes>
        <Route path="resume" element={<Resume />} />
        <Route path="projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default ProfHide