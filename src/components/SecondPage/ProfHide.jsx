import React from 'react';

function ProfHide(props) {
  return (
    <div className="prof" style={props.style}>
      <ul>
        <li>Resume</li>
        <li>Projects</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default ProfHide;
