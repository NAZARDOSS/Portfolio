import React, { useEffect, useRef } from 'react';
import { TweenLite, TweenMax, Power1 } from 'gsap';
import $ from 'jquery';
import styles from '../styles/cursor.scss'

const CursorDemo = () => {
  const outerCursorRef = useRef(null);
  const innerCursorRef = useRef(null);
  const outerCursorBoxRef = useRef({ width: 0, height: 0 });
  const outerCursorSpeedRef = useRef(0);
  const isStuckRef = useRef(false);
  const outerCursorOriginalsRef = useRef({ width: 0, height: 0 });
  const clientXRef = useRef(-100);
  const clientYRef = useRef(-100);
  const showCursorRef = useRef(false);

  useEffect(() => {
    const initSVG = () => {
      $(document).mousemove(function (event) {
        $("mask polygon").each(function (index, element) {
          var xPos = (event.clientX / $(window).width()) - 0.5,
            yPos = (event.clientY / $(window).height()) - 0.5,
            box = element;

          TweenLite.to(box, 1, {
            rotationY: xPos * 100,
            rotationX: yPos * 100,
            ease: Power1.easeOut,
          });
        });
      });
    };

    const initCursor = () => {
      const { Back } = window;
      const outerCursor = outerCursorRef.current;
      const innerCursor = innerCursorRef.current;
      const outerCursorBox = outerCursorBoxRef.current;

      const unveilCursor = () => {
        TweenMax.set(innerCursor, {
          x: clientXRef.current,
          y: clientYRef.current,
        });
        TweenMax.set(outerCursor, {
          x: clientXRef.current - outerCursorBox.width / 2,
          y: clientYRef.current - outerCursorBox.height / 2,
        });
        setTimeout(() => {
          outerCursorSpeedRef.current = 0.2;
        }, 100);
        showCursorRef.current = true;
      };

      document.addEventListener("mousemove", unveilCursor);

      document.addEventListener("mousemove", (e) => {
        clientXRef.current = e.clientX;
        clientYRef.current = e.clientY;
      });

      const render = () => {
        TweenMax.set(innerCursor, {
          x: clientXRef.current,
          y: clientYRef.current,
        });
        if (!isStuckRef.current) {
          TweenMax.to(outerCursor, outerCursorSpeedRef.current, {
            x: clientXRef.current - outerCursorBox.width / 2,
            y: clientYRef.current - outerCursorBox.height / 2,
          });
        }
        if (showCursorRef.current) {
          document.removeEventListener("mousemove", unveilCursor);
        }
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };

    const initHovers = () => {
      const handleMouseEnter = (e) => {
        isStuckRef.current = true;
        const target = e.currentTarget;
        const box = target.getBoundingClientRect();
        outerCursorOriginalsRef.current = {
          width: outerCursorBoxRef.current.width,
          height: outerCursorBoxRef.current.height,
        };
        TweenMax.to(outerCursorRef.current, 0.2, {
          x: box.left,
          y: box.top,
          width: box.width,
          height: box.height,
          opacity: 0.4,
          borderColor: "#000",
        });
      };

      const handleMouseLeave = () => {
        isStuckRef.current = false;
        TweenMax.to(outerCursorRef.current, 0.2, {
          width: outerCursorOriginalsRef.current.width,
          height: outerCursorOriginalsRef.current.height,
          opacity: 0.2,
          borderColor: "#000",
        });
      };

      const mainNavHoverTween = TweenMax.to(outerCursorRef.current, 0.3, {
        backgroundColor: "#000",
        ease: Power1.easeOut,
        paused: true,
        opacity: 0.2,
      });

      const mainNavMouseEnter = () => {
        outerCursorSpeedRef.current = 0;
        TweenMax.set(innerCursorRef.current, { opacity: 0 });
        mainNavHoverTween.play();
      };

      const mainNavMouseLeave = () => {
        outerCursorSpeedRef.current = 0.2;
        TweenMax.set(innerCursorRef.current, { opacity: 1 });
        mainNavHoverTween.reverse();
      };

      const mainNavLinks = document.querySelectorAll(".page a");
      mainNavLinks.forEach((item) => {
        item.addEventListener("mouseenter", mainNavMouseEnter);
        item.addEventListener("mouseleave", mainNavMouseLeave);
      });
    };

    initSVG();
    initCursor();
    initHovers();

    return () => {
      // Cleanup logic if needed
    };
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <div className="page">
      <div ref={innerCursorRef} className="circle-cursor circle-cursor--inner"></div>
      <div ref={outerCursorRef} className="circle-cursor circle-cursor--outer"></div>
    </div>
  );
};

export default CursorDemo;
