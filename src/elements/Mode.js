import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Mode(props) {
  const btnRef = useRef(null);
  const ropeRef = useRef(null);
  const ropeEndRef = useRef(null);
  const knobRef = useRef(null);
  // const lightRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const rope = ropeRef.current;
    const ropeEnd = ropeEndRef.current;
    const knob = knobRef.current;
    // const light = lightRef.current;
    const top = topRef.current;

    let isChecked = false;

    const onBtnDown = () => {
      const tl = gsap.timeline();
      tl.to(ropeEnd, { duration: 0.2, y: 160 }, 'start');
      tl.to(rope, { duration: 0.2, morphSVG: '#rope-extended' }, 'start');
    };

    const onBtnUp = () => {
      const tl = gsap.timeline();
      tl.to(rope, { duration: 0.4, morphSVG: '#rope-compressed', ease: 'bounce.out' }, 'up');
      tl.to(rope, { duration: 0.2, morphSVG: '#rope-original', ease: 'bounce.out' }, 'down');
      tl.to(ropeEnd, { duration: 0.4, y: 80, ease: 'bounce.out' }, 'up');
      tl.to(ropeEnd, { duration: 0.2, y: 120, ease: 'bounce.out' }, 'down');

      isChecked = !isChecked;

      let x = 0;
      let backgroundColor = '#827D96';
      let size = '100px';

      if (isChecked) {
        x = 30;
        backgroundColor = '#FFFFFF';
        size = '500px';
      }

      tl.to(knob, { x, duration: 1 }, 'up');
      tl.to(top, { backgroundColor, duration: 1 }, 'up');
      // tl.to(light, { width: size, height: size, duration: 1 }, 'up');
    };

    btn.addEventListener('mousedown', onBtnDown);
    btn.addEventListener('mouseup', onBtnUp);

    return () => {
      btn.removeEventListener('mousedown', onBtnDown);
      btn.removeEventListener('mouseup', onBtnUp);
    };
  }, []);

  return (
    
    <div className="btnContainer">
      <div className="btn no-highlight" id="btn" ref={btnRef}>
        <div className="knob no-highlight" ref={knobRef}>
          <div className="light no-highlight"></div>
          <div className="top no-highlight" ref={topRef}> <DarkModeIcon/></div>
        </div>
      </div>
    </div>
  );
}

export default Mode;
