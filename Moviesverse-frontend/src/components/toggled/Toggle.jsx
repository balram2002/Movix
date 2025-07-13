import React from 'react'

import { FiSun } from "react-icons/fi";
import { RiMoonClearLine } from "react-icons/ri";
import { useTheme } from '../../theme-context';




import './toggle.css';

function Toggle() {

    const { theme, toggleTheme } = useTheme();

    const toggleMode = () => {
        toggleTheme();
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleMode}
                checked={theme === "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <FiSun className='sun svg' />
                <RiMoonClearLine className='moon svg' />
            </label>
        </div>
    )
}

export default Toggle;