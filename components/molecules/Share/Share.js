import React, { useRef } from 'react'
import { Icon } from "components/atoms";
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import "./Share.module.scss";

const share = {
    twitter: "https://twitter.com/intent/tweet?text=Estou%20pronto%20para%20ajudar!%20",
    facebook: "https://www.facebook.com/sharer/sharer.php?u=",
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
}

const Share = ({
    facebookUrl,
    linkedinUrl,
    twitterUrl,
    url,
    onCopy = () => {},
}) => {
    const urlInput = useRef(null)

    const handleFocus = () => {
        if (urlInput && urlInput.current) {
            urlInput.current.select()
        }
    }

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        onCopy()
    };

    const renderItem = (icon, url, socialMedia = "facebook") => {
        const shareUrl = `${share[socialMedia]}${url}`
        return (
            <a href={shareUrl} title={`Partilhar no ${socialMedia}`} className='share__social' target='_blank' rel="noreferrer noopener">
                <Icon icon={icon} height={14} />
            </a>
        )
    }
    return (
        <div className='share'>
            {twitterUrl && renderItem(faTwitter, twitterUrl, 'twitter')}
            {facebookUrl && renderItem(faFacebook, facebookUrl, 'facebook')}
            {linkedinUrl && renderItem(faLinkedin, linkedinUrl, 'linkedin')}
            {url && (
                <div className='share__url'>
                    <div className="share__url-icon" title="Copiar link">
                        <Icon icon={faLink} onClick={() => copyToClipboard(url)} />
                    </div>
                    <input
                        className='share__url'
                        type='text'
                        value={url}
                        ref={urlInput}
                        onFocus={handleFocus}
                    />
                </div>
            )}
        </div>
    )
}

export default Share;