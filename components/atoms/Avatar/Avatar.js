import React from 'react';
import './Avatar.molecule.scss';

const Avatar = ({ src, alt = 'avatar', size = 'sm' }) => (
    <img className={`avatar avatar--${size}`} src={src} alt={alt} />
)

export default Avatar;