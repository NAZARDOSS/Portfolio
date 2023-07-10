import React from 'react';
import styles from '../style.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
function Footer(props) {
    return (
        <div className='footer'>
            <ul>
                <li><a href=""><LinkedInIcon /></a></li>
            </ul>
            <ul>
                <li><a href=""><GitHubIcon /></a></li>
            </ul>

        </div>
    );
}

export default Footer;