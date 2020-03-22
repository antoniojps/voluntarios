import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


const Icon = ({ icon = faMapMarkerAlt }) => (
    <FontAwesomeIcon icon={icon} />
)


export default Icon;