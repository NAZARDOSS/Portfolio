import React, {useState} from 'react';
import First from './FirstPage/First';
import Second from './SecondPage/Second';

function App (props) {

    const [darkMode, setDarkMode] = useState(false); 

    return (
        <div id={darkMode ? "dark" : "light"}>
            <First darkMode = {darkMode} setDarkMode = {setDarkMode}/>
            <Second />
        </div>
    );
}

export default App;