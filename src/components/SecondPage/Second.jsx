import React, { useState, useEffect } from 'react';
import ProfHide from './ProfHide';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function Second (props) {
    const [hideName, setHideName] = useState("")
    const [links, setLinks] = useState("none")

    function toHide() {
       setLinks("flex")
       setHideName("none")
    }

    const handleScrollUpClick = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
    
      useEffect(() => {
        const elements = document.querySelectorAll(".animate-on-scroll");
        function animateOnScroll() {
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const rect = element.getBoundingClientRect();
        
            if (
              rect.bottom >= 0 &&
              rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
              element.classList.add("is-visible");
            }
          }
        }
    
        animateOnScroll();
        
        window.addEventListener("scroll", animateOnScroll);
        
        return () => {
          window.removeEventListener("scroll", animateOnScroll);
        };
        }, []);

    return (
        <div className="secondPage">
            <span className="button_up" onClick={handleScrollUpClick}>
                <KeyboardDoubleArrowUpIcon />
            </span>
             <Link to="nav"><h1 className='prof' onClick={toHide} style={{display: hideName, cursor: 'pointer'}}>Frontend Developer</h1></Link>
            <ProfHide style={{display: links}} />
        </div>
    );
}

export default Second;
