import React, { useState } from 'react';
import ProfHide from './ProfHide';

function Second (props) {
    const [hideName, setHideName] = useState("")
    const [links, setLinks] = useState("none")

    function toHide() {
       setLinks("flex")
       setHideName("none")
    }

    return (
        <div className="secondPage">
            <h1 className='prof' onClick={toHide} style={{display: hideName}}>Frontend Developer</h1>
            <ProfHide style={{display: links}} />
        </div>
    );
}

export default Second;
