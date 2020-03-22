import React from 'react';

const Button = ({ type, onClick, children }) => (
    <button className={`btn--${type}`} type={type} onClick={onClick}>
        {children}
    </button>
)

export default Button;