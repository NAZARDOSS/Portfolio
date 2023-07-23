import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "../../style.scss"
import Mode from "./Mode";
import Model from "../ThreeJs/Model";
import Star from "../ThreeJs/Star";
import Links from "./Links";

function First() {
  const [darkMode, setDarkMode] = useState(false); 

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    console.log(newMode);
  };

  // Функция для проверки настроек темы
  const checkDarkTheme = () => {
    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkTheme);
  };

  // useEffect для проверки и отслеживания изменений темы
  useEffect(() => {
    checkDarkTheme();
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setDarkMode(e.matches);

    darkThemeMediaQuery.addListener(handleThemeChange);

    return () => darkThemeMediaQuery.removeListener(handleThemeChange);
  }, []);

  return (
    <>
      <div className="first">
        <Mode toggleDarkMode={toggleDarkMode} />
        <h1 className="name">NAZAR DOSMUKHAMBETOV</h1>
        <Suspense fallback={null}>
            <Canvas resize={{ scroll: false }} id={darkMode ? "dark" : "light"} >
              <Model />
              <Star />
            </Canvas>
        </Suspense>
        <Links />
      </div>
    </>
  );
}

export default First;
