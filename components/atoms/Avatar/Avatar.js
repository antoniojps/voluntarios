import React from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components/atoms';
import './Avatar.module.scss';

const Avatar = ({ src = null, alt = 'avatar', size = 'sm' }) => {
    if (!src) {
        return <Icon icon={faUserAlt} className={`avatar-default avatar-default--${size}`} />
    }

    return (
        <img className={`avatar avatar--${size}`} src={src} alt={alt} />
    )
}

export default Avatar;
