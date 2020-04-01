import React, { useMemo } from 'react';
import Peep from 'react-peeps';
import './Avatar.module.scss';
import { getStyles, defaultAvatar } from './utils'

const Avatar = ({
    src = null,
    size = 'md',
    alt = 'avatar',
    accessory = defaultAvatar.accessory,
    face = defaultAvatar.face,
    hair = defaultAvatar.hair,
    facialHair = defaultAvatar.facialHair,
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
