import React, { useMemo } from 'react';
import Peep from 'react-peeps';
import { Hair, Face, FacialHair, Acessories } from './constants'

const getStyles = (size) => {
    let width = 100
    let transform = `translateX(-15px)`

    if (size === 'sm') {
        width = 62
        transform = `translateX(-12px)`
    }
    if (size === 'lg') {
        width = 150
        transform = `translateX(-20px)`
    }


    return {
        width,
        height: width,
        transform,
        justifyContent: 'center',
        alignSelf: 'center',
    }
}

const getRandomHead = () => {
    const face = Face[Math.floor(Math.random() * Face.length)];
    const hair = Hair[Math.floor(Math.random() * Hair.length)];
    const facialHair = FacialHair[Math.floor(Math.random() * FacialHair.length)];
    const acessories = Acessories[Math.floor(Math.random() * Acessories.length)];
    return {
        acessories,
        face,
        hair,
        facialHair,
    }
}

const Avatar = ({
    src = null,
    size = 'md',
    alt = 'avatar',
    ...props
}) => {
    const head = useMemo(() => getRandomHead(), [])
    const style = useMemo(() => getStyles(size), [size])
    return (
        <div className={`avatar avatar--${size}`}>
            {src && <img className="avatar-img" src={src} alt={alt} {...props} />}
            {!src && <Peep
                        style={style}
                        body='Shirt'
                        {...head}
                        strokeColor='#000'
                        viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                    />
            }
            <style jsx>{`
            .avatar {
                border-radius: 50%;
                display: inline-block;
                position: relative;
                overflow: hidden;
                border: 1px solid var(--border);
                vertical-align: top;
                background-color: var(--bg);

                &--xs {
                    height: 1.25rem;
                    width: 1.25rem;
                }

                &--sm {
                    height: 1.875rem;
                    width: 1.875rem;
                }

                &--md {
                    height: 3.75rem;
                    width: 3.75rem;
                }

                &--lg {
                    height: 5.625rem;
                    width: 5.625rem;
                }

                .avatar:first-child {
                    margin: 0;
                }

                .avatar-img {
                    object-fit: cover;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
                }
            `}
            </style>
        </div>
    )
}

export default Avatar;
