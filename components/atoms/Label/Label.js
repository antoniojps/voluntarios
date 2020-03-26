import React from 'react';
import Icon from '../Icons/Icon'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Label.module.scss';

const Label = ({ text, actionEnabled = false, handleClick, color = '#ffffff', background = '#89c4b2' }) => (
    <div className='label' style={{ color, background }}>
        <span>{text}</span>
        {actionEnabled && <button onClick={handleClick}><Icon icon={faTimes} /></button>}
    </div>
)

export default Label;