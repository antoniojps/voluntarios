import React from 'react';
import { faEllipsisV, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import PersonHeader from '../../atoms/PersonHeader/PersonHeader';
import Button from '../../atoms/Button/Button';
import Label from '../../atoms/Label/Label';
import Icon from '../../atoms/Icons/Icon';
import './Card.module.scss';

const Card = ({ name, desc, src, competences, location, availability }) => {
    return (
        <div className='card'>
            <div className='card__top'>
                <PersonHeader name={name} desc={desc} src={src} />
                <Icon icon={faEllipsisV} />
            </div>

            <div className='card__body'>
                <div className='card__body__competences'>
                    <p>Competências</p>
                    <div className='card__body__competences__list'>
                        {competences.map(item => <Label key={item.id} text={item.label} />)}
                    </div>
                </div>

                <div className='card__body__item'>
                    <Icon icon={faMapMarkerAlt} />
                    <p>{location.location}</p>
                </div>

                <div className='card__body__item'>
                    <Icon icon={faClock} />
                    <p>{availability}h<span>/semana</span></p>
                </div>
            </div>

            <div className='card__footer'>
                <Button onClick={console.log} type='secondary'>
                    contactar
                </Button>
            </div>
        </div>
    )
}

export default Card