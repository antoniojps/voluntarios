import React, { memo, useMemo } from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { PersonHeader, Label, Icon } from 'components/atoms';
import './Card.module.scss';
import Placeholder from '../../atoms/Placeholder/Placeholder'
import { Avatar, Spacer } from '@zeit-ui/react'

const Card = memo(({
    name,
    job,
    categories,
    locations,
    loading,
    avatar,
    onContact = () => { },
    hasShadow = true,
    hasContact = true,
    hasLocations = true,
    hasCategories = true,
    heightStretch = false,
}) => {

    const avatarProps = useMemo(() => {
        if (!avatar) return {}
        const src = avatar.image && avatar.image.small ? avatar.image.small : null
        const illustration = avatar.illustration
        return {
          src,
          illustration,
        }
      }, [avatar])

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
                    <PersonHeader name={name} desc={job} {...avatarProps} />
                </div>
                {(hasCategories && categories.length > 0) && (
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
            {(hasLocations || hasContact) && (
                <div className="card__bottom">
                    <div className='card__body__item' >
                        {(hasLocations && locations.length > 0) &&
                            <>
                                <Icon icon={faMapMarkerAlt} />
                                <Spacer x={0.4} />

                                <p>
                                    {locations.map((location, i) => (
                                        <span key={location._id}>{i === 0 ? '' : ', '}{location.name}</span>
                                    ))}
                                </p>
                            </>
                        }
                    </div>
                    {hasContact && (
                        <button onClick={onContact} className="btn btn--secondary btn--stretch" type='secondary'>
                            contactar
                        </button>
                    )}
                </div>
            )}
        </>
    )

    return (
        <div className={`card ${hasShadow ? 'card--shadow' : ''} ${heightStretch ? 'card--height-stretch' : ''}`}>
            {loading
                ? renderLoading()
                : renderDefault()
            }
        </div>
    )
})

export default Card