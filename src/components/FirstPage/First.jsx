import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import styles from '../styles/main.scss'
import { useRef } from "react";
import Mode from "./Mode";
import { useContext } from 'react';
import Model from "../ThreeJs/Model";
import Star from "../ThreeJs/Star";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function First(props) {
  // const {darkMode, setDarkMode} = props; 

  const toggleDarkMode = () => {
    const newMode = !props.darkMode;
    props.setDarkMode(newMode);
    console.log(newMode);
  };

  // Функция для проверки настроек темы
  const checkDarkTheme = () => {
    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    props.setDarkMode(prefersDarkTheme);
  };

  useEffect(() => {
    localStorage.setItem("darktheme", props.darkMode)
  }, [props.darkMode])

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    function animateOnScroll() {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();
    
        if (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
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

  // useEffect для проверки и отслеживания изменений темы
  useEffect(() => {
    checkDarkTheme();
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => props.setDarkMode(e.matches);

    darkThemeMediaQuery.addListener(handleThemeChange);

    return () => darkThemeMediaQuery.removeListener(handleThemeChange);
  }, []);

  return (
    <>
      <div className="first">
        <Mode toggleDarkMode={toggleDarkMode} />
        <h1 className="name">NAZAR DOSMUKHAMBETOV</h1>
        {/* <Links /> */}
      </div>
    </>
  );
}

export default First;



