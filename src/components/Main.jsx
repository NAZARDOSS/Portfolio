import React, {useState} from 'react';
import First from './FirstPage/First';
import Second from './SecondPage/Second';
import { Canvas } from '@react-three/fiber';
import Model from './ThreeJs/Model';
import Star from './ThreeJs/Star';
import Projects from './SecondPage/Links/Projects';
import Resume from './SecondPage/Links/Resume';

function Main (props) {
    console.log(props.darkMode1)
    const [darkMode, setDarkMode] = useState(false); 
    console.log('layout1 active')
    return (
        <div className='main' id={darkMode ? "dark" : "light"}>
            <Canvas className='canvas' >
              <Model darkMode = {darkMode}/>
              <Star />
            </Canvas>
            <First darkMode = {darkMode} setDarkMode = {setDarkMode}/>
            <Second />
            {/* <Projects />
            <Resume /> */}
        </div>
    );
}

export default Main;