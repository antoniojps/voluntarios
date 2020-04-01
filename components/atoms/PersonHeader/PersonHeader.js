import React from 'react';
import Avatar from '../Avatar/Avatar';
import './PersonHeader.module.scss';
import { defaultAvatar } from '../Avatar/utils'

const PersonHeader = ({ name, desc, src, illustration = defaultAvatar }) => (
    <div className='person-header'>
        <Avatar src={src} alt={`imagem de perfil de ${name}`} {...illustration} />
        <div className='person-header__block'>
            <p className='person-header__block__title'>{name}</p>
            <p className='person-header__block__desc'>{desc}</p>
        </div>
    </div>
)

export default PersonHeader;