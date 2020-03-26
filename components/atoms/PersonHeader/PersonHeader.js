import React from 'react';
import Avatar from '../Avatar/Avatar';

const PersonHeader = ({ name, desc, src }) => (
    <div className='person-header'>
        <Avatar src={src} alt={`imagem de perfil de ${name}`} />
        <div className='person-header__block'>
            <p className='person-header__block__title'>{name}</p>
            <p className='person-header__block__desc'>{desc}</p>
        </div>
        <style jsx>{`
            .person-header {
            * {
                font-family: var(--font);
            }

            display: flex;
            align-items: center;

            &__block {
                display: flex;
                flex-direction: column;
                margin-left: var(--spacing-xs3);

                p {
                    margin: 0;
                    padding: 0;
                }

                &__title {
                    font-size: var(--size-base);
                    font-weight: 600;
                    color: var(--base);
                }

                &__desc {
                    font-size: var(--size-xs);
                    color: var(--base40);
                }
            }
            }

        `}</style>
    </div>
)

export default PersonHeader;