import React from 'react'
import { Icon } from "components/atoms";
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import "./Share.module.scss";

const Share = ({
    facebookUrl,
    linkedinUrl,
    twitterUrl,
    url,
}) => {

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const renderItem = (icon, url) => (
        <a href={url} className='share__social' target='_blank'>
            <Icon icon={icon} />
        </a>
    )
    return (
        <div className='share'>
            {twitterUrl && renderItem(faTwitter, twitterUrl)}
            {facebookUrl && renderItem(faFacebook, facebookUrl)}
            {linkedinUrl && renderItem(faLinkedin, linkedinUrl)}
            {url && (
                <div className='share__url'>
                    <Icon icon={faLink} onClick={() => copyToClipboard(url)} />
                    <input
                        className='share__url'
                        type='text'
                        value={url}
                    />
                </div>
            )}
        </div>
    )
}

export default Share;