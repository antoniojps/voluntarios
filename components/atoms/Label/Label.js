import React from 'react';
import CloseSvg from '../Icons/CloseSvg';
import './Label.module.scss';

const Label = ({ text, actionEnabled = false, handleClick, color = '#ffffff', background = '#89c4b2' }) => (
    <div className='label' style={{ color, background }}>
        <span>{text}</span>
        {actionEnabled && <CloseSvg onClick={handleClick} />}
    </div>
)

export default Label;