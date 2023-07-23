import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
function Links (props) {
    return (
        <div className='links'>
            <ul>
                <li><a href=""><LinkedInIcon /></a></li>
            </ul>
            <ul>
                <li><a href=""><GitHubIcon /></a></li>
            </ul>

        </div>
    );
}

export default Links;