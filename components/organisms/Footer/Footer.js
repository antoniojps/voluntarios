import React from 'react'
import { linksData, contactsData, socialData } from './FooterData';
import Link from 'next/link';
import { Icon } from 'components/atoms'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        {/* <div className='footer__cta'>
          <h3>Pronto para ajudar?</h3>
          <p>Inscreve-te como voluntario</p>
          <Link href="/sign-up">
            <button className='btn btn--primary'>Inscrever</button>
          </Link>
        </div> */}
        <div className='footer__plus'>
          <div className='container'>
            <div className='row'>
              <div className='col col-12 col-md-6'>
                <h4>Misssão</h4>
                <p>Vamos <strong>facilitar a comunicação</strong> entre <strong>voluntários</strong> dispostos a ajudar e <strong>projetos</strong> sem fins lucrativos, que visam melhorar a sociedade.</p>
              </div>
              <div className='col col-12 col-md-3'>
                <h4>Plataforma</h4>
                {linksData.map(link => (
                  <Link href={link.to}>
                    <a>{link.label}</a>
                  </Link>
                ))}
              </div>
              <div className='col col-12 col-md-3'>
                <h4>Contactos</h4>
                {contactsData.map(contact => (
                  <div className='contact-item'>
                    <Icon icon={contact.icon} />
                    <span>{contact.content}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
        <div className='footer__social'>
          <div>
            {socialData.map(social => (
              <a href={social.to} target='_blank'>
                <Icon icon={social.icon} />
              </a>
            ))}
          </div>
          <span>Voluntários @2020</span>
        </div>
      </div>
      <style jsx global>{`
        .footer {
          width: 100%;
          padding: var(--spacing-xs);
          margin-top: var(--spacing-xl1); 
        }
        .footer__cta {
          text-align: center;
          padding: var(--spacing-m) 0;
        }

        .footer__cta > p {
          color: var(--base40);
        }

        .footer__cta > button {
          margin-top: var(--spacing-xs4);
        }
        .footer__plus {
          border-top: 1px solid var(--border);
          padding: var(--spacing-m) 0;
        }
        .footer__plus h4 {
          text-transform: uppercase;
        }
        .footer__plus p {
          color: var(--base40);
        }
        .footer__plus p strong {
          color: var(--base);
        }
        .footer__plus a {
          display: inline-block;
          width: 100%;
          color: var(--base40);
          padding: var(--spacing--xs3) 0;
        }
        .footer__plus a:hover {
          color: var(--base);
        }
        .contact-item {
          display: flex;
          align-items: center;
          color: var(--base);
        }
        .contact-item svg {
          height: 12px;
          width: 12px;
          margin-right: var(--spacing-xs3);
          max-width: 12px;
          min-width: 12px;
        }
        .footer__social {
          width: 100%;
          text-align:center;
          margin-top: var(--spacing-xs4);
        }
        .footer__social a {
          color: var(--base)
        }
        .footer__social a:hover {
          color: var(--base40)
        }
        .footer__social a svg {
          width: 20px;
          height: 20px;
          margin: var(--spacing-xs5);
        }
        .footer__social span {
         color: var(--base40);
         font-size: var(--size-xs1);
        }
      `}</style>
    </>

  )
}

export default Footer;