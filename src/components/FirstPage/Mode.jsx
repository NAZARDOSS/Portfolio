import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Mode(props) {
  // const { toggleDarkMode } = useContext(ThemeContext);
  //-------------> animation
  const btnRef = useRef(null);
  const ropeRef = useRef(null);
  const ropeEndRef = useRef(null);
  const knobRef = useRef(null);
  // const lightRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    // const rope = ropeRef.current;
    // const ropeEnd = ropeEndRef.current;
    // const knob = knobRef.current;
    // // const light = lightRef.current;
    // const top = topRef.current;

    let isChecked = false;

    const onBtnDown = () => {
      const tl = gsap.timeline();
      if (ropeEndRef.current) {
        tl.to(ropeEndRef.current, { duration: 0.2, y: 160 }, "start");
      }
      if (ropeRef.current) {
        tl.to(
          ropeRef.current,
          { duration: 0.2, morphSVG: "#rope-extended" },
          "start"
        );
      }
    };

    const onBtnUp = () => {
      const tl = gsap.timeline();
      if (ropeRef.current) {
        tl.to(
          ropeRef.current,
          { duration: 0.4, morphSVG: "#rope-compressed", ease: "bounce.out" },
          "up"
        );
        tl.to(
          ropeRef.current,
          { duration: 0.2, morphSVG: "#rope-original", ease: "bounce.out" },
          "down"
        );
      }
      if (ropeEndRef.current) {
        tl.to(
          ropeEndRef.current,
          { duration: 0.4, y: 80, ease: "bounce.out" },
          "up"
        );
        tl.to(
          ropeEndRef.current,
          { duration: 0.2, y: 120, ease: "bounce.out" },
          "down"
        );
      }

      isChecked = !isChecked;

      let x = 0;
      let backgroundColor = "#827D96";
      let size = "100px";

      if (isChecked) {
        x = 30;
        backgroundColor = "#FFFFFF";
        size = "500px";
      }

      if (knobRef.current) {
        tl.to(knobRef.current, { x, duration: 1 }, "up");
      }
      if (topRef.current) {
        tl.to(topRef.current, { backgroundColor, duration: 1 }, "up");
      }

    };

    btn.addEventListener("mousedown", onBtnDown);
    btn.addEventListener("mouseup", onBtnUp);

    return () => {
      btn.removeEventListener("mousedown", onBtnDown);
      btn.removeEventListener("mouseup", onBtnUp);
    };
  }, []);
  //-------------> animation

  return (
    <div className="btnContainer">
      <div className="btn no-highlight" id="btn" ref={btnRef} onClick={props.toggleDarkMode}>
        <div className="knob no-highlight" ref={knobRef}>
          <div className="light no-highlight"></div>
          <div className="top no-highlight" ref={topRef}>
            <DarkModeIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mode;
