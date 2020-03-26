import React from 'react';
import Avatar from '../Avatar/Avatar';
import './PersonHeader.module.scss';

const PersonHeader = ({ name, desc, src }) => (
    <div className='person-header'>
        <Avatar src={src} alt={`imagem de perfil de ${name}`} />
        <div className='person-header__block'>
            <p className='person-header__block__title'>{name}</p>
            <p className='person-header__block__desc'>{desc}</p>
        </div>
    </div>
)

export default PersonHeader;