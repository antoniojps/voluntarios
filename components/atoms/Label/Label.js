import React from 'react';
import Icon from '../Icons/Icon'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Label = ({ text, actionEnabled = false, handleClick, color = '#ffffff', background = '#89c4b2' }) => (
    <div className='label' style={{ color, background }}>
        <span>{text}</span>
        {actionEnabled && <button onClick={handleClick}><Icon icon={faTimes} /></button>}
        <style jsx>{`
        .label {
            width: fit-content;
            padding: 3px var(--spacing-xs3);
            border-radius: 5px;
            display: flex;
            align-items: center;
            position: relative;

            span {
                font-size: var(--size-xs2);
                text-transform: uppercase;
                margin-right: var(--spacing-xs4);
                overflow: hidden;
                word-wrap: break-word;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 100px;
            }

            button {
                padding: 2px 5px;
                font-size: 12px;
                position: absolute;
                left: 100%;
                font-size: 8px;
                font-weight: normal;
                border-radius: 50%;
                border: 0;
                transform: translate(-70%, -50%);
                box-shadow: 0 2px 8px 0 rgba(0,0,0,0.12);
            }
        }
        `}</style>
    </div>
)

export default Label;