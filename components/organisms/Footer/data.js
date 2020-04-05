import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const missionData = '<p>Vamos <strong>facilitar a comunicação</strong> entre <strong>voluntários</strong> dispostos a ajudar e <strong>projetos</strong> sem fins lucrativos, que visam melhorar a sociedade.</p>';

export const linksData = [
    { label: 'Website', to: '/' },
    { label: 'Missão', to: '/p/sobre' },
    { label: 'Quem somos?', to: '/p/sobre' },
    { label: 'Como funciona?', to: '/p/sobre' },
];

export const contactsData = [
    { icon: faPhone, content: '+351 914 290 986', type: 'tel:' },
    { icon: faPhone, content: '+351 912 817 861', type: 'tel:'},
    { icon: faEnvelope, content: 'voluntarios.app@gmail.com', type: 'mailto:' },
]

export const socialData = [
    { icon: faFacebook, to: 'https://www.facebook.com/Volunt%C3%A1rios-103965777932326' },
    { icon: faInstagram, to: 'https://www.instagram.com/voluntarios.app/' },
]
