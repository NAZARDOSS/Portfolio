import React, { useState, useEffect } from 'react';
import Mode from '../FirstPage/Mode';
import Desktop from '../ThreeJs/Desktop';
import { Canvas } from '@react-three/fiber';
import Resume from '../SecondPage/Links/Resume';
import Projects from '../SecondPage/Links/Projects';
import About from '../SecondPage/Links/About';
import { useRef } from 'react';
import Star from '../ThreeJs/Star';
import CursorDemo from '../ThreeJs/Сursor';
function Part2(props) {
  const [scrollToTopOnLoad, setScrollToTopOnLoad] = useState(true);
  const [alphaValue, setAlphaValue] = useState(1);
  const [zIndexValue, setZIndexValue] = useState(100);
  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const worksRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (alphaValue > 0) {
        setAlphaValue((prevValue) => prevValue - 0.01);
        setZIndexValue((prevValue) => prevValue - 1); // Уменьшение z-index
      }
    }, 10);

    setScrollToTopOnLoad(true);
    return () => {
      clearInterval(interval);
    };
    
  }, []);

  useEffect(() => {
    if (scrollToTopOnLoad) {
      window.scrollTo(0, 0);
      setScrollToTopOnLoad(false);
    }
  }, [scrollToTopOnLoad]);

  useEffect(() => {
    if (alphaValue <= 0) {
      setAlphaValue(0);
    }
  }, [alphaValue]);
  
  const handleScroll = () => {
    const targetScrollPos = aboutRef.current?.offsetTop; // Replace with the actual scroll position of the targeted section
    const currentScrollPos = window.scrollY;
  
    if (currentScrollPos >= targetScrollPos) {
      aboutRef.current.style.opacity = 1;
      aboutRef.current.style.transform = 'translateY(0%)';
    }
  };
  
  window.addEventListener('scroll', handleScroll);

//setScrollToTopOnLoad(true);

const scrollToSection = (ref) => {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // setScrollToTopOnLoad(true);
};

//   const scrollToSection = (ref) => {
//   ref.current.classList.add('active');
//   // Smooth scroll to the section
//   ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

//   // Remove the animation classes
//   setTimeout(() => {
//     ref.current.classList.remove('active');
//   }, 500); // Wait for smooth scrolling to complete
// };

  return (
  <div className='part2'>
    <CursorDemo/>
      <div className='dark_block2' style={{ backgroundColor: `rgba(0, 0, 0, ${alphaValue})`, zIndex: zIndexValue  }}></div>
        <header>
          <nav>
            <ul>
              <li>
                <a href="/Portfolio">HOME</a>
              </li>

              <li>
                <a href="#about" onClick={() => scrollToSection(aboutRef)}>ABOUT</a>
              </li>

              <li>
                <a href="#resume" onClick={() => scrollToSection(resumeRef)}>RESUME</a>
              </li>

              <li>
                <a href="#works" onClick={() => scrollToSection(worksRef)}>WORKS</a>
              </li>
            </ul>
          </nav>       

          <Mode toggleDarkMode={props.toggleDarkMode} /> 
        </header>

        <div className='figure'>
          <div className='line'></div>
          <div className='circle'></div>
        </div>

        <div className='info'> 
          <div>
            <h1>Hi, I'm <span>Nazar</span> </h1>  
            <h1> Frontend | React.js <span>developer</span></h1>
          </div>
        </div>
        <div className='canvas-model'>

          <Canvas>
             <Desktop /> 
          </Canvas>
          {/* <Canvas className='canvas2'>
            <Star />
          </Canvas> */}

          <div className='blur'>

          </div>
        </div>

      <div className='second_block'>
          <nav className='navbar_left'>
              <ul>
                <li>
                  <a href="">HOME</a>
                </li>

                <li>
                <a href="#about" onClick={() => scrollToSection(aboutRef)}>ABOUT</a>
                </li>

                <li>
                <a href="#resume" onClick={() => scrollToSection(resumeRef)}>RESUME</a>
                </li>

                <li>
                <a href="#works" onClick={() => scrollToSection(worksRef)}>WORKS</a>
                </li>
              </ul>
          </nav>

          <div className='parts'>
        <div ref={aboutRef}>
          <About />
        </div>
        <div className='resume_block' ref={resumeRef}>
          <Resume />
        </div>
        <div ref={worksRef}>
          <Projects />
        </div>
      </div>

      </div>
        

        
    </div>
  );
}

export default Part2;
