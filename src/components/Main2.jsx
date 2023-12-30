import React, {useState, useEF, useEffect} from 'react';
import styles from './styles/main2.scss'
import First from './FirstPage/First';
import Second from './SecondPage/Second';
import { Canvas } from '@react-three/fiber';
import Model from './ThreeJs/Model';
import Star from './ThreeJs/Star';
import Projects from './SecondPage/Links/Projects';
import Resume from './SecondPage/Links/Resume';
import Part2 from './Part2/Part2';


function Main2(props) {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darktheme') === 'true');

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darktheme', newValue);
  };

  return (
    <div className={darkMode ? 'main2-dark' : 'main2-light'}>
      <Part2 darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default Main2;