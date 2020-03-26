import React, { memo } from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { PersonHeader, Button, Label, Icon } from 'components/atoms';
import Placeholder from '../../atoms/Placeholder/Placeholder'
import { Avatar, Spacer } from '@zeit-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

const Card = memo(({ name, job, src = null, categories, locations, loading }) => {

    const renderLoading = () => (
        <div className='card--loading' style={{height: '216px'}}>
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
        </>
    )

    return (
    <div className='card'>
        <AnimatePresence initial={false} exitBeforeEnter>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key="loading"
                    >
                        {renderLoading()}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key="default"
                    >
                        {renderDefault()}
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                @import "assets/styles/mixins.scss";
                .card {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: var(--spacing-xs);
                @include box-shadow;
                &__top {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                }

                &__body {
                    &__competences {
                    margin: var(--spacing-xs2) 0;
                    margin-bottom: 0;

                    p {
                        font-size: var(--size-xs);
                        font-weight: 500;
                        color: var(--base40);
                        padding: 0;
                        margin: 0;
                    }

                    &__list {
                        margin: var(--spacing-xs4) 0;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;

                        .label {
                        margin-right: var(--spacing-xs4);
                        margin-bottom: var(--spacing-xs4);
                        }
                    }
                    }

                    &__item {
                    display: flex;
                    align-items: center;
                    margin: var(--spacing-xs3) 0;

                    p {
                        margin: 0;
                        padding: 0;
                        margin-left: var(--spacing-xs4);
                        font-weight: 500;

                        span {
                            color: var(--base40)
                        }
                    }
                    }
                }
                }

            `}</style>
        </div>
    )
})

export default Card