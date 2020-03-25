import React from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { PersonHeader, Button, Label, Icon } from 'components/atoms';
import './Card.module.scss';

const Card = ({ name, job, src = null, categories, locations }) => {
    return (
        <div className='card'>
            <div className="card__top">
                <div className='card__header'>
                    <PersonHeader name={name} desc={job} src={src} />
                </div>
                <div className='card__body'>
                    <div className='card__body__competences'>
                        <p>Competências</p>
                        <div className='card__body__competences__list'>
                            {categories.map(item => <Label key={item._id} text={item.name} background={item.color}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card__bottom">
                {locations.map(location => (
                    <div className='card__body__item' key={location._id}>
                        <Icon icon={faMapMarkerAlt} />
                        <p>{location.name}</p>
                    </div>
                ))}
                <Button onClick={console.log} type='secondary'>
                    contactar
                </Button>
            </div>
        </div>
    )
}

export default Card