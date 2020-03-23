import React from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { PersonHeader, Button, Label, Icon } from 'components/atoms';
import './Card.module.scss';

const Card = ({ name, job, src = 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.0-9/p960x960/83684971_10219246916195136_7758163107968450560_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=dT0bqq6Uj5YAX-zE6aO&_nc_ht=scontent.fbru2-1.fna&_nc_tp=6&oh=60ae1502736c6c0dfc6f7d0cd642264d&oe=5E9C0CE9', categories, locations }) => {
    return (
        <div className='card'>
            <div className='card__top'>
                <PersonHeader name={name} desc={job} src={src} />
            </div>

            <div className='card__body'>
                <div className='card__body__competences'>
                    <p>Competências</p>
                    <div className='card__body__competences__list'>
                        {categories.map(item => <Label key={item._id} text={item.name} />)}
                    </div>
                </div>
                {locations.map(location => (
                    <div className='card__body__item' key={location._id}>
                        <Icon icon={faMapMarkerAlt} />
                        <p>{location.name}</p>
                    </div>
                ))}
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