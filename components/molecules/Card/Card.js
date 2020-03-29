import React, { memo } from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { PersonHeader, Button, Label, Icon } from 'components/atoms';
import './Card.module.scss';
import Placeholder from '../../atoms/Placeholder/Placeholder'
import { Avatar, Spacer } from '@zeit-ui/react'

const Card = memo(({
    name,
    job,
    src = null,
    categories,
    locations,
    loading,
    onContact = () => { },
    hasShadow = true,
    hasContact = true,
    hasLocations = true,
    hasCategories = true,
}) => {
    const renderLoading = () => (
        <div className='card--loading' style={{ height: '216px' }}>
            <div className="card__top">
                <div className='card__header'>
                    <Avatar />
                </div>
                <div className='card__body'>
                    <div className='card__body__competences'>
                        <Placeholder x={1} />
                        <Spacer y={0.5} />
                        <Placeholder x={0.5} />
                    </div>
                </div>
            </div>
        </div>
    )

    const renderDefault = () => (
        <>
            <div className="card__top">
                <div className='card__header'>
                    <PersonHeader name={name} desc={job} src={src} />
                </div>
                {hasCategories && (
                    <div className='card__body'>
                        <div className='card__body__competences'>
                            <p>Áreas de interesse</p>
                            <div className='card__body__competences__list'>
                                {categories.map(item => <Label key={item._id} text={item.name} background={item.color} />)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="card__bottom">
                <div className='card__body__item' >
                    <Icon icon={faMapMarkerAlt} />
                    <Spacer x={0.4} />
                    <p>
                        {hasLocations && locations.map((location, i) => (
                            <span key={location._id}>{i === 0 ? '' : ', '}{location.name}</span>
                        ))}
                    </p>
                </div>
                {hasContact && (
                    <Button onClick={onContact} type='secondary'>
                        contactar
                    </Button>
                )}
            </div>
        </>
    )

    return (
        <div className={`card ${hasShadow ? 'card--shadow' : ''}`}>
            {loading
                ? renderLoading()
                : renderDefault()
            }
        </div>
    )
})

export default Card