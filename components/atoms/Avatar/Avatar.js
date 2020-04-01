import React, { useMemo } from 'react';
import Peep from 'react-peeps';
import './Avatar.module.scss';
import { getStyles } from './utils'

const Avatar = ({
    src = null,
    size = 'md',
    alt = 'avatar',
    accessory = "None",
    face = "Smile",
    hair = "ShortVolumed",
    facialHair = "None",
    className = "",
    ...props
}) => {
    const style = useMemo(() => getStyles(size), [size])
    return (
        <div className={`avatar avatar--${size} ${className}`}>
            {src && <img className="avatar-img" src={src} alt={alt} {...props} />}
            {!src && <Peep
                        style={style}
                        body='Shirt'
                        accessory={accessory}
                        face={face}
                        hair={hair}
                        facialHair={facialHair}
                        strokeColor='#000'
                        viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                    />
            }
        </div>
    )
}

export default Avatar;
